"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ExternalLink, Filter, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";

type ProjectCategory = "all" | "ai" | "software" | "rnd";

const workProjects = [
  {
    slug: "chatconnect-ai",
    number: "01",
    category: "ai",
    badge: "Internal Build",
    type: "AI / WhatsApp Operations",
    title: "ChatConnect AI",
    tagline: "Autonomous customer communication engine with enterprise CRM integration.",
    description:
      "A complete AI-powered WhatsApp customer support and sales automation platform. Features dynamic vector retrieval for knowledge-base answering, lead qualification, seamless human agent handoff, and an executive analytics dashboard.",
    tags: ["React", "Express", "PostgreSQL", "Anthropic Claude", "WhatsApp API"],
    metrics: [
      { label: "Automation rate", value: "98%" },
      { label: "Avg response", value: "< 2.5s" },
      { label: "Lead capture", value: "3.4x" },
    ],
    github: "https://github.com/Raja468/chatconnect-ai",
    image: "/chatconnectai.png",
    featured: true,
  },
  {
    slug: "drex-ai-assistant",
    number: "02",
    category: "rnd",
    badge: "R&D Project",
    type: "AI / Desktop Automation",
    title: "DREX AI Voice Assistant",
    tagline: "Native Windows desktop AI assistant with multimodal system control.",
    description:
      "A high-performance desktop assistant with speech-to-text, natural intent parsing, computer vision screen analysis, OS application orchestration, and contextual web search. Bridges LLM reasoning directly with native OS controls.",
    tags: ["Python", "Whisper", "Voice AI", "Win32 API", "PyTorch"],
    metrics: [
      { label: "Intent accuracy", value: "96.4%" },
      { label: "Voice latency", value: "420ms" },
      { label: "OS tasks", value: "50+ tools" },
    ],
    github: "https://github.com/Raja468/Drex-AI-Assisstant",
    image: "/drex.png",
    featured: true,
  },
  {
    slug: "iqra-school-system",
    number: "03",
    category: "software",
    badge: "Internal Build",
    type: "Education / Operations Platform",
    title: "Iqra School Management System",
    tagline: "Comprehensive institutional ERP with role-based student and faculty workflows.",
    description:
      "An end-to-end educational administration platform managing admissions, attendance tracking, automated grade calculation, fee vouchers, notices, and role-based permissions for administrators, faculty, and students.",
    tags: ["Flask", "SQLite", "Jinja2", "Tailwind CSS", "Chart.js"],
    metrics: [
      { label: "Daily users", value: "1,200+" },
      { label: "Grade sync", value: "Instant" },
      { label: "Uptime", value: "99.9%" },
    ],
    github: "https://github.com/Raja468/iqra-school-system",
    image: "/lms.png",
    featured: false,
  },
  {
    slug: "rag-knowledge-engine",
    number: "04",
    category: "ai",
    badge: "Architecture Concept",
    type: "Enterprise AI / RAG",
    title: "Enterprise RAG Intelligence",
    tagline: "Private document reasoning engine with zero-hallucination guardrails.",
    description:
      "Vector-indexed neural retrieval pipeline designed to synthesize answers across tens of thousands of complex internal policy manuals, contracts, and codebases with exact page citations and verification checks.",
    tags: ["Next.js", "Python", "Qdrant", "LangChain", "OpenAI"],
    metrics: [
      { label: "Citation rate", value: "100%" },
      { label: "Query speed", value: "< 800ms" },
      { label: "Security", value: "Air-gapped" },
    ],
    github: "https://github.com/Raja468",
    image: "/hero.png",
    featured: false,
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    filter === "all"
      ? workProjects
      : workProjects.filter((p) => p.category === filter);

  return (
    <main className="bg-bg-dark text-white pt-24 pb-28">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-[10%] top-[-20%] h-[400px] w-[400px] rounded-full bg-accent/10 blur-[130px]"
          aria-hidden="true"
        />
        <Container>
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ae6b4]">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-mint" />
              Selected Portfolio
            </div>
            <h1 className="max-w-[850px] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              Projects, not promises.{" "}
              <span className="hero-glow-text block">Built for the real world.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-text-secondary md:text-[18px]">
              Explore our production builds across autonomous AI agents, WhatsApp automations,
              enterprise platforms, and native system automation. Designed cleanly and built
              to solve actual business bottlenecks.
            </p>
          </FadeUp>

          {/* Filter Tabs */}
          <FadeUp delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
              <span className="mr-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                <Filter className="h-3.5 w-3.5 text-accent" /> Filter by:
              </span>
              {[
                { id: "all", label: "All Projects" },
                { id: "ai", label: "AI & Automation" },
                { id: "software", label: "Software Systems" },
                { id: "rnd", label: "R&D Builds" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as ProjectCategory)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                    filter === tab.id
                      ? "border border-accent/60 bg-accent text-bg-dark font-semibold shadow-[0_0_15px_rgba(25,216,210,0.4)]"
                      : "border border-border bg-bg-surface text-text-secondary hover:border-accent/30 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-16">
            {filteredProjects.map((project, idx) => (
              <FadeUp key={project.slug} delay={idx * 0.08}>
                <article className="group relative overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(25,216,210,0.15)]">
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                    {/* Visual Media */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-elevated lg:border-b-0 lg:border-r">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="rounded-md border border-accent/30 bg-bg-dark/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur-md">
                          {project.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content & Details */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                            {project.type}
                          </span>
                          <span className="font-mono text-[12px] font-semibold text-accent">
                            {project.number}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-white">
                          {project.title}
                        </h2>
                        <p className="mt-2 text-[14.5px] font-medium text-accent/90">
                          {project.tagline}
                        </p>
                        <p className="mt-4 text-[15px] leading-[1.65] text-text-secondary">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border/80 py-4">
                          {project.metrics.map((m) => (
                            <div key={m.label}>
                              <div className="font-display text-[18px] font-bold text-white">
                                {m.value}
                              </div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded border border-border bg-bg-dark px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="mt-8 flex items-center gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="hero-neon-pill inline-flex h-11 items-center gap-2 px-6 text-[13px] font-semibold text-white"
                        >
                          <span>Explore Repository</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-border py-24 bg-bg-surface/50">
        <Container>
          <FadeUp className="rounded-3xl border border-accent/30 bg-gradient-to-br from-[#0a120e] to-bg-dark p-8 md:p-14 text-center shadow-[0_0_50px_rgba(25,216,210,0.1)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Let&apos;s Build Together
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-[-0.04em]">
              Have a project or technical challenge?
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[16px] text-text-secondary leading-[1.6]">
              Whether you need to automate critical workflows with AI, build custom software, or engineer an MVP, we are ready to help.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="hero-neon-pill inline-flex h-12 items-center gap-2 px-8 text-[14px] font-semibold text-white"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
