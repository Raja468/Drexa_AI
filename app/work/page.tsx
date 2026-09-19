"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { workPage } from "@/content/work";

type ProjectCategory = "all" | "ai" | "software" | "rnd";

/* Project data lives in content/work.ts — the local copy carried invented
   metrics ("98% automation rate", "1,200+ daily users", …) that nothing in
   this repository can verify, so it was removed in favour of the cleaned
   module. */
const workProjects = workPage.items;

export default function WorkPage() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    filter === "all"
      ? workProjects
      : workProjects.filter((p) => p.category === filter);

  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      {/* Header — copy lives in content/work.ts (invented metrics removed) */}
      <PageHero
        eyebrow={workPage.hero.eyebrow}
        title={workPage.hero.title}
        accent={workPage.hero.accent}
        description={workPage.hero.description}
      />

      {/* Filter Tabs */}
      <section className="border-b-2 border-border py-10">
        <Container>
          <FadeUp>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
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
                  aria-pressed={filter === tab.id}
                  className={`border-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                    filter === tab.id
                      ? "border-accent bg-accent text-accent-foreground font-bold"
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
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
                <article className="group relative overflow-hidden border-2 border-border bg-background transition-colors duration-300 hover:border-accent">
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                    {/* Visual Media */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-muted lg:border-b-0 lg:border-r">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="border border-border bg-background/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                          {project.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content & Details */}
                    <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                            {project.type}
                          </span>
                          <span className="font-mono text-[12px] font-bold text-accent">
                            {project.number}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold uppercase tracking-tighter text-foreground">
                          {project.title}
                        </h2>
                        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-accent">
                          {project.tagline}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="mt-8 flex items-center gap-4">
                        <ButtonLink href={project.github} size="sm">
                          Explore Repository
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA — copy lives in content/work.ts */}
      <CtaBanner
        eyebrow={workPage.cta.eyebrow}
        title={workPage.cta.title}
        description={workPage.cta.description}
        cta={{ label: workPage.cta.label, href: workPage.cta.href }}
      />
    </main>
  );
}
