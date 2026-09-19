"use client";

import {
  Bot,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Globe,
  Shield,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { servicesPage } from "@/content/services";

/* Icons are attached here, by position, rather than stored in content/services.ts. */
const SERVICE_ICONS = [
  CircuitBoard,
  Bot,
  Brain,
  Terminal,
  Globe,
  Sparkles,
  Shield,
  Wand2,
];

const allServices = servicesPage.items;

const engagementModels = servicesPage.engagement.models;

export default function ServicesPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      {/* Header — copy lives in content/services.ts */}
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        title={servicesPage.hero.title}
        accent={servicesPage.hero.accent}
        description={servicesPage.hero.description}
      />

      {/* 8 Detailed Capabilities Grid */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {servicesPage.practices.label}
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold uppercase tracking-tighter text-foreground">
              {servicesPage.practices.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {allServices.map((svc, index) => {
              const Icon = SERVICE_ICONS[index];
              const number = String(index + 1).padStart(2, "0");
              return (
                <FadeUp key={svc.slug}>
                  <div className="group relative flex h-full flex-col justify-between border-2 border-border bg-background p-7 transition-colors duration-300 hover:border-accent sm:p-9">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-background text-accent transition-colors duration-300 group-hover:border-accent">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-[12px] font-semibold text-accent">
                          {number}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-[22px] font-bold uppercase tracking-tight text-foreground">
                        {svc.title}
                      </h3>
                      <p className="mt-2 text-[14px] font-medium text-accent/90">
                        {svc.headline}
                      </p>
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-muted-foreground">
                        {svc.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="mt-6 border-t border-border/70 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          Key Deliverables
                        </span>
                        <ul className="mt-2.5 space-y-2">
                          {svc.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2 text-[13.5px] text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div className="mt-8 border-t border-border/70 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {svc.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-border bg-background px-2.5 py-0.5 font-mono text-[9px] uppercase text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="py-20 md:py-28 border-b border-border bg-muted/30">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {servicesPage.engagement.label}
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-bold uppercase tracking-tighter text-foreground">
              {servicesPage.engagement.title}
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <FadeUp key={model.title}>
                <div className="flex h-full flex-col justify-between border-2 border-border bg-background p-8 transition-colors duration-300 hover:border-accent">
                  <div>
                    <span className="border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      {model.badge}
                    </span>
                    <h3 className="mt-5 font-display text-[22px] font-bold uppercase tracking-tight text-foreground">
                      {model.title}
                    </h3>
                    <div className="mt-1 font-mono text-[12px] text-accent">
                      {model.timeline}
                    </div>
                    <p className="mt-4 text-[14px] leading-[1.6] text-muted-foreground">
                      {model.description}
                    </p>

                    <div className="mt-6 border-t border-border/70 pt-4">
                      <ul className="space-y-2.5">
                        {model.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-[13px] text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border">
                    <ButtonLink
                      href="/contact"
                      size="sm"
                      className="w-full"
                    >
                      Inquire About {model.title}
                    </ButtonLink>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — copy lives in content/services.ts */}
      <CtaBanner
        eyebrow={servicesPage.cta.eyebrow}
        title={servicesPage.cta.title}
        description={servicesPage.cta.description}
        cta={{ label: servicesPage.cta.label, href: servicesPage.cta.href }}
      />
    </main>
  );
}
