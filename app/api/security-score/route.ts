import { NextResponse } from 'next/server'
import dns from 'node:dns'
import tls from 'node:tls'
import net from 'node:net'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 10_000
const MAX_BODY_BYTES = 200_000

export type CheckStatus = 'pass' | 'fail' | 'warning' | 'info'

export type ScoreCheck = {
  name: string
  status: CheckStatus
  points: number
  detail: string
  fix: string
}

export type ScoreResult = {
  url: string
  finalUrl: string
  score: number
  grade: string
  checks: ScoreCheck[]
  wordpress: {
    detected: boolean
    detail: string
    generator: string | null
  }
  timestamp: string
}

function gradeFor(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 50) return 'Needs work'
  return 'At risk'
}

function isPrivateIp(ip: string): boolean {
  if (net.isIP(ip) === 4) {
    const parts = ip.split('.').map(Number)
    if (parts[0] === 10) return true
    if (parts[0] === 127) return true
    if (parts[0] === 169 && parts[1] === 254) return true
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true
    if (parts[0] === 192 && parts[1] === 168) return true
    if (parts[0] === 0) return true
    return false
  }
  if (net.isIP(ip) === 6) {
    const lower = ip.toLowerCase()
    if (lower === '::1') return true
    if (lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true
    return false
  }
  return false
}

async function lookupHost(hostname: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, { all: true }, (err, addresses) => {
      if (err) reject(err)
      else resolve(addresses.map((a) => a.address))
    })
  })
}

export async function normaliseTarget(raw: string): Promise<URL> {
  const trimmed = raw.trim()
  if (!trimmed) throw new Error('Please enter a website address.')
  if (/\s/.test(trimmed)) throw new Error('That address looks invalid. Enter a domain like example.com.')
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    throw new Error('That address looks invalid. Enter a domain like example.com.')
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only http and https addresses can be checked.')
  }
  if (url.username || url.password) {
    throw new Error('Addresses with a username or password cannot be checked.')
  }
  url.hash = ''
  const hostname = url.hostname.toLowerCase()
  if (!hostname || hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.localhost')) {
    throw new Error('Local and private sites cannot be checked. Enter a public website address.')
  }
  if (net.isIP(hostname) && isPrivateIp(hostname)) {
    throw new Error('Private network addresses cannot be checked. Enter a public website address.')
  }
  const port = url.port
  if (port && port !== '80' && port !== '443') {
    throw new Error('Only the standard web ports (80 and 443) can be checked.')
  }
  // Resolve and reject private destinations, including DNS that points inward.
  try {
    const ips = await lookupHost(hostname)
    if (ips.length === 0) throw new Error('That site could not be found.')
    if (ips.some((ip) => isPrivateIp(ip))) {
      throw new Error('That address resolves to a private network and cannot be checked.')
    }
  } catch (err) {
    if (err instanceof Error && /cannot be checked|could not be found/.test(err.message)) throw err
    throw new Error('That site could not be found. Check the spelling and try again.')
  }
  return url
}

function check(name: string, status: CheckStatus, points: number, detail: string, fix: string): ScoreCheck {
  return { name, status, points, detail, fix }
}

async function certExpiryDays(hostname: string): Promise<number | null> {
  return new Promise((resolve) => {
    const socket = tls.connect(
      { host: hostname, port: 443, servername: hostname, timeout: 5000, rejectUnauthorized: false },
      () => {
        try {
          const cert = socket.getPeerCertificate()
          socket.end()
          if (!cert || !cert.valid_to) return resolve(null)
          const expiry = new Date(cert.valid_to).getTime()
          if (Number.isNaN(expiry)) return resolve(null)
          resolve(Math.floor((expiry - Date.now()) / 86_400_000))
        } catch {
          resolve(null)
        }
      },
    )
    socket.on('timeout', () => {
      socket.destroy()
      resolve(null)
    })
    socket.on('error', () => resolve(null))
  })
}

async function readCappedBody(response: Response): Promise<string> {
  const reader = response.body?.getReader()
  if (!reader) return ''
  const decoder = new TextDecoder()
  let total = 0
  let out = ''
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.length
      out += decoder.decode(value, { stream: true })
      if (total >= MAX_BODY_BYTES) {
        await reader.cancel()
        break
      }
    }
  } catch {
    // A truncated body is fine for a public-surface check; headers already tell most of the story.
  }
  return out
}

