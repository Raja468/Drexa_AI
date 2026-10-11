"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Brain,
  CircuitBoard,
  Globe,
  Shield,
  Sparkles,
  Terminal,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "ai-automation": CircuitBoard,
  "ai-agents": Bot,
  "llm-integration": Brain,
  "custom-software": Terminal,
  "web-experiences": Globe,
  "ai-development": Sparkles,
  cybersecurity: Shield,
  creative: Wand2,
};

/* Bento rhythm. Every card used to be the same full-width slab — eight rows of
   identical height, padding and treatment, which is what made eight services
   read as monotony however good any single card was. Spans now run
   3 / 2+1 / 1+2 / 1+1+1 down the grid: one wide feature card, two offset pairs,
   then a compact three-up strip.
   The grid also drops `gap-6`. Cells share a single hairline (border-l/t on the
   grid, border-r/b on each cell) instead of drawing a box around every card and
   a gap between them — the divider signature with one border, not two. */
type Span = 1 | 2 | 3;

const BENTO_SPANS: Record<string, Span> = {
  "ai-automation": 3,
  "ai-agents": 2,
  "llm-integration": 1,
  "custom-software": 1,
  "web-experiences": 2,
  "ai-development": 1,
  cybersecurity: 1,
  creative: 1,
};

const SPAN_CLASS: Record<Span, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

const PAD_CLASS: Record<Span, string> = {
  1: "p-6 md:p-8",
  2: "p-8 md:p-10",
  3: "p-8 md:p-12",
};

const TITLE_CLASS: Record<Span, string> = {
  1: "text-2xl",
  2: "text-2xl md:text-3xl",
  3: "text-3xl md:text-4xl lg:text-5xl",
};

/** The two cards wide enough to hold a wide-format line figure. */
const FIGURE_SLUGS = ["ai-automation", "ai-agents"];

type ServiceItem = (typeof home.capabilities.items)[number];

/**
 * One bento cell.
 *
 * Hover is a single move: the surface lifts to `surface-2`. The previous card
 * stacked a pointer-tracked accent spotlight, an accent border swap, an icon
 * scale *and* an icon rotation on the same element — four effects competing to
 * say "this is interactive", plus the soft accent glow the brief rules out.
 * The wide card is also composed differently (copy left, figure right) rather
 * than being the same stack with more pixels.
 */
function ServiceCard({ item, span }: { item: ServiceItem; span: Span }) {
  const Icon = ICONS[item.slug] ?? Sparkles;
  const prefersReduced = usePrefersReducedMotion();
  const wide = span === 3;
  const hasFigure = FIGURE_SLUGS.includes(item.slug);

  return (
    <article
      role="listitem"
      className={cn(
        "group relative border-r border-b border-border transition-colors duration-300",
        SPAN_CLASS[span],
        wide ? "bg-surface-1 hover:bg-surface-2" : "bg-background hover:bg-surface-1",
        "focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 focus-within:ring-offset-background"
      )}
    >
      <a
        href={`/services/${item.slug}`}
        className={cn(
          "flex h-full flex-col",
          PAD_CLASS[span],
          wide && "lg:flex-row lg:items-center lg:gap-12"
        )}
        aria-label={`View ${item.title} service`}
      >
        <div className={cn("flex min-w-0 flex-1 flex-col", wide && "lg:max-w-[56ch]")}>
          <div className="flex items-start justify-between gap-4">
            <Icon
              aria-hidden="true"
              className="h-7 w-7 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
              strokeWidth={1.5}
            />
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-dim">
              {item.slug.replace(/-/g, " ").toUpperCase()}
            </span>
          </div>

          <div className="mt-8 flex-1">
            <h3
              className={cn(
                "font-display uppercase tracking-tighter text-foreground",
                TITLE_CLASS[span]
              )}
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-[56ch] text-base leading-[1.5] text-body md:text-lg">
              {item.copy}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Technologies">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-line px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:border-border group-hover:text-foreground"
                role="listitem"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-auto flex items-center gap-2 pt-6 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
            View details
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>

        {hasFigure && (
          <div aria-hidden="true" className={cn("mt-8 shrink-0", wide && "lg:mt-0 lg:w-[38%]")}>
            <ServiceAnimation slug={item.slug} prefersReduced={prefersReduced} />
          </div>
        )}
      </a>
    </article>
  );
}

function ServiceAnimation({ slug, prefersReduced }: { slug: string; prefersReduced: boolean }) {
  if (slug === "ai-automation") {
    return (
      <svg viewBox="0 0 200 60" className="w-full h-24 text-dim" aria-hidden="true">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>
        <path
          d="M20 30 L180 30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10 5"
          className={prefersReduced ? "" : "animate-dash"}
        />
        <circle
          cx="20"
          cy="30"
          r="8"
          fill="var(--color-accent)"
          className={cn(
            prefersReduced ? "" : "animate-travel",
            "transform-origin-center"
          )}
        />
        <rect x="20" y="14" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="84" y="14" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="148" y="14" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  if (slug === "ai-agents") {
    return (
      <svg viewBox="0 0 200 80" className="w-full h-28 text-dim" aria-hidden="true">
        <defs>
          <radialGradient id="pulse-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className={prefersReduced ? "" : "animate-pulse-connections"}>
          <line x1="40" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <line x1="100" y1="40" x2="160" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <line x1="100" y1="40" x2="100" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <line x1="100" y1="40" x2="100" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        </g>
        <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="40" r="18" stroke="var(--color-accent)" strokeWidth="2" fill="none" className={prefersReduced ? "" : "animate-pulse-ring"} />
        <circle cx="160" cy="40" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="10" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="70" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  return null;
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

export function ServicesBento() {
  return (
    <Section id="capabilities" className="border-b border-line py-16 md:py-24">
      <Container>
        <SectionHeader
          label={home.capabilities.label}
          title={<Highlight text={home.capabilities.title} accent={home.capabilities.titleAccent} />}
          description={home.capabilities.description}
        />

        <style jsx global>{`
          @keyframes dash {
            to { stroke-dashoffset: -30; }
          }
          .animate-dash { animation: dash 1.5s linear infinite; }
          @keyframes travel {
            0% { cx: 20; }
            50% { cx: 100; }
            100% { cx: 180; }
          }
          .animate-travel { animation: travel 3s ease-in-out infinite; }
          @keyframes pulse-ring {
            0%, 100% { r: 18; stroke-width: 2; opacity: 1; }
            50% { r: 28; stroke-width: 1; opacity: 0.4; }
          }
          .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
          @keyframes pulse-connections {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-connections { animation: pulse-connections 2s ease-in-out infinite; }
        `}</style>

        <div
          className="grid border-l border-t border-border lg:grid-cols-3"
          role="list"
          aria-label="Services"
        >
          {home.capabilities.items.map((item) => (
            <ServiceCard key={item.slug} item={item} span={BENTO_SPANS[item.slug] ?? 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}