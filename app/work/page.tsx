import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ProjectFrame, type MockName } from '@/components/mockups/MockFrame'

export const metadata: Metadata = {
  title: 'Our Work: AI, Software and Automation Projects | Drexa AI',
  description: 'Explore ChatConnect AI, Drex AI Assistant, and the Iqra School Management System. Real systems built by Drexa AI.',
}

type Project = {
  title: string
  copy: string
  tags: string[]
  href: string
  code: string
  alt: string
  mock?: MockName
  image?: string
}

const projects: Project[] = [
  { title: 'ChatConnect AI', copy: 'WhatsApp support automation with knowledge-base answers, lead capture, and human handoff.', tags: ['React', 'Express', 'PostgreSQL', 'Anthropic'], mock: 'chatconnect', alt: 'ChatConnect AI dashboard with demo data: conversations today, leads captured, and recent conversations', href: '/work/chatconnect-ai', code: 'https://github.com/Raja468/chatconnect' },
  { title: 'Drex AI Assistant', copy: 'Windows desktop AI assistant with voice input and output, app control, and web search.', tags: ['Python', 'Voice AI'], image: '/drex.png', alt: 'Drex AI Assistant interface', href: '/work/drex-ai-assistant', code: 'https://github.com/Raja468/drex-ai' },
  { title: 'Iqra School Management System', copy: 'School management app with admin, teacher, and student roles, attendance, fees, and notices.', tags: ['Flask', 'SQLite'], mock: 'iqra', alt: 'Iqra school dashboard with demo data: enrolment stats, student register, and notices', href: '/work/iqra-school-management', code: 'https://github.com/Raja468/school-management' },
]

export default function WorkListPage() {
  return (
    <main className="bg-[#1B1E22] pt-[88px]">
      <section className="relative border-b border-border bg-[#1B1E22]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A9ACB2]">
              Work
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Our work
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              These are our own products and R&D projects. We build real working systems and publish the code where we can. Client projects will be added as they are completed with permission.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <Section key={project.href} number={`0${i + 1}`} title={project.title} noBorderTop={i === 0}>
             <div className={`flex flex-col gap-10 p-8 py-20 md:p-14 lg:p-16 lg:flex-row lg:items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="flex-1 min-w-0">
                 <div className="w-full">
                   <ProjectFrame mock={project.mock} image={project.image} alt={project.alt} />
                 </div>
               </div>
               <div className="lg:w-[360px] shrink-0">
                 <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">Internal build</p>
                 <h2 className="mt-4 font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">{project.title}</h2>
                 <p className="mt-4 text-[18px] leading-[1.6] text-[#A9ACB2]">{project.copy}</p>
                 <div className="mt-6 flex flex-wrap gap-2">
                   {project.tags.map(tag => (
                     <span key={tag} className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#A9ACB2]">[{tag}]</span>
                   ))}
                 </div>
                 <div className="mt-8 flex items-center gap-6">
                   <Link href={project.href} className="group inline-flex items-center gap-2 font-semibold text-accent-dark hover:text-accent-dark-hover decoration-2 underline-offset-4 hover:underline">
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
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Have a project in mind?</h2>
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
