import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/layout/ServicePageBits'

export const metadata: Metadata = {
  title: 'Free Website Tools | Drexa AI',
  description: 'Free website security score and SEO checks from Drexa AI. Basic checks, not a full audit. No login, results in seconds.',
  alternates: { canonical: 'https://drexa.tech/tools' },
  openGraph: {
    title: 'Free Website Tools | Drexa AI',
    description: 'Free website security score and SEO checks from Drexa AI. Basic checks, not a full audit. No login, results in seconds.',
    url: 'https://drexa.tech/tools',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Website Tools | Drexa AI',
    description: 'Free website security score and SEO checks from Drexa AI. Basic checks, not a full audit. No login, results in seconds.',
    images: ['/logo.png'],
  },
}

const tools = [
  {
    title: 'Security Score Check',
    href: '/security-score',
    copy: 'A public-surface security score out of 100 for any website: HTTPS, security headers, and common misconfigurations, with the fix for each one.',
    limit: 'Basic checks, not a full audit.',
  },
  {
    title: 'SEO Check',
    href: '/seo-check',
    copy: 'An on-page SEO check out of 100: title, meta description, headings, canonical, Open Graph, and more, with the fix for each one.',
    limit: 'Basic checks, not a full audit.',
  },
  // Future tool slot: /ai-visibility-check
]

export default function ToolsPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Free Tools' }]} />
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col border-x border-border lg:flex-row">
          <div className="shrink-0 border-b border-border p-6 md:p-8 lg:w-80 lg:border-b-0 lg:border-r lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              Free Tools
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground md:text-[56px]">
              Free website tools
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] font-semibold leading-[1.4] text-[#F2F2EE] md:text-[24px]">
              Check your website in seconds. No login. Both tools run on our own site first.
            </p>
          </div>
        </div>
      </section>

      <Section number="01" title="Tools">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-8 md:grid-cols-2">
            {tools.map((tool) => (
              <div key={tool.href} className="flex flex-col gap-3 rounded-[12px] border border-border p-8">
                <h2 className="text-[24px] font-bold leading-tight">{tool.title}</h2>
                <p className="text-[16px] leading-[1.6] text-[#A1A1AA]">{tool.copy}</p>
                <p className="text-[16px] leading-[1.6] text-[#A1A1AA]">{tool.limit}</p>
                <div className="mt-4">
                  <Link href={tool.href} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
                    Run the check <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  )
}
