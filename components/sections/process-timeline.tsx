"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { StatNumber } from "@/components/ui/StatNumber";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const YOU_GET_CHIPS: Record<string, string> = {
  Discover: "A scoped brief",
  Design: "A clickable prototype",
  Build: "Weekly demo builds",
  Launch: "Production hand-off & support",
};

function ProcessStep({
  step,
  index,
}: {
  step: (typeof home.approach.steps)[number];
  index: number;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(index === 0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = stepRef.current;
    if (!el || prefersReduced) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 65%",
      end: "bottom 35%",
      onToggle: (self) => setIsActive(self.isActive),
    });

    return () => st.kill();
  }, [prefersReduced]);

  const chip = YOU_GET_CHIPS[step.title];

  return (
    <div
      ref={stepRef}
      className="relative pb-16 last:pb-0"
    >
      <div className="relative pl-12 md:pl-[140px] lg:pl-[180px]">
        {/* Inactive steps used to be painted at 40% opacity on top of an already
            grey tone, which put the copy near 2:1. The ramp is now carried by
            the text tokens (body -> dim) and no block is translucent. */}
        <div className="transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="flex items-start gap-4 md:gap-8 lg:gap-10">
            <StatNumber
              size="sm"
              className={cn(
                "shrink-0 tabular-nums transition-colors duration-500",
                isActive || prefersReduced ? "text-foreground" : "text-dim"
              )}
              decorative
            >
              {step.number}
            </StatNumber>

            <div className="pt-1 md:pt-0 flex-1 min-w-0">
              <h3 className={cn(
                "font-display uppercase tracking-tighter transition-colors duration-500",
                isActive || prefersReduced ? "text-foreground" : "text-dim",
                "text-2xl md:text-3xl lg:text-4xl"
              )}>
                {step.title}
              </h3>

              <p className={cn(
                "mt-3 max-w-[640px] leading-[1.55] transition-colors duration-500",
                isActive || prefersReduced ? "text-body" : "text-dim",
                "text-base md:text-lg"
              )}>
                {step.copy}
              </p>

              {chip && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface-1 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="text-dim" aria-hidden="true">→</span>
                  You get: {chip}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
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

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    if (prefersReduced) {
      line.style.strokeDasharray = "none";
      line.style.strokeDashoffset = "0";
      return;
    }

    const lineLength = line.getTotalLength();
    line.style.strokeDasharray = `${lineLength}`;
    line.style.strokeDashoffset = `${lineLength}`;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 65%",
      end: "bottom 45%",
      scrub: 0.5,
      onUpdate: (self) => {
        line.style.strokeDashoffset = `${lineLength * (1 - self.progress)}`;
      },
    });

    return () => st.kill();
  }, [prefersReduced]);

  return (
    <Section id="approach" className="border-b border-line py-16 md:py-28">
      <Container>
        <SectionHeader
          label={home.approach.label}
          title={<Highlight text={home.approach.title} accent={home.approach.titleAccent} />}
          description={home.approach.description}
        />

        <div ref={containerRef} className="relative pt-12 md:pt-16">
          {/* Background track line */}
          <div className="absolute left-4 md:left-[100px] lg:left-[130px] top-12 bottom-8 w-px bg-border" aria-hidden="true">
            {/* Animated drawing foreground line */}
            <svg className="h-full w-px" viewBox="0 0 1 100" preserveAspectRatio="none">
              <line
                ref={lineRef}
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100%"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ strokeDasharray: "0", strokeDashoffset: "0" }}
              />
            </svg>

            {/* Terminal accent dot */}
            <div className="absolute -bottom-2 -left-[5px] h-3 w-3 rounded-full bg-accent border-2 border-background" />
          </div>

          <div className="relative">
            {home.approach.steps.map((step, index) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}