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
    title: 'AI Development & Automation', href: '/services/ai-automation', 
    copy: 'Automate repetitive work with AI agents, chatbots, and workflow automation. WhatsApp support bots, lead capture, document processing, and internal tools.',
    items: ['WhatsApp and website chatbots', 'AI agents', 'Workflow automation', 'LLM integration']
  },
  { 
    title: 'Web Development', href: '/services/web-development', 
    copy: 'Fast, clear, search-friendly websites and web apps. Business sites, landing pages, WordPress, and custom Next.js builds.',
    items: ['Business websites', 'Landing pages', 'WordPress sites', 'Custom web apps']
  },
  { 
    title: 'Custom Software', href: '/services/software-development', 
    copy: 'Dashboards, management systems, SaaS products, and internal tools built around how your business actually works.',
    items: ['Management systems', 'Dashboards and reporting', 'SaaS products', 'Internal tools']
  },
  { 
    title: 'Cybersecurity', href: '/services/cybersecurity', 
    copy: 'Web application security checks, security monitoring support, and staff awareness training. Find weak points before attackers do.',
    items: ['Web app security assessment', 'WordPress security hardening', 'Security monitoring support', 'Security awareness training']
  }
]

export default function ServicesOverviewPage() {
  return (
    <main className="bg-white pt-[88px]">
      <section className="relative border-b border-border bg-[#F6F6F3]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#54585F]">
              Services
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Our services
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#16181D]">
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
              <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#54585F]">
                {service.copy}
              </p>
              <ul className="space-y-3 text-[18px] leading-[1.6] text-[#54585F] list-disc list-inside marker:text-accent">
                {service.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href={service.href} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
                  Learn more <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
                </Link>
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section number="05" title="Common combinations">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ['Website + AI chatbot', 'A site that answers customer questions and captures leads at any hour.'],
              ['Custom software + security review', 'A business system tested for weak points before launch.'],
              ['Automation + staff awareness training', 'Faster operations and a team that spots phishing.']
            ].map(([title, desc]) => (
              <div key={title} className="flex flex-col gap-3 rounded-[12px] border border-border p-8 transition-colors hover:border-accent">
                <h3 className="text-[20px] font-bold leading-tight">{title}</h3>
                <p className="text-[16px] leading-[1.6] text-[#54585F]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-[#16181D] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Not sure what you need?</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A9ACB2]">
              Tell us the problem, not the solution. We will recommend the simplest approach that works.
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
