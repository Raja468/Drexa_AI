"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Lock,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";

const studioConvictions = [
  {
    number: "01",
    title: "Engineering over hype",
    description:
      "Most AI products today are fragile wrappers around generic APIs. We architect production-hardened systems with evaluation benchmarks, fallback pipelines, and deterministic reliability.",
  },
  {
    number: "02",
    title: "Zero account manager bureaucracy",
    description:
      "Nothing gets lost in translation. You collaborate directly with the lead engineers, AI architects, and designers actively writing your software.",
  },
  {
    number: "03",
    title: "Complete client IP ownership",
    description:
      "From day one, you own 100% of your code, repository, database schemas, prompt libraries, and deployment scripts. No vendor lock-in, ever.",
  },
  {
    number: "04",
    title: "Speed with architectural depth",
    description:
      "We believe in tight 2-week iterative shipping cadences, but never at the expense of type safety, maintainability, and security hardening.",
  },
];

const techStackGroups = [
  {
    category: "AI & Intelligence",
    items: ["Anthropic Claude", "OpenAI GPT", "LangChain", "Qdrant", "Whisper", "PyTorch"],
  },
  {
    category: "Full-Stack Software",
    items: ["Next.js 16", "React 19", "TypeScript", "Python / FastAPI", "Node.js", "Flask"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Redis", "Pinecone", "SQLite", "Prisma"],
  },
  {
    category: "Infrastructure & Security",
    items: ["Docker", "Cloudflare", "AWS", "Linux Hardening", "OWASP"],
  },
];

const studioStats = [
  { value: "100%", label: "IP Ownership Handover" },
  { value: "2-Week", label: "Iterative Sprint Demos" },
  { value: "0", label: "Middlemen Account Layers" },
  { value: "< 500ms", label: "Avg Interface & API Latency" },
];

export default function AboutPage() {
  return (
    <main className="bg-bg-dark text-white pt-24 pb-28">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-[15%] top-[-20%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]"
          aria-hidden="true"
        />
        <Container>
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ae6b4]">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-mint" />
              Studio Philosophy
            </div>
            <h1 className="max-w-[850px] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              We build what{" "}
              <span className="hero-glow-text block">thinks forward.</span>
            </h1>
            <p className="mt-7 max-w-[640px] text-[17px] leading-[1.65] text-text-secondary md:text-[18px]">
              DREXA AI is an independent software engineering and applied AI studio. We partner with
              ambitious founders, growing companies, and innovators to turn complex operational friction
              into effortless, high-performing digital systems.
            </p>
          </FadeUp>

          {/* Stats bar */}
          <FadeUp delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
              {studioStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Origin & Narrative Section */}
      <section className="py-20 md:py-28 border-b border-border bg-bg-surface/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                The Narrative
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold text-white tracking-tight leading-[1.1]">
                Why we built an independent technology studio.
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="space-y-6 text-[16px] leading-[1.75] text-text-secondary">
              <p>
                The modern software industry is saturated with bloated traditional consultancies that move
                glacially, and superficial AI creators pushing flimsy wrapper demos.
              </p>
              <p>
                We started Drexa AI to offer a high-signal alternative: a tight-knit squad of senior engineers
                and designers who build serious software. We believe that applying artificial intelligence to a
                business is not about flashy party tricks — it is about saving hundreds of engineering hours,
                automating critical communication channels, and giving your business an undeniable operational moat.
              </p>
              <p>
                Every project we ship is treated with uncompromising craft. Clean codebase architecture, modern
                reactive user experiences, strict type safety, and real production endurance.
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* 4 Core Convictions */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Guiding Principles
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white tracking-tight">
              What we stand for
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {studioConvictions.map((c) => (
              <FadeUp key={c.number}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-bg-surface p-8 transition-all hover:border-accent/40">
                  <div>
                    <span className="font-mono text-[12px] font-semibold text-accent">
                      {c.number}
                    </span>
                    <h3 className="mt-4 font-display text-[21px] font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-[1.65] text-text-secondary">
                      {c.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-20 md:py-28 border-b border-border bg-bg-surface/30">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Engineering Stack
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white tracking-tight">
              Modern tools chosen for durability, speed, and scale.
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStackGroups.map((group) => (
              <FadeUp key={group.category} className="rounded-2xl border border-border bg-bg-dark p-6">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent font-semibold">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[14px] text-text-secondary">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <FadeUp className="rounded-3xl border border-accent/30 bg-gradient-to-br from-[#0a120e] to-bg-dark p-8 md:p-14 text-center shadow-[0_0_50px_rgba(25,216,210,0.1)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Start a Dialogue
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-[-0.04em]">
              Have a problem worth solving?
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[16px] text-text-secondary leading-[1.6]">
              Tell us about what you are trying to build. We will review your requirements and provide honest, practical recommendations.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="hero-neon-pill inline-flex h-12 items-center gap-2 px-8 text-[14px] font-semibold text-white"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
