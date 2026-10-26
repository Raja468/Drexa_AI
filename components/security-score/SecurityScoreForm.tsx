'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type CheckStatus = 'pass' | 'fail' | 'warning' | 'info'

type ScoreCheck = {
  name: string
  status: CheckStatus
  points: number
  detail: string
  fix: string
}

type ScoreResult = {
  url: string
  finalUrl: string
  score: number
  grade: string
  checks: ScoreCheck[]
  wordpress: { detected: boolean; detail: string; generator: string | null }
  timestamp: string
}

const badge: Record<CheckStatus, string> = {
  pass: 'bg-[#E7F2EE] text-[#0B6B57]',
  fail: 'bg-[#FDECEA] text-[#9B1C1C]',
  warning: 'bg-[#FEF3C7] text-[#92400E]',
  info: 'bg-[#F6F6F3] text-[#54585F]',
}

const label: Record<CheckStatus, string> = {
  pass: 'Pass',
  fail: 'Fail',
  warning: 'Warning',
  info: 'Info',
}

export function SecurityScoreForm() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ScoreResult | null>(null)

  async function runCheck(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/security-score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: input }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(typeof data?.error === 'string' ? data.error : 'That check could not be completed. Please try again.')
        return
      }
      setResult(data as ScoreResult)
    } catch {
      setError('That check could not be completed. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={runCheck} className="flex flex-col gap-4 md:flex-row">
        <label className="sr-only" htmlFor="security-score-url">
          Website address
        </label>
        <input
          id="security-score-url"
          type="text"
          inputMode="url"
          autoComplete="off"
          placeholder="example.com"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-12 flex-1 rounded-lg border border-border bg-white px-4 text-[16px] text-foreground placeholder:text-[#54585F]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? 'Checking…' : 'Run check'} <ArrowRight size={16} />
        </button>
      </form>
      <p className="mt-4 max-w-[60ch] text-[14px] leading-[1.6] text-[#54585F]">
        Public-surface check only, not a full audit. Only enter your own site, or a site you have permission
        to check. No login details are asked for, and nothing is fixed automatically.
      </p>

      {error && (
        <div role="alert" className="mt-8 rounded-[12px] border border-border bg-[#FDECEA] p-6 text-[16px] leading-[1.6] text-[#9B1C1C]">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-10">
          <div className="flex flex-col gap-6 rounded-[12px] border border-border p-8 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#16181D] font-display text-[32px] font-[800] text-white">
              {result.score}
              <span className="text-[16px] font-semibold text-[#A9ACB2]">/100</span>
            </div>
            <div>
              <h2 className="text-[24px] font-bold leading-tight">{result.grade}</h2>
              <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6] text-[#54585F]">
                Checked {result.url}
                {result.finalUrl !== result.url ? `, which finished at ${result.finalUrl}` : ''}. Each check below
                is worth up to 10 points, so the total is out of 100. Partial credit is explained in the detail
                for each check.
              </p>
              <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.6] text-[#54585F]">{result.wordpress.detail}</p>
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {result.checks.map((c) => (
              <li key={c.name} className="rounded-[12px] border border-border p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-[18px] font-bold leading-tight">{c.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-[12px] font-mono uppercase tracking-widest ${badge[c.status]}`}>
                    {label[c.status]} · {c.points}/10
                  </span>
                </div>
                <p className="mt-3 text-[16px] leading-[1.6] text-[#54585F]">{c.detail}</p>
                <p className="mt-2 text-[16px] leading-[1.6] text-[#54585F]">
                  <span className="font-semibold text-foreground">Fix: </span>
                  {c.fix}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://ahmedverse363.gumroad.com/l/wkkavg"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover"
            >
              Get the full $5 checklist <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </a>
            <Link
              href="/security-audit"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-white px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Get a full security audit
            </Link>
          </div>
          <p className="mt-6 text-[13px] font-mono text-[#54585F]">
            Checked at {new Date(result.timestamp).toLocaleString()}. This is a public-surface score only, not a
            full audit.
          </p>
        </div>
      )}
    </div>
  )
}
