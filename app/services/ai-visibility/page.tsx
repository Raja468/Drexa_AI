import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { AlsoFromUs, Breadcrumb, breadcrumbSchema, faqSchema, JsonLd, ServiceCta, ServiceFaq, serviceSchema } from '@/components/layout/ServicePageBits'

export const metadata: Metadata = {
  title: 'AI Visibility Service: Get Recommended by ChatGPT & Google AI | Drexa AI',
  description: 'We check if ChatGPT, Claude, Gemini, and Perplexity mention your business, then fix why they don\'t. Honest process, no guarantees.',
  alternates: { canonical: 'https://drexa.tech/services/ai-visibility' },
  openGraph: {
    title: 'AI Visibility Service: Get Recommended by ChatGPT & Google AI | Drexa AI',
    description: 'We check if ChatGPT, Claude, Gemini, and Perplexity mention your business, then fix why they don\'t. Honest process, no guarantees.',
    url: 'https://drexa.tech/services/ai-visibility',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Visibility Service: Get Recommended by ChatGPT & Google AI | Drexa AI',
    description: 'We check if ChatGPT, Claude, Gemini, and Perplexity mention your business, then fix why they don\'t. Honest process, no guarantees.',
    images: ['/logo.png'],
  },
}

const steps: [string, string][] = [
  ['AI visibility audit.', 'We ask 30 to 50 real customer questions across ChatGPT, Claude, Gemini, Perplexity, and Google AI. We record who gets mentioned and why.'],
  ['Website fixes.', 'Clear service pages, location and business details, FAQ content that answers real questions, structured data (schema), and a check that AI crawlers can read your site.'],
  ['Search engine base.', 'Google and Bing indexing. AI tools lean on these.'],
  ['Off-site mentions.', 'Directories, reviews, profiles, and articles. AI trusts what other sources say about you, not only what you say.'],
  ['Monthly tracking.', 'Same questions, rechecked. You see progress.'],
]

const faqs: [string, string][] = [
  ['How long does it take?', 'First changes are usually visible in 1 to 3 months.'],
  ['Is this SEO?', 'It overlaps with SEO, but also covers mentions across the web and how clearly AI can understand your business.'],
  ['Does it work for local businesses?', 'Yes. Local businesses often benefit most.'],
]

export default function AiVisibilityPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <JsonLd data={[
        serviceSchema('AI Visibility', 'We check if ChatGPT, Claude, Gemini, and Perplexity mention your business, then fix why they don\'t. Honest process, no guarantees.'),
        faqSchema(faqs),
        breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'AI Visibility' }]),
      ]} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'AI Visibility' }]} />
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col border-x border-border lg:flex-row">
          <div className="shrink-0 border-b border-border p-6 md:p-8 lg:w-80 lg:border-b-0 lg:border-r lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              AI Visibility
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground md:text-[56px]">
              When customers ask AI, will it mention you?
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] font-semibold leading-[1.4] text-[#F2F2EE] md:text-[24px]">
              People now ask &apos;best web developer in Lahore&apos; or &apos;who can secure my online store&apos; directly to AI. AI answers with a short list. If your business is not on it, those customers never see you. AI visibility work makes your business easy for AI to find, understand, and trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
                Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
              <Link href="/seo-check" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-[#141416] px-6 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent-dark">
                Free SEO check
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="What we do">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ol className="space-y-8">
            {steps.map(([title, copy], i) => (
              <li key={title} className="flex flex-col gap-2 md:flex-row md:gap-8">
                <span className="font-mono text-sm font-bold text-accent-dark">{i + 1}</span>
                <div>
                  <h3 className="text-[20px] font-bold leading-tight">{title}</h3>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-[1.6] text-[#A1A1AA]">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 rounded-[12px] border border-highlight bg-highlight-tint p-6 md:p-8">
            <p className="max-w-[60ch] text-[18px] font-semibold leading-[1.6] text-foreground">
              Nobody controls what AI says. Anyone guaranteeing &apos;number one in ChatGPT&apos; is not telling the truth. We improve your odds and show measured results.
            </p>
          </div>
        </div>
      </Section>

      <Section number="02" title="Also from us">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <AlsoFromUs links={[
            { label: 'Website Security', href: '/services/cybersecurity', copy: 'We test your website the way an attacker would, then fix what we find.' },
            { label: 'Web Development', href: '/services/web-development', copy: 'Fast, secure, search-ready websites that bring in enquiries, not just look good.' },
          ]} />
        </div>
      </Section>

      <Section number="03" title="FAQ">
        <ServiceFaq items={faqs} />
      </Section>

      <ServiceCta />
    </main>
  )
}
