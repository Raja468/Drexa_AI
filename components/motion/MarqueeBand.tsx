import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/motion/Marquee";

/**
 * Full-bleed marquee band: a whole section of continuously moving type.
 * Two of these belong on any Kinetic page — a fast stats band and a slower
 * reading band.
 */
type Tone = "accent" | "muted";

type MarqueeBandProps = {
  /** Repeated forever — keep items short and punchy. */
  items: readonly ReactNode[];
  /** px/second. 60–100 for high energy, 30–50 for readable content. */
  speed?: number;
  /** §7.3 ticker: exact loop time in seconds (e.g. 40). Forwarded to Marquee. */
  loopSeconds?: number;
  /** §7.3 ticker: pause the loop while hovered. Forwarded to Marquee. */
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  /** `accent` = the acid-yellow band, `muted` = a secondary surface band. */
  tone?: Tone;
  /** Decorative glyph drawn between items — aria-hidden by definition. */
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
};

const TONES: Record<Tone, string> = {
  accent: "border-accent bg-accent text-accent-foreground",
  muted: "border-border bg-muted text-foreground",
};

function sequenceOf(items: readonly ReactNode[], separator: ReactNode, itemClassName?: string) {
  const sequence: ReactNode[] = [];
  items.forEach((item, index) => {
    sequence.push(
      <span
        key={`item-${index}`}
        className={cn(
          "whitespace-nowrap px-5 font-display text-3xl font-bold uppercase tracking-tighter md:px-8 md:text-5xl",
          itemClassName,
        )}
      >
        {item}
      </span>,
    );
    sequence.push(
      <span key={`separator-${index}`} aria-hidden="true" className="text-lg opacity-60 md:text-2xl">
        {separator}
      </span>,
    );
  });
  return sequence;
}

export function MarqueeBand({
  items,
  speed = 80,
  direction = "left",
  tone = "accent",
  separator = "◆",
  className,
  itemClassName,
  loopSeconds,
  pauseOnHover = false,
}: MarqueeBandProps) {
  return (
    /* `relative z-20` + the fully opaque tone background: even if a scroll
       animation on an adjacent section mistimes its fade, the band always
       paints solid on top of it — no ghosting through the ticker. */
    <section className={cn("relative z-20 w-full border-y-2", TONES[tone], className)}>
      <Marquee
        speed={speed}
        loopSeconds={loopSeconds}
        pauseOnHover={pauseOnHover}
        direction={direction}
        itemClassName="py-4 md:py-6"
      >
        {sequenceOf(items, separator, itemClassName)}
      </Marquee>
    </section>
  );
}