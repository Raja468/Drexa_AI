import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Website Security Audit and Fix | Drexa AI',
  description: 'Website Security Audit and Fix for small businesses and startups. We check your site, explain the risks in plain language, fix the issues, and set up basic protection in 3 to 5 days.',
}

const offers = [
  {
    title: 'Quick Security Check',
    price: '$50 to $80',
    note: 'Report only, for one website',
    copy: 'A focused check of one website, with a clear report: what was found, how serious it is, and how to fix it.',
  },
  {
    title: 'Full Audit + Fix + Hardening',
    price: '$150 to $300',
    note: 'Depending on site size',
    copy: 'The full check, the fixes applied, plus updates, login protection, backups, and a simple monitoring setup.',
  },
]

const steps = [
  ['1', 'Share and give permission', 'You share your site details and give written permission to test it. No testing happens without that permission.'],
  ['2', 'Audit and report', 'We audit the site and report findings by severity, with exact fix steps in plain language.'],
  ['3', 'Fix and harden', 'We fix the issues, apply updates and login protection, and set up backups and basic monitoring.'],
  ['4', 'Re-check and hand over', 'We re-check the fixes and hand over the report, the changes made, and what to watch next.'],
]

const checks = [
  'Login and access controls',
  'Outdated software, themes, and plugins',
  'Input validation and common web vulnerabilities',
  'Exposed data and misconfigurations',
  'Backups and recovery setup',
  'Basic security monitoring',
]

export default function SecurityAuditPage() {
  return (
    <main className="bg-white pt-[88px]">
      <section className="relative border-b border-border bg-[#F6F6F3]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#54585F]">
              Security Audit
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Is your website secure, or just untested?
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#16181D]">
              Website Security Audit and Fix for small businesses and startups. We check your site, explain the risks in plain language, fix the issues, and set up basic protection in 3 to 5 days.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
                Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
              <Link href="#what-we-check" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-white px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent">
                See what we check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="What you get">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-8 md:grid-cols-2">
            {offers.map((offer) => (
              <div key={offer.title} className="flex flex-col gap-3 rounded-[12px] border border-border p-8">
                <h2 className="text-[24px] font-bold leading-tight">{offer.title}</h2>
                <p className="text-[20px] font-semibold text-foreground">{offer.price}</p>
                <p className="text-[14px] font-mono uppercase tracking-widest text-[#54585F]">{offer.note}</p>
                <p className="text-[16px] leading-[1.6] text-[#54585F]">{offer.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.6] text-[#54585F]">
            Monthly monitoring and updates are available after trust is built, priced on request. Prices above are starting ranges. After a free consultation you receive a fixed-scope quote, so you know the price before work begins.
          </p>
        </div>
      </Section>

      <Section number="02" title="How it works">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ol className="space-y-8">
            {steps.map(([number, title, copy]) => (
              <li key={number} className="flex flex-col gap-2 md:flex-row md:gap-8">
                <span className="font-mono text-sm font-bold text-accent">{number}</span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight">{title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6] text-[#54585F]">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section number="03" title="What we check" id="what-we-check">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ul className="grid gap-3 md:grid-cols-2 text-[18px] leading-[1.6] text-[#54585F] list-disc list-inside marker:text-accent">
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
          <p className="mt-8 max-w-[60ch] text-[16px] leading-[1.6] text-[#54585F]">
            Exact scope depends on your site. We only test a real site with the owner&apos;s written permission. Practice work is done on labs only.
          </p>
        </div>
      </Section>

      <Section number="04" title="Why Drexa for this">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#54585F]">
            This combines web development, automation, and security, not just generic web development. Drexa&apos;s existing work shows that range: ChatConnect AI for WhatsApp support automation, Drex AI Assistant for Windows, and Iqra School Management System.
          </p>
        </div>
      </Section>

      <section className="bg-[#16181D] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Ready to check your site?</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A9ACB2]">
              Tell us about your site, and we will recommend the simplest check that fits it.
            </p>
          </div>
          <div className="flex shrink-0">
            <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
              Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
