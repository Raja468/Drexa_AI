import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'

export const metadata: Metadata = {
  title: 'About Drexa AI | Independent Technology Studio',
  description: 'Drexa AI is an independent studio in Pakistan building AI automation, web and software development, and security services. Meet the founder.',
}

export default function AboutPage() {
  return (
    <main className="bg-[#1B1E22] pt-[88px]">
      <section className="relative border-b border-border bg-[#1B1E22]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A9ACB2]">
              About
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              An independent studio that keeps things practical
            </h1>
          </div>
        </div>
      </section>

      <Section number="01" title="Story">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[20px] leading-[1.6] text-[#F2F2EE]">
            Drexa AI started with a simple idea: many businesses want to use AI, better websites, and better software, but get lost in jargon and inflated promises.
          </p>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            We build practical systems, explain them clearly, and tell you honestly what will and will not work.
          </p>
        </div>
      </Section>

      <Section number="02" title="Founder">
        <div className="flex flex-col p-8 py-16 md:p-14 xl:flex-row xl:items-center xl:gap-16 lg:p-12">
          <div className="mb-10 xl:mb-0 xl:w-[320px] shrink-0">
             <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-[12px] bg-[#2A2D33]">
               {/* Placeholder for founder photo */}
               <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-mono text-[#A9ACB2] uppercase tracking-wider">
                 [Founder Photo Placeholder]
               </div>
             </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Raja, founder.</h2>
            <p className="mt-6 max-w-[50ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
              I am a software developer and BS Computer Science student at Virtual University of Pakistan. I work across web development, AI automation, and cybersecurity, and I hold certifications from Cisco, EC-Council, IBM, and Google.
            </p>
            <p className="mt-4 max-w-[50ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
              I build Drexa AI because I enjoy turning real problems into working systems.
            </p>
          </div>
        </div>
      </Section>

      <Section number="03" title="How we work">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-12 md:grid-cols-2">
            {[
              ['Honest first', 'We tell you what we can and cannot do.'],
              ['Clear communication', 'Plain language, regular updates.'],
              ['You own it', 'Code and designs are yours.'],
              ['Secure by default', 'Security is part of the build.']
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="font-display text-[24px] font-bold">{title}</h3>
                <p className="mt-3 text-[18px] leading-[1.6] text-[#A9ACB2]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section number="04" title="Where we work">
        <div className="p-8 py-16 md:p-14 lg:p-24 border-b border-border">
          <p className="max-w-[60ch] text-[20px] leading-[1.6] text-[#F2F2EE]">
            Based near Islamabad, Pakistan. We work remotely with clients worldwide.
          </p>
        </div>
      </Section>

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
