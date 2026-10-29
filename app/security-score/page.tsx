import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SecurityScoreForm } from '@/components/security-score/SecurityScoreForm'

export const metadata: Metadata = {
  title: 'Free Website Security Score | Drexa AI',
  description:
    'Get a free, public-surface security score out of 100 for your website in plain language. No login, no code access, report only. For the full check, see the $5 checklist or the Drexa security audit.',
}

export default function SecurityScorePage() {
  return (
    <main className="bg-[#1B1E22] pt-[88px]">
      <section className="relative border-b border-border bg-[#1B1E22]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A9ACB2]">
              Free Security Score
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Is your website secure, or just untested?
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              Type in a website address and get a free score out of 100, with a plain-language pass, fail or
              warning for each public check, and the fix for each one.
            </p>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.6] text-[#A9ACB2]">
              This is a public-surface check only. It reads the same public headers and homepage anyone can see
              in a browser. It does not log in, read code, test logins or plugins, check backups, or look inside
              the server. Only check your own site, or a site you have permission to check.
            </p>
          </div>
        </div>
      </section>

      <Section number="01" title="Check your site">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <SecurityScoreForm />
        </div>
      </Section>

      <Section number="02" title="What this score does not check">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            A good score here is a good start, not a guarantee. This tool cannot see login strength, plugin or
            theme versions, backups, database settings, code bugs, or anything behind a login. That is what a
            full audit is for.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 text-[18px] leading-[1.6] text-[#A9ACB2] list-disc list-inside marker:text-accent-dark">
            <li>Login strength and two-factor authentication</li>
            <li>Plugin, theme and software versions</li>
            <li>Backups and recovery</li>
            <li>Code bugs and server internals</li>
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
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-[#1B1E22] px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent-dark"
            >
              Get a full security audit
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
