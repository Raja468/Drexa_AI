import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { AlsoFromUs, Breadcrumb, breadcrumbSchema, faqSchema, JsonLd, ServiceCta, ServiceFaq, serviceSchema } from '@/components/layout/ServicePageBits'

export const metadata: Metadata = {
  title: 'Website Security & Penetration Testing | Drexa AI',
  description: 'Penetration testing and security fixes for WordPress, Shopify, Wix, and custom websites. Clear report, fixed price. Free security score check.',
  alternates: { canonical: 'https://drexa.tech/services/cybersecurity' },
  openGraph: {
    title: 'Website Security & Penetration Testing | Drexa AI',
    description: 'Penetration testing and security fixes for WordPress, Shopify, Wix, and custom websites. Clear report, fixed price. Free security score check.',
    url: 'https://drexa.tech/services/cybersecurity',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Security & Penetration Testing | Drexa AI',
    description: 'Penetration testing and security fixes for WordPress, Shopify, Wix, and custom websites. Clear report, fixed price. Free security score check.',
    images: ['/logo.png'],
  },
}

const whatWeDo = [
  'Website penetration testing (login, forms, admin panel, APIs)',
  'WordPress, Shopify, Wix, and custom platform security review',
  'HTTPS, SSL, security headers, and server configuration review',
  'Malware cleanup and hardening after a hack',
  'Ongoing monitoring (optional monthly plan)',
]

const steps = [
  ['1', 'Free score check', 'Run the free security score check first, or book a free call.'],
  ['2', 'Written permission and scope agreed', 'You give written permission and we agree exactly what will be tested.'],
  ['3', 'Testing', 'We test the site using safe methods, at quiet hours if you prefer.'],
  ['4', 'Report with severity ratings and fixes', 'You get a written report: what is exposed, how serious it is, and how to fix it.'],
  ['5', 'Fixes done by us or your developer', 'We apply the fixes, or your developer follows the fix list.'],
  ['6', 'Retest', 'We re-check the fixes and confirm what is closed.'],
]

const faqs: [string, string][] = [
  ['Is testing safe for my live site?', 'Scope is agreed first, we use safe methods, and we can test at quiet hours.'],
  ['Do you test Wix and Shopify?', 'Yes, within what each platform allows.'],
  ['What do I get at the end?', 'A written report, a prioritised fix list, and a retest.'],
  ['How much does it cost?', 'Fixed quote after a free call.'],
]

export default function CybersecurityPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <JsonLd data={[
        serviceSchema('Website Security & Penetration Testing', 'Penetration testing and security fixes for WordPress, Shopify, Wix, and custom websites. Clear report, fixed price. Free security score check.'),
        faqSchema(faqs),
        breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Cybersecurity' }]),
      ]} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Cybersecurity' }]} />
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col border-x border-border lg:flex-row">
          <div className="shrink-0 border-b border-border p-6 md:p-8 lg:w-80 lg:border-b-0 lg:border-r lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              Website Security
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground md:text-[56px]">
              Find the holes before attackers do.
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] font-semibold leading-[1.4] text-[#F2F2EE] md:text-[24px]">
              Most hacked websites are not targeted. They are found by automated scanners looking for outdated plugins, weak logins, and missing protections. We test your site, show you exactly what is exposed, and fix it.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
                Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
              <Link href="/security-score" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-[#141416] px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent-dark">
                Free security score check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="What we do">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ul className="grid gap-3 text-[18px] leading-[1.6] text-[#A1A1AA] md:grid-cols-2 list-disc list-inside marker:text-accent-dark">
            {whatWeDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section number="02" title="How it works">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ol className="space-y-8">
            {steps.map(([number, title, copy]) => (
              <li key={number} className="flex flex-col gap-2 md:flex-row md:gap-8">
                <span className="font-mono text-sm font-bold text-accent-dark">{number}</span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight">{title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6] text-[#A1A1AA]">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-[12px] border border-highlight bg-highlight-tint p-6 md:p-8">
            <p className="max-w-[60ch] text-[18px] font-semibold leading-[1.6] text-foreground">
              We only test websites we have written permission to test. Always.
            </p>
          </div>
        </div>
      </Section>

      <Section number="03" title="Start with the free check">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">
            Our security score tool runs basic checks only: HTTPS, headers, common misconfigurations. It is a starting point, not a full audit. Full testing needs manual work.
          </p>
          <div className="mt-8">
            <Link href="/security-score" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
              Free security score check <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>
      </Section>

      <Section number="04" title="Also from us">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <AlsoFromUs links={[
            { label: 'AI Visibility', href: '/services/ai-visibility', copy: 'We check if AI mentions your business, then fix the reasons it does not.' },
            { label: 'Web Development', href: '/services/web-development', copy: 'Fast, secure, search-ready websites that bring in enquiries, not just look good.' },
          ]} />
        </div>
      </Section>

      <Section number="05" title="FAQ">
        <ServiceFaq items={faqs} />
      </Section>

      <ServiceCta />
    </main>
  )
}
