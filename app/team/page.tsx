"use client";

import { Cpu, ShieldCheck, Sparkles, Terminal, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { teamPage } from "@/content/team";

/* Icons are attached here, by key, rather than stored in content/team.ts. */
const MEMBER_ICONS: Record<(typeof teamPage.members.items)[number]["icon"], LucideIcon> = {
  cpu: Cpu,
  terminal: Terminal,
  sparkles: Sparkles,
  shield: ShieldCheck,
};

const teamMembers = teamPage.members.items;

const teamPrinciples = teamPage.principles.items;

export default function TeamPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      {/* Header — copy lives in content/team.ts */}
      <PageHero
        eyebrow={teamPage.hero.eyebrow}
        title={teamPage.hero.title}
        accent={teamPage.hero.accent}
        description={teamPage.hero.description}
      />

      {/* Team Members Grid */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <div className="mb-12 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  {teamPage.members.label}
                </span>
                <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase tracking-tighter text-foreground">
                  {teamPage.members.title}
                </h2>
              </div>
              <span className="hidden font-mono text-[12px] text-muted-foreground sm:inline-block">
                {teamPage.members.note}
              </span>
            </div>
          </FadeUp>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {teamMembers.map((member) => {
              const Icon = MEMBER_ICONS[member.icon];
              return (
                <StaggerItem key={member.name}>
                  <div className="group relative flex h-full flex-col justify-between border-2 border-border bg-background p-7 transition-colors duration-300 hover:border-accent sm:p-9">
                    <div>
                      {/* Header row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-background text-accent transition-colors duration-300 group-hover:border-accent">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-bold uppercase tracking-tighter text-foreground">
                              {member.name}
                            </h3>
                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <span className="border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                          {member.status}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="mt-5 text-[14.5px] leading-[1.65] text-muted-foreground">
                        {member.bio}
                      </p>

                      {/* Specialties */}
                      <div className="mt-6 border-t border-border/70 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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
                            className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[9px] uppercase text-muted-foreground"
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
                        className="inline-flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
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
      <section className="py-20 md:py-28 border-b border-border bg-muted/40">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {teamPage.principles.label}
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase tracking-tighter text-foreground">
              {teamPage.principles.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {teamPrinciples.map((p) => (
              <FadeUp key={p.number} className="border-2 border-border bg-background p-8">
                <span className="font-mono text-[11px] font-bold text-accent">
                  {p.number}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tighter text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {p.copy}
                </p>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — copy lives in content/team.ts */}
      <CtaBanner
        eyebrow={teamPage.cta.eyebrow}
        title={teamPage.cta.title}
        description={teamPage.cta.description}
        cta={teamPage.cta.cta}
      />
    </main>
  );
}
