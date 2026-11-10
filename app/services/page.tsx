import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Services: AI, Web, Software & Security | Drexa AI',
  description: 'AI automation, website development, custom software, and cybersecurity services from Drexa AI. See what we offer and book a free consultation.',
}

const servicesList = [
  {
    title: 'Website Security', href: '/services/cybersecurity',
    copy: 'We test your website the way an attacker would, then fix what we find. WordPress, Shopify, Wix, or custom-built. Clear report, plain language, no scare tactics.',
    items: ['Website penetration testing', 'WordPress security hardening', 'Security monitoring support', 'Malware cleanup and hardening']
  },
  {
    title: 'AI Visibility', href: '/services/ai-visibility',
    copy: 'More customers now ask ChatGPT, Claude, and Google AI instead of searching. We check if AI mentions your business, then fix the reasons it does not.',
    items: ['AI visibility audit', 'Website fixes for AI', 'Search engine base', 'Off-site mentions']
  },
  {
    title: 'Web Development', href: '/services/web-development',
    copy: 'Fast, secure, search-ready websites that bring in enquiries, not just look good.',
    items: ['Business websites', 'Landing pages', 'WordPress sites', 'Custom web apps']
  },
  {
    title: 'Software and App Development', href: '/services/software-development',
    copy: 'Custom web apps, internal tools, and mobile apps built to your process.',
    items: ['Management systems', 'Dashboards and reporting', 'SaaS products', 'Internal tools']
  },
  {
    title: 'AI Automation', href: '/services/ai-automation',
    copy: 'WhatsApp bots, lead capture, document processing, workflow automation.',
    items: ['WhatsApp and website chatbots', 'AI agents', 'Workflow automation', 'LLM integration']
  },
]

export default function ServicesOverviewPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              Services
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Our services
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              Drexa AI is a small studio that covers the full path from idea to secure, working product. Pick one service or combine several.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {servicesList.map((service, i) => (
          <Section key={service.href} number={`0${i + 1}`} title={service.title} noBorderTop={i === 0}>
            <div className="flex flex-col p-8 py-16 md:p-14 lg:p-24 gap-8">
              <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">
                {service.title}
              </h2>
              <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">
                {service.copy}
              </p>
              <ul className="space-y-3 text-[18px] leading-[1.6] text-[#A1A1AA] list-disc list-inside marker:text-accent-dark">
                {service.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href={service.href} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
                  Learn more <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
                </Link>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section number="06" title="Common combinations">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['Website + AI chatbot', 'A site that answers customer questions and captures leads at any hour.'],
              ['Custom software + security review', 'A business system tested for weak points before launch.'],
              ['Automation + staff awareness training', 'Faster operations and a team that spots phishing.']
            ].map(([title, desc]) => (
              <div key={title} className="flex flex-col gap-3 rounded-[12px] border border-border p-8 transition-colors hover:border-accent">
                <h3 className="text-[20px] font-bold leading-tight">{title}</h3>
                <p className="text-[16px] leading-[1.6] text-[#A1A1AA]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-[#09090B] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Not sure what you need?</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A1A1AA]">
              Tell us the problem, not the solution. We will recommend the simplest approach that works.
            </p>
          </div>
          <div className="flex shrink-0">
            <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
              Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
