import { NextResponse } from 'next/server'
import dns from 'node:dns'
import net from 'node:net'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 10_000
const MAX_BODY_BYTES = 200_000

export type CheckStatus = 'pass' | 'fail' | 'warning' | 'info'

export type SeoCheck = {
  name: string
  status: CheckStatus
  points: number
  detail: string
  fix: string
}

export type SeoResult = {
  url: string
  finalUrl: string
  score: number
  grade: string
  checks: SeoCheck[]
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

async function normaliseTarget(raw: string): Promise<URL> {
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

function check(name: string, status: CheckStatus, points: number, detail: string, fix: string): SeoCheck {
  return { name, status, points, detail, fix }
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
    // A truncated body is fine for a homepage check; the head section is what matters most here.
  }
  return out
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
}

function cleanText(text: string): string {
  return decodeEntities(text.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function truncate(text: string, max = 80): string {
  return text.length > max ? `${text.slice(0, max)}…` : text
}

function parseAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([\w:-]+)\s*=\s*"([^"]*)"|([\w:-]+)\s*=\s*'([^']*)'/g
  let m: RegExpExecArray | null
  while ((m = re.exec(tag)) !== null) {
    const key = (m[1] ?? m[3]).toLowerCase()
    attrs[key] = m[2] ?? m[4] ?? ''
  }
  return attrs
}

function metaContent(html: string, key: string): string | null {
  const wanted = key.toLowerCase()
  const tags = html.match(/<meta[^>]*>/gi) ?? []
  for (const tag of tags) {
    const attrs = parseAttrs(tag)
    const name = (attrs.name ?? '').toLowerCase()
    const property = (attrs.property ?? '').toLowerCase()
    if (name === wanted || property === wanted) {
      return attrs.content ?? ''
    }
  }
  return null
}

function hasCanonical(html: string): boolean {
  const tags = html.match(/<link[^>]*>/gi) ?? []
  return tags.some((tag) => {
    const attrs = parseAttrs(tag)
    return (attrs.rel ?? '').toLowerCase().split(/\s+/).includes('canonical') && Boolean(attrs.href)
  })
}

