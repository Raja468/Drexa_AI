import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/Section'
import { AlsoFromUs, Breadcrumb } from '@/components/layout/ServicePageBits'

const pages = {
  'ai-automation': { title: 'AI automation and development for real business work', label: 'AI Development & Automation', intro: 'We build AI systems that handle repetitive tasks, answer customer questions, and connect your tools, so your team can focus on work that needs people.', items: ['WhatsApp and website chatbots', 'AI agents', 'Workflow automation', 'LLM integration', 'Document and data processing', 'Voice and desktop assistants'] },
  'web-development': { title: 'Websites that load fast and bring in customers', label: 'Web Development', intro: 'Clear design, clean code, and pages built to be found on Google. Your site should explain what you do in five seconds and make it easy to contact you.', items: ['Business websites', 'Landing pages', 'WordPress sites', 'Custom web apps', 'Redesign and speed fixes', 'Website care'], note: 'Every site we build ships with HTTPS, security headers, and search-ready structure.' },
  'software-development': { title: 'Custom software built around how your business works', label: 'Custom Software Development', intro: 'If spreadsheets and off-the-shelf tools are slowing you down, we build the system that fits your process.', items: ['Management systems', 'Dashboards and reporting', 'SaaS products', 'Internal tools', 'APIs and integrations', 'Desktop and automation tools'] },
} as const

export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })) }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug as keyof typeof pages]
  if (!page) notFound()
  return (
    <main className="bg-[#141416] pt-[88px]">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: page.label }]} />
      <section className="bg-muted">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold uppercase tracking-[.08em] text-accent-dark">{page.label}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-[56px]">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-body">{page.intro}</p>
          {'note' in page && page.note ? (
            <p className="mt-6 max-w-2xl rounded-[12px] border border-highlight bg-highlight-tint px-4 py-3 text-[16px] leading-[1.6] text-foreground">{page.note}</p>
          ) : null}
          <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground hover:bg-accent-hover">Book a free consultation</Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-24">
        <h2 className="font-display text-[28px] font-bold tracking-[-0.02em] md:text-[44px]">What we build</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.items.map(item => (
            <div key={item} className="rounded-xl border border-border p-6">
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-3 leading-7 text-body">A practical, scoped solution designed around your team, your tools, and the outcome you need.</p>
            </div>
          ))}
        </div>
      </section>
      <Section title="Also from us">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <AlsoFromUs links={[
            { label: 'Website Security', href: '/services/cybersecurity', copy: 'We test your website the way an attacker would, then fix what we find.' },
            { label: 'AI Visibility', href: '/services/ai-visibility', copy: 'We check if AI mentions your business, then fix the reasons it does not.' },
          ]} />
        </div>
      </Section>
    </main>
  )
}