export async function POST(request: Request) {
  let body: { url?: unknown } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please send a website address to check.' }, { status: 400 })
  }
  if (typeof body.url !== 'string') {
    return NextResponse.json({ error: 'Please enter a website address.' }, { status: 400 })
  }

  let target: URL
  try {
    target = await normaliseTarget(body.url)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'That address looks invalid.' }, { status: 400 })
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(target.toString(), {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'Drexa-Security-Score/1.0 (public-surface check)', accept: 'text/html,application/xhtml+xml' },
    })
  } catch (err) {
    clearTimeout(timer)
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'The site took too long to respond (over 10 seconds). Try again, or check a different site.'
        : 'That site could not be reached. Check the spelling, and make sure the site is online.'
    return NextResponse.json({ error: message }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }

  const finalUrl = response.url || target.toString()
  let finalParsed: URL | null = null
  try {
    finalParsed = new URL(finalUrl)
  } catch {
    finalParsed = null
  }
  const html = await readCappedBody(response)
  const headers = response.headers

  const checks: ScoreCheck[] = []

  // 1. HTTPS in use (input scheme).
  checks.push(
    target.protocol === 'https:'
      ? check('HTTPS in use', 'pass', 10, 'You entered an https address.', 'Keep HTTPS forced on for every page.')
      : check('HTTPS in use', 'fail', 0, 'You entered an http address, which is not encrypted.', 'Move the site to https and turn on “force HTTPS” at your host.'),
  )

  // 2. No downgrade to insecure HTTP.
  if (finalParsed && finalParsed.protocol === 'https:') {
    checks.push(
      check('No downgrade to HTTP', 'pass', 10, `The site finished on https (${finalParsed.host}).`, 'Keep redirects pointing to https, not http.'),
    )
  } else {
    checks.push(
      check('No downgrade to HTTP', 'fail', 0, 'The site finished on http, so traffic is not encrypted.', 'Redirect http to https and turn on “force HTTPS” at your host.'),
    )
  }

  // 3. Site reachable.
  if (response.status >= 200 && response.status < 300) {
    checks.push(check('Site reachable', 'pass', 10, `The site returned HTTP ${response.status}.`, 'No action needed.'))
  } else if (response.status >= 300 && response.status < 400) {
    checks.push(check('Site reachable', 'warning', 5, `The site returned HTTP ${response.status}.`, 'Check where the redirect points, and make sure it ends on https.'))
  } else {
    checks.push(check('Site reachable', 'fail', 0, `The site returned HTTP ${response.status}.`, 'Fix the server error first, then re-run this check.'))
  }

  // 4. Strict-Transport-Security.
  const hsts = headers.get('strict-transport-security') ?? ''
  const hstsAge = /max-age=(\d+)/i.exec(hsts)
  if (hstsAge && Number(hstsAge[1]) >= 31_536_000) {
    checks.push(check('Strict-Transport-Security (HSTS)', 'pass', 10, `HSTS is set (${hsts}).`, 'Keep HSTS on.'))
  } else if (hsts) {
    checks.push(check('Strict-Transport-Security (HSTS)', 'warning', 5, `HSTS is set, but with a short max-age (${hsts}).`, 'Raise max-age to at least 31536000 once HTTPS is stable.'))
  } else {
    checks.push(check('Strict-Transport-Security (HSTS)', 'fail', 0, 'No HSTS header was sent.', 'Ask your host to send Strict-Transport-Security with a long max-age.'))
  }

  // 5. Content-Security-Policy.
  const csp = headers.get('content-security-policy') ?? ''
  checks.push(
    csp
      ? check('Content-Security-Policy (CSP)', 'pass', 10, 'A CSP header was sent.', 'Keep the policy tight, and test it after any change.')
      : check('Content-Security-Policy (CSP)', 'fail', 0, 'No CSP header was sent.', 'Add a Content-Security-Policy that only allows scripts and styles you trust.'),
  )

  // 6. X-Frame-Options.
  const xfo = (headers.get('x-frame-options') ?? '').toUpperCase()
  checks.push(
    xfo === 'DENY' || xfo === 'SAMEORIGIN'
      ? check('Clickjacking protection (X-Frame-Options)', 'pass', 10, `X-Frame-Options is ${xfo}.`, 'Keep it set.')
      : check('Clickjacking protection (X-Frame-Options)', 'fail', 0, 'X-Frame-Options is missing or not set to DENY or SAMEORIGIN.', 'Set X-Frame-Options to DENY or SAMEORIGIN.'),
  )

  // 7. X-Content-Type-Options.
  const xcto = (headers.get('x-content-type-options') ?? '').toLowerCase()
  checks.push(
    xcto === 'nosniff'
      ? check('Content-type protection (X-Content-Type-Options)', 'pass', 10, 'X-Content-Type-Options is nosniff.', 'Keep it set.')
      : check('Content-type protection (X-Content-Type-Options)', 'fail', 0, 'X-Content-Type-Options is missing or not nosniff.', 'Set X-Content-Type-Options to nosniff.'),
  )

  // 8. Referrer-Policy.
  const referrer = headers.get('referrer-policy') ?? ''
  checks.push(
    referrer
      ? check('Referrer-Policy', 'pass', 10, `Referrer-Policy is ${referrer}.`, 'Keep it set, ideally to a strict value like strict-origin-when-cross-origin.')
      : check('Referrer-Policy', 'fail', 0, 'No Referrer-Policy header was sent.', 'Set Referrer-Policy, for example to strict-origin-when-cross-origin.'),
  )

  // 9. SSL certificate expiry (best-effort; never fails the whole score if unavailable).
  let certDays: number | null = null
  if (finalParsed && finalParsed.protocol === 'https:') {
    certDays = await certExpiryDays(finalParsed.hostname)
  }
  if (certDays === null) {
    checks.push(
      check('SSL certificate', 'warning', 5, 'The certificate expiry could not be inspected this time, so this check is scored as partial.', 'Check the padlock in your browser and confirm auto-renew is on at your host.'),
    )
  } else if (certDays > 30) {
    checks.push(check('SSL certificate', 'pass', 10, `The certificate expires in about ${certDays} days.`, 'Keep auto-renew on.'))
  } else if (certDays >= 7) {
    checks.push(check('SSL certificate', 'warning', 5, `The certificate expires in about ${certDays} days.`, 'Confirm auto-renew is on, or renew it this week.'))
  } else if (certDays >= 0) {
    checks.push(check('SSL certificate', 'fail', 0, `The certificate expires in about ${certDays} days.`, 'Renew the certificate today, before browsers start warning visitors away.'))
  } else {
    checks.push(check('SSL certificate', 'fail', 0, 'The certificate looks expired.', 'Renew the certificate immediately and turn on auto-renew.'))
  }

  // 10. Server header hygiene (no obvious version leak in a public header).
  const serverHeader = headers.get('server') ?? ''
  const poweredBy = headers.get('x-powered-by') ?? ''
  const combined = `${serverHeader} ${poweredBy}`.trim()
  const hasVersion = /\d+\.\d+/.test(combined)
  if (!combined) {
    checks.push(check('Server header hygiene', 'pass', 10, 'No Server or X-Powered-By header was sent.', 'Keep version details out of public headers.'))
  } else if (hasVersion) {
    checks.push(check('Server header hygiene', 'fail', 0, `A public header reveals software details (${combined}).`, 'Hide version numbers from Server and X-Powered-By headers.'))
  } else {
    checks.push(check('Server header hygiene', 'warning', 5, `A Server header is sent (${combined}), but without an obvious version number.`, 'Consider removing the Server header entirely.'))
  }

  // WordPress signal — informational only, not scored. Never a version claim
  // unless a generator meta tag is actually present in the homepage HTML.
  const lowerHtml = html.toLowerCase()
  const wpSignal = lowerHtml.includes('wp-content') || lowerHtml.includes('wp-json') || lowerHtml.includes('wp-includes')
  const generatorMatch = /<meta[^>]+name=["']generator["'][^>]*content=["']([^"']+)["']/i.exec(html)
  const generator = generatorMatch ? generatorMatch[1].trim() : null
  const wordpress = wpSignal
    ? {
        detected: true,
        detail: generator
          ? `Looks like WordPress. The homepage reports: ${generator}.`
          : 'Looks like WordPress (wp-content / wp-json signals found in the homepage HTML). No version is claimed from that alone.',
        generator,
      }
    : {
        detected: false,
        detail: 'No WordPress signal was found in the homepage HTML. The site may use another platform, or hide those signals.',
        generator: null,
      }

  const score = checks.reduce((sum, c) => sum + c.points, 0)
  const result: ScoreResult = {
    url: target.toString(),
    finalUrl,
    score,
    grade: gradeFor(score),
    checks,
    wordpress,
    timestamp: new Date().toISOString(),
  }
  return NextResponse.json(result)
}
