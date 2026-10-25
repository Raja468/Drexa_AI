"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CircuitBoard, Globe, Shield, Terminal, type LucideIcon } from "lucide-react";

export type ServiceCarouselItem = {
  num: string;
  title: string;
  href: string;
  copy: string;
  tags: string[];
};

const ICONS: LucideIcon[] = [CircuitBoard, Globe, Terminal, Shield];

const EXAMPLES = [
  "A bot that answers customers and captures leads at any hour.",
  "A fast business site that turns visits into enquiries.",
  "A dashboard that replaces scattered spreadsheets.",
  "A check that finds weak points before attackers do.",
];

const AUTO_MS = 2000;

export function ServicesCarousel({ services }: { services: ServiceCarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || services.length === 0) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % services.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, services.length]);

  if (services.length === 0) return null;

  const goTo = (next: number) => {
    setIndex((next + services.length) % services.length);
  };

  const active = services[index];
  const next = services[(index + 1) % services.length];
  const ActiveIcon = ICONS[index % ICONS.length];
  const NextIcon = ICONS[(index + 1) % ICONS.length];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Drexa services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style jsx global>{`
        @keyframes services-progress { from { width: 0%; } to { width: 100%; } }
        .services-progress { animation: services-progress 2s linear forwards; }
        @keyframes services-glow { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .services-glow { animation: services-glow 2s ease-in-out infinite; }
      `}</style>

      <div className="grid gap-6 p-6 md:p-10 lg:grid-cols-[1.6fr_0.9fr] lg:p-12">
        <div key={active.num} className="animate-fade-up relative overflow-hidden rounded-[16px] border border-[#2A2D33] bg-[#1B1E22] p-8 md:p-12">
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-8 right-4 select-none font-display text-[140px] font-[800] leading-none text-[#23262B] md:text-[180px]">
            {active.num}
          </span>
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent-dark">
                Service {active.num} / {services.length.toString().padStart(2, "0")}
              </span>
              <span className="services-glow grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#2A2D33] bg-[#16181D] text-accent-dark">
                <ActiveIcon size={24} strokeWidth={1.5} />
              </span>
            </div>
            <h3 className="mt-8 font-display text-[32px] font-bold leading-[1.05] tracking-tight text-[#F2F2EE] md:text-[52px]">
              {active.title}
            </h3>
            <p className="mt-4 max-w-[56ch] whitespace-pre-line text-[18px] leading-[1.6] text-[#A9ACB2]">{active.copy}</p>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.6] text-[#F2F2EE]">{EXAMPLES[index % EXAMPLES.length]}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {active.tags.map((tag) => (
                <span key={tag} className="font-mono text-[12px] uppercase tracking-[0.06em] text-accent-dark">[{tag}]</span>
              ))}
            </div>
            <Link href={active.href} className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
              Explore {active.title} <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>

        <button type="button" onClick={() => goTo(index + 1)} aria-label={`Next service: ${next.title}`} className="group relative overflow-hidden rounded-[16px] border border-[#2A2D33] bg-[#16181D] p-8 text-left transition hover:border-accent-dark md:p-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#8A8D93]">Up next</span>
          <span className="mt-6 grid h-12 w-12 place-items-center rounded-full bg-[#1B1E22] text-accent-dark">
            <NextIcon size={24} strokeWidth={1.5} />
          </span>
          <span className="mt-6 block font-display text-[24px] font-bold leading-tight text-[#F2F2EE]">{next.title}</span>
          <span className="mt-3 block font-mono text-[12px] uppercase tracking-[0.06em] text-accent-dark group-hover:underline">Tap to jump ahead</span>
        </button>
      </div>

      <div className="border-t border-[#2A2D33] px-6 py-5 md:px-10 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {services.map((service, i) => (
              <button key={service.num} type="button" onClick={() => goTo(i)} aria-label={`Go to ${service.title}`} aria-current={i === index ? "true" : undefined} className={`rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] transition ${i === index ? "border-accent-dark bg-accent-dark text-[#16181D]" : "border-[#2A2D33] text-[#A9ACB2] hover:border-accent-dark hover:text-[#F2F2EE]"}`}>
                {service.num} {service.title.split(" &")[0]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous service" className="grid h-10 w-10 place-items-center rounded-lg border border-[#2A2D33] text-[#F2F2EE] transition hover:border-accent-dark hover:text-accent-dark">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label="Next service" className="grid h-10 w-10 place-items-center rounded-lg border border-[#2A2D33] text-[#F2F2EE] transition hover:border-accent-dark hover:text-accent-dark">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#2A2D33]" aria-hidden="true">
          {!reducedMotion && (
            <div key={index} className="services-progress h-full bg-accent-dark" style={{ animationPlayState: paused ? "paused" : "running" }} />
          )}
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[#8A8D93]">
          Auto-advances every 2 seconds. Hover or focus to pause.
        </p>
      </div>
    </div>
  );
}
