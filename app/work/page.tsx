import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Our Work: AI, Software and Automation Projects | Drexa AI',
  description: 'Explore ChatConnect AI, Drex AI Assistant, and the Iqra School Management System. Real systems built by Drexa AI.',
}

const projects = [
  { title: 'ChatConnect AI', copy: 'WhatsApp support automation with knowledge-base answers, lead capture, and human handoff.', tags: ['React', 'Express', 'PostgreSQL'], image: '/chatconnectai.png', href: '/work/chatconnect-ai', code: 'https://github.com/Raja468/chatconnect' },
  { title: 'Drex AI Assistant', copy: 'Windows desktop AI assistant with voice input and output, app control, and web search.', tags: ['Python', 'Voice AI'], image: '/drex.png', href: '/work/drex-ai-assistant', code: 'https://github.com/Raja468/drex-ai' },
  { title: 'Iqra School Management System', copy: 'School management app with admin, teacher, and student roles, attendance, fees, and notices.', tags: ['Flask', 'SQLite'], image: '/lms.png', href: '/work/iqra-school-management', code: 'https://github.com/Raja468/school-management' },
]

export default function WorkListPage() {
  return (
    <main className="bg-white pt-[88px]">
      <section className="relative border-b border-border bg-[#F6F6F3]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#54585F]">
              Work
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Our work
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#16181D]">
              These are our own products and R&D projects. We build real working systems and publish the code where we can. Client projects will be added as they are completed with permission.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <Section key={project.href} number={`0${i + 1}`} title={project.title} noBorderTop={i === 0}>
             <div className={`flex flex-col gap-10 p-8 py-20 md:p-14 lg:p-24 lg:flex-row lg:items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="flex-1">
                 <div className="browser-frame w-full shadow-[0_1px_2px_rgba(22,24,29,0.06)]">
                   <div className="browser-bar">
                     <span /><span /><span />
                   </div>
                   <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
                     <Image src={project.image} alt={project.title} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                   </div>
                 </div>
               </div>
               <div className="lg:w-[400px] shrink-0">
                 <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent">Internal build</p>
                 <h2 className="mt-4 font-display text-[32px] font-bold tracking-tight">{project.title}</h2>
                 <p className="mt-4 text-[18px] leading-[1.6] text-[#54585F]">{project.copy}</p>
                 <div className="mt-6 flex flex-wrap gap-2">
                   {project.tags.map(tag => (
                     <span key={tag} className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#54585F]">[{tag}]</span>
                   ))}
                 </div>
                 <div className="mt-8 flex items-center gap-6">
                   <Link href={project.href} className="group inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-hover decoration-2 underline-offset-4 hover:underline">
                     Read case study <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                   </Link>
                   <a href={project.code} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline decoration-border decoration-2 underline-offset-4 hover:decoration-foreground transition-colors">
                     GitHub
                   </a>
                 </div>
               </div>
             </div>
          </Section>
        ))}
      </div>
      
      <section className="bg-[#16181D] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[32px] md:text-[40px] font-bold tracking-[-0.02em]">Have a project in mind?</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A9ACB2]">
              Book a free 30-minute consultation. We will listen, ask questions, and tell you honestly what we would build and what it would cost.
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
