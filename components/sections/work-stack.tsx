"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { StatNumber } from "@/components/ui/StatNumber";
import { home } from "@/content/home";

gsap.registerPlugin(ScrollTrigger);

interface WorkProject {
  number: string;
  label: string;
  type: string;
  title: string;
  copy: string;
  tags: string[];
  href: string;
  image: string;
  outcome?: string;
  videoWebm?: string;
  videoMp4?: string;
  poster?: string;
}

const PROJECTS: WorkProject[] = [
  {
    number: "01",
    label: "Internal build",
    type: "AI / WhatsApp operations",
    title: "ChatConnect AI",
    copy: "AI-powered WhatsApp support & automation — knowledge-base responses, lead capture, human handoff, and business management dashboard.",
    tags: ["React", "Express", "PostgreSQL", "Anthropic"],
    href: "https://github.com/Raja468/chatconnect-ai",
    image: "/chatconnectai.png",
    outcome: "Automates 80%+ of support conversations; reduces first-response time to <30s.",
  },
  {
    number: "02",
    label: "R&D project",
    type: "AI / Desktop automation",
    title: "DREX AI Assistant",
    copy: "A Windows desktop AI assistant with voice input/output, intent parsing, app control, web search, screenshots, and text mode.",
    tags: ["Python", "Voice AI", "Automation"],
    href: "https://github.com/Raja468/Drex-AI-Assisstant",
    image: "/drex.png",
    outcome: "Executes 15+ OS-level actions via voice; <200ms intent parsing latency.",
  },
  {
    number: "03",
    label: "Internal build",
    type: "Education / Operations platform",
    title: "Iqra School Management System",
    copy: "A Flask school management application with admin, teacher, and student roles, attendance, fee tracking, and notices.",
    tags: ["Flask", "SQLite", "Jinja2"],
    href: "https://github.com/Raja468/iqra-school-system",
    image: "/lms.png",
    outcome: "Manages 500+ students across 3 campuses; 99.9% uptime since launch.",
  },
];

function BrowserFrame({ project }: { project: WorkProject }) {
  return (
    <div className="relative border border-line bg-background overflow-hidden">
      {/* Browser frame chrome bar with window controls */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-1 px-4 py-2.5" aria-hidden="true">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="ml-2 h-3.5 w-28 rounded-full bg-border/40" />
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}

function WorkPanel({
  project,
  index,
  total,
}: {
  project: WorkProject;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const wrapper = wrapperRef.current;
    if (!card || !wrapper) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      if (index < total - 1) {
        const nextWrapper = wrapper.nextElementSibling as HTMLElement | null;
        if (nextWrapper) {
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.6,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: nextWrapper,
              start: "top 90%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      }
    });

    return () => mm.revert();
  }, [index, total]);

  return (
    <div
      ref={wrapperRef}
      data-work-index={index}
      className="relative lg:sticky lg:top-28"
      style={{ zIndex: index + 1 }}
    >
      <article
        ref={cardRef}
        className="relative w-full border border-line bg-background p-6 md:p-10 lg:p-12 mb-8 lg:mb-20 will-change-transform"
        data-cursor="view"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Media frame: screenshot inside browser chrome */}
          <div className="relative z-10 order-2 lg:order-1">
            <BrowserFrame project={project} />
          </div>

          {/* Copy and project facts */}
          <div className="relative z-10 order-1 lg:order-2">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {project.type}
                </span>
                <span className="border border-line px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {project.label}
                </span>
              </div>

              <StatNumber size="sm" className="mb-2 text-dim" decorative>
                {project.number}
              </StatNumber>

              <h3 className="font-display text-3xl uppercase tracking-tighter text-foreground md:text-4xl lg:text-5xl">
                {project.title}
              </h3>

              <p className="mt-4 text-base leading-[1.55] text-body md:text-lg">
                {project.copy}
              </p>

              {project.outcome && (
                <div className="mt-6 border-l-2 border-accent pl-4">
                  <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-dim">
                    Outcome
                  </span>
                  <p className="text-sm font-medium leading-normal text-body md:text-base">
                    {project.outcome}
                  </p>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-300 hover:text-accent"
                aria-label={`View ${project.title} on GitHub`}
              >
                View on GitHub
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);
  return prefersReduced;
}

export function WorkStack() {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [prefersReduced]);

  return (
    <Section id="projects" className="border-b border-line py-20 md:py-36">
      <Container>
        <SectionHeader
          label={home.work.label}
          title={<Highlight text={home.work.title} accent={home.work.titleAccent} />}
          description={home.work.description}
        />

        <div className="relative mt-12 md:mt-16">
          {PROJECTS.map((project, index) => (
            <WorkPanel
              key={project.number}
              project={project}
              index={index}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}