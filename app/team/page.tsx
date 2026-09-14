"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Cpu, ExternalLink, ShieldCheck, Sparkles, Terminal, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";

const teamMembers = [
  {
    name: "Raja",
    role: "Founder & Lead AI Architect",
    bio: "Leads engineering architecture and applied AI systems at Drexa. Specialized in autonomous agents, voice intelligence, and end-to-end automation pipelines.",
    specialties: ["Autonomous Agents", "LLM Pipelines", "Voice AI", "System Architecture"],
    skills: ["Python", "Anthropic Claude", "OpenAI", "Next.js", "LangChain"],
    github: "https://github.com/Raja468",
    icon: Cpu,
    status: "Active on core builds",
  },
  {
    name: "Hamza Tariq",
    role: "Senior Systems & Backend Engineer",
    bio: "Builds high-throughput backends, secure database architectures, and API integrations that sustain mission-critical production loads.",
    specialties: ["Cloud Infrastructure", "API Gateways", "Relational Databases", "Microservices"],
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "https://github.com/Raja468",
    icon: Terminal,
    status: "Infrastructure & APIs",
  },
  {
    name: "Ayan Malik",
    role: "Product Designer & UI Engineer",
    bio: "Bridges user psychology and technical engineering to craft high-conversion interfaces, sleek design systems, and responsive web experiences.",
    specialties: ["Design Systems", "Interactive Motion", "Information Architecture", "UX Strategy"],
    skills: ["Figma", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    github: "https://github.com/Raja468",
    icon: Sparkles,
    status: "Design & Interaction",
  },
  {
    name: "Zain Ahmed",
    role: "Cybersecurity & DevOps Lead",
    bio: "Hardens AI pipelines, conducts web application penetration testing, and ensures data governance across client platforms and internal tools.",
    specialties: ["Penetration Testing", "Threat Modeling", "CI/CD Hardening", "Data Privacy"],
    skills: ["Security Audits", "Linux", "OWASP", "Vulnerability Scanning", "Network Security"],
    github: "https://github.com/Raja468",
    icon: ShieldCheck,
    status: "Security & Hardening",
  },
];

const teamPrinciples = [
  {
    number: "01",
    title: "Direct engineering access",
    copy: "You don't talk to account managers or junior coordinators. You communicate directly with the senior engineers architecting and writing your code.",
  },
  {
    number: "02",
    title: "AI as a native capability",
    copy: "AI isn't a trendy feature we tack on at the end. We understand model behavior, latency, evaluation, and failure modes from the ground up.",
  },
  {
    number: "03",
    title: "Relentless execution speed",
    copy: "We ship in tight, iterative sprints with weekly working demos. Ideas turn into testable reality in weeks, not quarters.",
  },
];

export default function TeamPage() {
  return (
    <main className="bg-bg-dark text-white pt-24 pb-28">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-[15%] top-[-20%] h-[420px] w-[420px] rounded-full bg-mint/10 blur-[140px]"
          aria-hidden="true"
        />
        <Container>
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ae6b4]">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-mint" />
              The People Behind Drexa
            </div>
            <h1 className="max-w-[850px] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              Engineers and builders.{" "}
              <span className="hero-glow-text block">Not middle management.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-text-secondary md:text-[18px]">
              We are a compact, multidisciplinary technical studio. We bring together AI specialists,
              full-stack engineers, cybersecurity analysts, and product designers who treat your software
              with the craft and rigor it deserves.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <div className="mb-12 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Core Team
                </span>
                <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white tracking-tight">
                  Meet the crew
                </h2>
              </div>
              <span className="hidden font-mono text-[12px] text-text-muted sm:inline-block">
                Based in PK · Working Globally
              </span>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <StaggerItem key={member.name}>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-bg-surface p-7 sm:p-9 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(25,216,210,0.12)]">
                    <div>
                      {/* Header row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-bg-dark text-accent shadow-[0_0_15px_rgba(25,216,210,0.25)]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-[22px] font-semibold text-white">
                              {member.name}
                            </h3>
                            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full border border-mint/20 bg-mint/[0.05] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#9ae6b4]">
                          {member.status}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="mt-5 text-[14.5px] leading-[1.65] text-text-secondary">
                        {member.bio}
                      </p>

                      {/* Specialties */}
                      <div className="mt-6 border-t border-border/70 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                          Focus Areas
                        </span>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {member.specialties.map((spec) => (
                            <span
                              key={spec}
                              className="rounded border border-accent/25 bg-accent/[0.04] px-2.5 py-1 font-mono text-[10px] text-accent"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack & Links */}
                    <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="rounded border border-border bg-bg-dark px-2 py-0.5 font-mono text-[9px] uppercase text-text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${member.name} on GitHub`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-dark text-text-secondary transition-colors hover:border-accent hover:text-accent"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* Team Principles */}
      <section className="py-20 md:py-28 border-b border-border bg-bg-surface/40">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              How We Operate
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white tracking-tight">
              A studio culture anchored in engineering truth.
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {teamPrinciples.map((p) => (
              <FadeUp key={p.number} className="rounded-2xl border border-border bg-bg-dark p-8">
                <span className="font-mono text-[11px] font-semibold text-accent">
                  {p.number}
                </span>
                <h3 className="mt-4 font-display text-[19px] font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-text-secondary">
                  {p.copy}
                </p>
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
              Work With Us
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-[-0.04em]">
              Ready to work with a dedicated team?
            </h2>
            <p className="mx-auto mt-4 max-w-[500px] text-[16px] text-text-secondary leading-[1.6]">
              Book a direct consultation with our engineering leads. No sales pitches — just actionable technical architecture.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="hero-neon-pill inline-flex h-12 items-center gap-2 px-8 text-[14px] font-semibold text-white"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
