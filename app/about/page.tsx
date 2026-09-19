"use client";

import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { aboutPage } from "@/content/about";

const studioConvictions = aboutPage.convictions.items;

const techStackGroups = aboutPage.stack.groups;

const studioStats = aboutPage.stats;

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      {/* Header — copy lives in content/about.ts */}
      <PageHero
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        accent={aboutPage.hero.accent}
        description={aboutPage.hero.description}
      />

      <section className="py-14 md:py-20">
        <Container>
          {/* Stats bar */}
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-6 border-t-2 border-border pt-8 md:grid-cols-3">
              {studioStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold text-foreground tracking-tight">
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
      <section className="py-20 md:py-28 border-b border-border bg-muted/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <FadeUp>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {aboutPage.narrative.label}
              </span>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase tracking-tighter text-foreground leading-[1.1]">
                {aboutPage.narrative.title}
              </h2>
            </FadeUp>

            <FadeUp delay={0.1} className="space-y-6 text-[16px] leading-[1.75] text-muted-foreground">
              {aboutPage.narrative.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* 4 Core Convictions */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {aboutPage.convictions.label}
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase tracking-tighter text-foreground">
              {aboutPage.convictions.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {studioConvictions.map((c) => (
              <FadeUp key={c.number}>
                <div className="flex h-full flex-col justify-between border-2 border-border bg-background p-8 transition-colors duration-300 hover:border-accent">
                  <div>
                    <span className="font-mono text-[12px] font-semibold text-accent">
                      {c.number}
                    </span>
                    <h3 className="mt-4 font-display text-[21px] font-bold uppercase tracking-tight text-foreground">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
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
      <section className="py-20 md:py-28 border-b border-border bg-muted/30">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {aboutPage.stack.label}
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase tracking-tighter text-foreground">
              {aboutPage.stack.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techStackGroups.map((group) => (
              <FadeUp key={group.category} className="border-2 border-border bg-background p-6">
                <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent font-semibold">
                  {group.category}
                </h3>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[14px] text-muted-foreground">
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

      {/* CTA — copy lives in content/about.ts */}
      <CtaBanner
        eyebrow={aboutPage.cta.eyebrow}
        title={aboutPage.cta.title}
        description={aboutPage.cta.description}
        cta={{ label: aboutPage.cta.label, href: aboutPage.cta.href }}
      />
    </main>
  );
}
