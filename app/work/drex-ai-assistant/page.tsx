import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'Drex AI Assistant: Windows Voice AI Assistant | Drexa AI',
  description: 'Case study of Drex AI Assistant, a Windows desktop assistant with voice input and output, app control, web search, and screenshots.',
}

export default function DrexAIAssistantPage() {
  return (
    <main className="bg-[#1B1E22] pt-[88px]">
      <section className="relative border-b border-border bg-[#1B1E22]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A9ACB2]">
              Work / Case Study
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Drex AI Assistant
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              Windows desktop AI assistant with voice input and output, app control, and web search. Replaces standard OS search with intelligent workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-mono text-[13px] text-[#A9ACB2]">
              <span>Type: <span className="font-semibold text-foreground">R&D project</span></span>
              <span>Stack: <span className="font-semibold text-foreground">Python</span></span>
              <span>Code: <a href="https://github.com/Raja468/drex-ai" target="_blank" rel="noreferrer" className="text-accent-dark hover:underline">GitHub link</a></span>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="The idea">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            Explore how far a desktop assistant can go: listening, understanding intent, and acting on the computer.
          </p>
        </div>
      </Section>

      <Section number="02" title="What it does">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ul className="space-y-3 text-[18px] leading-[1.6] text-[#A9ACB2] list-disc list-inside marker:text-accent-dark">
            <li>Voice input and output</li>
            <li>Intent parsing</li>
            <li>Opening and controlling apps</li>
            <li>Web search</li>
            <li>Screenshots</li>
            <li>Text mode</li>
          </ul>
        </div>
      </Section>

      <Section number="03" title="What we learned">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            Reliable intent parsing and safe app control matter more than flashy features.
          </p>
        </div>
      </Section>

      <Section number="04" title="Results">
        <div className="p-8 py-16 md:p-14 lg:p-24 border-b border-border">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            Currently in active development and testing.
          </p>
        </div>
      </Section>

      <Section title="Gallery" noBorderTop>
        <div className="flex flex-col gap-12 p-8 py-16 md:p-14 lg:p-24 bg-[#1B1E22]">
           <div className="browser-frame w-full shadow-[0_1px_2px_rgba(22,24,29,0.06)]">
             <div className="browser-bar"><span /><span /><span /></div>
             <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
               <Image src="/drex.png" alt="Drex AI Assistant screenshot" fill className="object-cover object-top" sizes="(max-width: 1440px) 100vw, 1440px" />
             </div>
           </div>
        </div>
      </Section>

      {/* Custom CTA band for case study */}
      <section className="bg-[#16181D] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Need a custom assistant or desktop automation tool?</h2>
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
