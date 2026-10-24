"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CircuitBoard, Globe, Shield, Terminal, type LucideIcon } from "lucide-react";

type ServiceSlide = {
  num: string;
  title: string;
  accent: string;
  copy: string;
  example: string;
  tags: string[];
  href: string;
  cta: string;
  Icon: LucideIcon;
};

const slides: ServiceSlide[] = [
  {
    num: "01",
    title: "AI Development & Automation",
    accent: "automation",
    copy: "Automate repetitive work with AI agents, chatbots, and workflow automation. WhatsApp support bots, lead capture, document processing, and internal tools.",
    example: "Example: a support bot that answers customers and captures leads at any hour.",
    tags: ["Python", "Anthropic", "Node.js"],
    href: "/services/ai-automation",
    cta: "Explore AI automation",
    Icon: CircuitBoard,
  },
  {
    num: "02",
    title: "Web Development",
    accent: "websites",
    copy: "Fast, clear, search-friendly websites and web apps. Business sites, landing pages, WordPress, and custom Next.js builds.",
    example: "Example: a business site that loads fast, ranks, and turns visits into enquiries.",
    tags: ["Next.js", "React", "Tailwind"],
    href: "/services/web-development",
    cta: "Explore web development",
    Icon: Globe,
  },
  {
    num: "03",
    title: "Custom Software",
    accent: "software",
    copy: "Dashboards, management systems, SaaS products, and internal tools built around how your business actually works.",
    example: "Example: a dashboard that replaces scattered spreadsheets and manual reports.",
    tags: ["Node.js", "PostgreSQL", "Express"],
    href: "/services/software-development",
    cta: "Explore custom software",
    Icon: Terminal,
  },
  {
    num: "04",
    title: "Cybersecurity",
    accent: "security",
    copy: "Web application security checks, security monitoring support, and staff awareness training. Find weak points before attackers do.",
    example: "Example: a security check that finds weak points before attackers do.",
    tags: ["Pentesting", "Audit", "Monitoring"],
    href: "/services/cybersecurity",
    cta: "Explore cybersecurity",
    Icon: Shield,
  },
];

export function HeroServiceCarousel() {
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
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  const slide = slides[index];
  const Icon = slide.Icon;

  return (
    <div
      className="relative overflow-hidden rounded-[12px] border border-border bg-[#F6F6F3]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Drexa services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[120px] font-[800] leading-none text-[#EDEDE6] md:text-[160px]">
        {slide.num}
      </span>
      <div key={slide.num} className="animate-fade-up relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#54585F]">
            What we build / {slide.num} of {slides.length.toString().padStart(2, "0")}
          </p>
          <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[40px]">
            {slide.title}
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-[#54585F]">{slide.copy}</p>
          <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-foreground">{slide.example}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {slide.tags.map((tag) => (
              <span key={tag} className="border border-border bg-white px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-[#54585F]">
                {tag}
              </span>
            ))}
          </div>
          <Link href={slide.href} className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-hover">
            {slide.cta} <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
          </Link>
        </div>
        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="grid h-[220px] place-items-center rounded-[12px] border border-border bg-white">
            <Icon className="h-16 w-16 text-accent" strokeWidth={1.25} />
          </div>
          <p className="mt-4 text-center font-mono text-[12px] uppercase tracking-[0.06em] text-[#54585F]">
            {slide.accent}
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-between gap-4 border-t border-border bg-white px-6 py-4 md:px-10">
        <div className="flex items-center gap-2">
          {slides.map((item, i) => (
            <button
              key={item.num}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-[#54585F]"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous service" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-foreground transition hover:border-accent hover:text-accent">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Next service" className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-foreground transition hover:border-accent hover:text-accent">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