async function checkAuxFile(url: string): Promise<'ok' | 'missing' | 'error'> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'user-agent': 'Drexa-SEO-Check/1.0 (public on-page check)', accept: '*/*' },
    })
    await res.body?.cancel().catch(() => {})
    return res.status >= 200 && res.status < 300 ? 'ok' : 'missing'
  } catch {
    return 'error'
  } finally {
    clearTimeout(timer)
  }
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
      headers: { 'user-agent': 'Drexa-SEO-Check/1.0 (public on-page check)', accept: 'text/html,application/xhtml+xml' },
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

  if (response.status >= 400) {
    return NextResponse.json(
      { error: `That site returned HTTP ${response.status}. Fix the server error first, then re-run this check.` },
      { status: 502 },
    )
  }

  const finalUrl = response.url || target.toString()
  let finalParsed: URL | null = null
  try {
    finalParsed = new URL(finalUrl)
  } catch {
    finalParsed = null
  }
  const html = await readCappedBody(response)
  const origin = finalParsed ? finalParsed.origin : target.origin

  const checks: SeoCheck[] = []

  // 1. Title present and length (roughly 30-60 characters).
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)
  const title = titleMatch ? cleanText(titleMatch[1]) : ''
  if (!title) {
    checks.push(
      check('Page title', 'fail', 0, 'No page title was found in the homepage HTML.', 'Add a clear <title> that says what the page is about, in roughly 30–60 characters.'),
    )
  } else if (title.length >= 30 && title.length <= 60) {
    checks.push(
      check('Page title', 'pass', 10, `A title was found (${title.length} characters): “${truncate(title)}”.`, 'Keep it clear and specific to this page.'),
    )
  } else {
    checks.push(
      check('Page title', 'warning', 5, `A title was found, but at ${title.length} characters it is outside the roughly 30–60 character guide: “${truncate(title)}”.`, 'Shorten a long title, or expand a very short one, to roughly 30–60 characters.'),
    )
  }

  // 2. Meta description present and length (roughly 120-160 characters).
  const description = metaContent(html, 'description')
  if (description === null) {
    checks.push(
      check('Meta description', 'fail', 0, 'No meta description was found in the homepage HTML.', 'Add a meta description that summarises the page in roughly 120–160 characters.'),
    )
  } else if (description.trim().length >= 120 && description.trim().length <= 160) {
    checks.push(
      check('Meta description', 'pass', 10, `A meta description was found (${description.trim().length} characters).`, 'Keep it as a plain summary of what the visitor will find on this page.'),
    )
  } else {
    checks.push(
      check('Meta description', 'warning', 5, `A meta description was found, but at ${description.trim().length} characters it is outside the roughly 120–160 character guide.`, 'Shorten a long description, or expand a very short one, to roughly 120–160 characters.'),
    )
  }

  // 3. Exactly one H1: 1 passes, 0 fails, 2 or more is a warning.
  const h1Matches = html.match(/<h1[\s>]/gi) ?? []
  const firstH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)
  const firstH1Text = firstH1 ? cleanText(firstH1[1]) : ''
  if (h1Matches.length === 1) {
    checks.push(
      check('Main heading (H1)', 'pass', 10, firstH1Text ? `Exactly one H1 was found: “${truncate(firstH1Text)}”.` : 'Exactly one H1 was found.', 'Keep one clear H1 per page.'),
    )
  } else if (h1Matches.length === 0) {
    checks.push(
      check('Main heading (H1)', 'fail', 0, 'No H1 heading was found on the homepage.', 'Add one clear H1 that says what the page is about.'),
    )
  } else {
    checks.push(
      check('Main heading (H1)', 'warning', 5, `${h1Matches.length} H1 headings were found. Search engines and screen readers expect one main heading per page.`, 'Keep the main H1 and turn the others into H2 headings.'),
    )
  }

  // 4. H2/H3 structure present.
  const h2Count = (html.match(/<h2[\s>]/gi) ?? []).length
  const h3Count = (html.match(/<h3[\s>]/gi) ?? []).length
  if (h2Count + h3Count > 0) {
    checks.push(
      check('Subheadings (H2/H3)', 'pass', 10, `${h2Count} H2 and ${h3Count} H3 headings were found on the homepage.`, 'Keep headings in order, H2 for sections and H3 for sub-sections.'),
    )
  } else {
    checks.push(
      check('Subheadings (H2/H3)', 'fail', 0, 'No H2 or H3 headings were found on the homepage.', 'Break the page into sections with H2 headings, and sub-sections with H3 where needed.'),
    )
  }

  // 5. Canonical link present.
  checks.push(
    hasCanonical(html)
      ? check('Canonical link', 'pass', 10, 'A canonical link was found in the homepage HTML.', 'Keep one canonical URL per page, pointing to the version you want search engines to use.')
      : check('Canonical link', 'fail', 0, 'No canonical link was found in the homepage HTML.', 'Add a canonical link pointing to the preferred URL for this page.'),
  )

  // 6. Open Graph title/description/image: all three pass, some warning, none fail.
  const ogTitle = metaContent(html, 'og:title')
  const ogDescription = metaContent(html, 'og:description')
  const ogImage = metaContent(html, 'og:image')
  const ogPresent = [ogTitle, ogDescription, ogImage].filter((v) => v !== null && v.trim() !== '').length
  const ogMissing = ['og:title', 'og:description', 'og:image'].filter((_, i) => {
    const v = [ogTitle, ogDescription, ogImage][i]
    return v === null || v.trim() === ''
  })
  if (ogPresent === 3) {
    checks.push(
      check('Open Graph tags', 'pass', 10, 'Open Graph title, description and image were all found, so link previews should show a title, summary and image.', 'Keep these tags in sync with the page title and description.'),
    )
  } else if (ogPresent > 0) {
    checks.push(
      check('Open Graph tags', 'warning', 5, `Only ${ogPresent} of 3 Open Graph tags were found. Missing: ${ogMissing.join(', ')}.`, `Add the missing Open Graph tag(s): ${ogMissing.join(', ')}.`),
    )
  } else {
    checks.push(
      check('Open Graph tags', 'fail', 0, 'No Open Graph title, description or image was found, so link previews may show no title, summary or image.', 'Add og:title, og:description and og:image to the page head.'),
    )
  }

  // 7. Twitter card present.
  const twitterCard = metaContent(html, 'twitter:card')
  checks.push(
    twitterCard !== null && twitterCard.trim() !== ''
      ? check('Twitter card', 'pass', 10, `A Twitter card was found (${twitterCard.trim()}).`, 'Keep it set, ideally summary_large_image for pages with a preview image.')
      : check('Twitter card', 'fail', 0, 'No Twitter card was found in the homepage HTML.', 'Add a twitter:card tag, for example summary_large_image.'),
  )

  // 8. Mobile viewport meta present.
  const viewport = metaContent(html, 'viewport')
  checks.push(
    viewport !== null && viewport.trim() !== ''
      ? check('Mobile viewport', 'pass', 10, `A mobile viewport tag was found (${truncate(viewport.trim())}).`, 'Keep it set so the page scales correctly on phones.')
      : check('Mobile viewport', 'fail', 0, 'No mobile viewport tag was found in the homepage HTML.', 'Add a viewport tag, for example width=device-width, initial-scale=1.'),
  )

  // 9. Images alt text: no images passes, most with alt passes, none with alt fails.
  const imgTags = html.match(/<img[^>]*>/gi) ?? []
  if (imgTags.length === 0) {
    checks.push(
      check('Image alt text', 'pass', 10, 'No images were found on the homepage, so no alt text is missing.', 'If you add images later, give each one a short alt description.'),
    )
  } else {
    const withAlt = imgTags.filter((tag) => {
      const attrs = parseAttrs(tag)
      return Boolean((attrs.alt ?? '').trim())
    }).length
    const ratio = withAlt / imgTags.length
    if (ratio >= 0.8) {
      checks.push(
        check('Image alt text', 'pass', 10, `${withAlt} of ${imgTags.length} images have alt text. Counting rule: an image counts as having alt text only if its alt attribute is present and not empty.`, 'Keep alt text short and descriptive of what the image shows.'),
      )
    } else if (withAlt > 0) {
      checks.push(
        check('Image alt text', 'warning', 5, `Only ${withAlt} of ${imgTags.length} images have alt text. Counting rule: an image counts as having alt text only if its alt attribute is present and not empty.`, 'Add short alt text to the images that are missing it. Decorative images can use an empty alt only if they add nothing to the content.'),
      )
    } else {
      checks.push(
        check('Image alt text', 'fail', 0, `None of the ${imgTags.length} images have alt text. Counting rule: an image counts as having alt text only if its alt attribute is present and not empty.`, 'Add short alt text to each image, describing what it shows.'),
      )
    }
  }

  // 10. robots.txt and sitemap.xml reachable. Fetch errors degrade to warning, not fail.
  const [robots, sitemap] = await Promise.all([
    checkAuxFile(`${origin}/robots.txt`),
    checkAuxFile(`${origin}/sitemap.xml`),
  ])
  const okCount = [robots, sitemap].filter((v) => v === 'ok').length
  if (okCount === 2) {
    checks.push(
      check('Robots and sitemap', 'pass', 10, 'Both /robots.txt and /sitemap.xml returned a successful response.', 'Keep the sitemap up to date when pages are added or removed.'),
    )
  } else if (okCount === 1) {
    const missing = robots === 'ok' ? '/sitemap.xml' : '/robots.txt'
    checks.push(
      check('Robots and sitemap', 'warning', 5, `Only one of the two files was reachable. ${missing} was not returned successfully.`, `Add or fix ${missing} so search engines can find and crawl the site. `),
    )
  } else if (robots === 'error' && sitemap === 'error') {
    checks.push(
      check('Robots and sitemap', 'warning', 5, 'Neither /robots.txt nor /sitemap.xml could be checked this time because both requests failed, so this check is scored as partial rather than a fail.', 'Open /robots.txt and /sitemap.xml in a browser and confirm they load, then re-run this check.'),
    )
  } else {
    checks.push(
      check('Robots and sitemap', 'fail', 0, 'Neither /robots.txt nor /sitemap.xml returned a successful response.', 'Add a /robots.txt file and a /sitemap.xml file that lists the pages you want search engines to find.'),
    )
  }

  const score = checks.reduce((sum, c) => sum + c.points, 0)
  const result: SeoResult = {
    url: target.toString(),
    finalUrl,
    score,
    grade: gradeFor(score),
    checks,
    timestamp: new Date().toISOString(),
  }
  return NextResponse.json(result)
}
