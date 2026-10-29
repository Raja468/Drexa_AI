import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SeoCheckForm } from '@/components/seo-check/SeoCheckForm'

export const metadata: Metadata = {
  title: 'Free SEO Check | Drexa AI',
  description:
    'Get a free, on-page SEO basics score out of 100 for your website in plain language. No login, report only. This is not a Google ranking or keyword position check.',
}

export default function SeoCheckPage() {
  return (
    <main className="bg-[#1B1E22] pt-[88px]">
      <section className="relative border-b border-border bg-[#1B1E22]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A9ACB2]">
              Free SEO Check
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Is your website easy to find, or just online?
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              Type in a website address and get a free score out of 100 for on-page SEO basics, with a
              plain-language pass, fail or warning for each check, and the fix for each one.
            </p>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.6] text-[#A9ACB2]">
              This is an on-page basics check only. It reads the same public homepage anyone can see in a
              browser. It is not a Google ranking check, not a keyword position check, and no one can promise
              rank #1 from this. Only check your own site, or a site you have permission to check.
            </p>
          </div>
        </div>
      </section>

      <Section number="01" title="Check your site">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <SeoCheckForm />
        </div>
      </Section>

      <Section number="02" title="What this score does not check">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            A good score here is a good start, not a guarantee of ranking. Search ranking also depends on
            content quality, competition, backlinks, and many factors this tool cannot see from a homepage
            fetch. That is why this score is for on-page basics only.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 text-[18px] leading-[1.6] text-[#A9ACB2] list-disc list-inside marker:text-accent-dark">
            <li>Google ranking or keyword positions</li>
            <li>Search volume or backlinks</li>
            <li>Real-browser page speed or Core Web Vitals</li>
            <li>Full accessibility or WCAG compliance</li>
            <li>Content quality or pages beyond the homepage</li>
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
            <Link
              href="/security-score"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-[#1B1E22] px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent-dark"
            >
              Check your security score
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
