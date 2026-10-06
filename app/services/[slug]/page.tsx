import Link from 'next/link'
import { notFound } from 'next/navigation'

const pages = {
  'ai-automation': { title: 'AI automation and development for real business work', label: 'AI Development & Automation', intro: 'We build AI systems that handle repetitive tasks, answer customer questions, and connect your tools, so your team can focus on work that needs people.', items: ['WhatsApp and website chatbots', 'AI agents', 'Workflow automation', 'LLM integration', 'Document and data processing', 'Voice and desktop assistants'] },
  'web-development': { title: 'Websites that load fast and bring in customers', label: 'Web Development', intro: 'Clear design, clean code, and pages built to be found on Google. Your site should explain what you do in five seconds and make it easy to contact you.', items: ['Business websites', 'Landing pages', 'WordPress sites', 'Custom web apps', 'Redesign and speed fixes', 'Website care'] },
  'software-development': { title: 'Custom software built around how your business works', label: 'Custom Software Development', intro: 'If spreadsheets and off-the-shelf tools are slowing you down, we build the system that fits your process.', items: ['Management systems', 'Dashboards and reporting', 'SaaS products', 'Internal tools', 'APIs and integrations', 'Desktop and automation tools'] },
  cybersecurity: { title: 'Practical cybersecurity for small and growing businesses', label: 'Cybersecurity', intro: 'Most small businesses are attacked through simple mistakes. We help you find and fix weak points before someone else finds them.', items: ['Web application security assessment', 'WordPress security hardening', 'Security monitoring support', 'Security awareness training', 'Security review for AI and automation', 'Security basics checklist'] },
} as const

export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })) }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug as keyof typeof pages]
  if (!page) notFound()
  return <main><section className="bg-muted"><div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28"><p className="text-sm font-semibold uppercase tracking-[.08em] text-accent">{page.label}</p><h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-[56px]">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-body">{page.intro}</p><Link href="/contact" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover">Book a free consultation</Link></div></section><section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-24"><h2 className="font-display text-3xl font-bold">What we build</h2><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{page.items.map(item => <div key={item} className="rounded-xl border border-border p-6"><h3 className="font-semibold">{item}</h3><p className="mt-3 leading-7 text-body">A practical, scoped solution designed around your team, your tools, and the outcome you need.</p></div>)}</div></section></main>
}
