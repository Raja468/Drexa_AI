import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { ProjectFrame } from '@/components/mockups/MockFrame'

export const metadata: Metadata = {
  title: 'ChatConnect AI: WhatsApp Support Automation | Drexa AI',
  description: 'Case study of ChatConnect AI, a WhatsApp support platform with knowledge-base answers, lead capture, and human handoff.',
}

export default function ChatConnectAIPage() {
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
              ChatConnect AI
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              AI-powered WhatsApp support and lead capture
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 font-mono text-[13px] text-[#A9ACB2]">
              <span>Type: <span className="font-semibold text-foreground">Internal build</span></span>
              <span>Stack: <span className="font-semibold text-foreground">React, Express, PostgreSQL, Anthropic API</span></span>
              <span>Role: <span className="font-semibold text-foreground">Design, development, deployment</span></span>
              <span>Code: <a href="https://github.com/Raja468/chatconnect" target="_blank" rel="noreferrer" className="text-accent-dark hover:underline">GitHub link</a></span>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="The problem">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            Small businesses receive the same questions on WhatsApp all day: prices, timings, availability. Answering manually is slow, and leads get lost when nobody replies.
          </p>
        </div>
      </Section>

      <Section number="02" title="What we built">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            A platform that answers customer messages using the business's own knowledge base, captures lead details, hands the chat to a human when needed, and gives the owner a dashboard to manage conversations.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-display text-[24px] font-bold">Key features</h3>
              <ul className="mt-4 space-y-3 text-[18px] leading-[1.6] text-[#A9ACB2] list-disc list-inside marker:text-accent-dark">
                <li>Knowledge-base answers</li>
                <li>Lead capture</li>
                <li>Human handoff</li>
                <li>Management dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-[24px] font-bold">How it works</h3>
              <ol className="mt-4 space-y-3 text-[18px] leading-[1.6] text-[#A9ACB2] list-decimal list-inside marker:font-semibold marker:text-foreground">
                <li>Customer message</li>
                <li>AI checks knowledge base</li>
                <li>Answer or handoff</li>
                <li>Owner sees it in dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <Section number="03" title="Technology choices">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A9ACB2]">
            React for the dashboard, Express and PostgreSQL for the backend, and Anthropic models for language understanding. Answers are restricted to approved business information to avoid made-up replies.
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
           <ProjectFrame
             mock="chatconnect"
            alt="ChatConnect AI dashboard with demo data: conversations today, leads captured, and recent conversations"
            sizes="(max-width: 1440px) 100vw, 1440px"
           />
           {/* Add more screenshots if they exist */}
        </div>
      </Section>

      {/* Custom CTA band for case study */}
      <section className="bg-[#16181D] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Want something like this for your business?</h2>
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
