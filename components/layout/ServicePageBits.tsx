import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function serviceSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'ProfessionalService', name: 'Drexa AI', url: 'https://drexa.tech' },
    areaServed: [
      { '@type': 'City', name: 'Chakwal' },
      { '@type': 'Country', name: 'Pakistan' },
      'Worldwide',
    ],
  }
}

export function faqSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://drexa.tech${item.href}` } : {}),
    })),
  }
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] border-x border-border bg-[#141416] px-6 py-6 md:px-10 lg:px-16">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#A1A1AA]">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-accent-dark">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#F2F2EE]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ServiceFaq({ items }: { items: [string, string][] }) {
  return (
    <div className="flex flex-col">
      {items.map(([q, a], i) => (
        <details key={q} className={`group ${i > 0 ? 'border-t border-[#2A2D33]' : ''}`}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-8 text-[20px] font-semibold transition-colors hover:bg-[#141416] md:px-14 lg:px-20 [&::-webkit-details-marker]:hidden">
            {q}
            <Plus size={24} className="shrink-0 text-accent-dark transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="px-8 pb-10 pt-2 md:px-14 lg:px-20">
            <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">{a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

export function ServiceCta() {
  return (
    <section className="border-t border-[#2A2D33] bg-[#09090B] text-[#F2F2EE]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
        <div>
          <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[44px]">Have a project in mind?</h2>
          <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A1A1AA]">
            Book a free 30-minute consultation. We will listen, ask questions, and tell you honestly what we would build and what it would cost. No obligation.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4">
          <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0">
            Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
          </Link>
          <a href="https://wa.me/923715082737" className="group inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-[#141416]/5 active:translate-y-0">
            Message on WhatsApp <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
          </a>
        </div>
      </div>
    </section>
  )
}

export function AlsoFromUs({ links }: { links: { label: string; href: string; copy: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="group rounded-[12px] border border-border p-6 transition-colors hover:border-accent">
          <h3 className="text-[20px] font-bold leading-tight group-hover:text-accent-dark">{link.label}</h3>
          <p className="mt-2 text-[16px] leading-[1.6] text-[#A1A1AA]">{link.copy}</p>
        </Link>
      ))}
    </div>
  )
}
