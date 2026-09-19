"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "left" | "right";

type MarqueeProps = {
  children: ReactNode;
  /** Scroll speed in pixels per second: 60–100 for stats, 30–50 for reading. */
  speed?: number;
  direction?: Direction;
  className?: string;
  /** Applied to every item wrapper — put the gap between items here. */
  itemClassName?: string;
};

/* First paint / no-JS fallback: two copies at 20s per loop. Measured values
   replace these on mount so the real speed holds at any viewport width. */
const FALLBACK = { copies: 2, shift: "50%", duration: 20 };

/**
 * Infinite, never-pausing marquee — built on one CSS keyframe animation rather
 * than `react-fast-marquee`.
 *
 * Why not the library: v1.6.5 publishes no stylesheet at all (its ESM entry
 * imports a `Marquee.scss` that is absent from the tarball), its CJS entry
 * injects CSS through a runtime <style> tag, and it returns `null` until it has
 * mounted — which would leave every band empty in the SSR HTML and shift the
 * layout on load. This implementation server-renders its content, animates on
 * the compositor only, and adds zero dependencies.
 *
 * The public API still mirrors the library's (`speed` is px/second), so moving
 * back — or to anything else — stays a one-file change.
 *
 * Accessibility: duplicates are aria-hidden and the real content is read once.
 * `prefers-reduced-motion` stops the animation and reveals a scrollable row (in
 * CSS, so it works pre-hydration). Because of that, never place focusable
 * content (links, buttons) inside a Marquee.
 */
export function Marquee({ children, speed = 60, direction = "left", className, itemClassName }: MarqueeProps) {
  const copyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState(FALLBACK);
  const items = Children.toArray(children);

  useEffect(() => {
    const copy = copyRef.current;
    const viewport = viewportRef.current;
    if (!copy || !viewport) return;

    const measure = () => {
      const copyWidth = copy.getBoundingClientRect().width;
      const viewportWidth = viewport.getBoundingClientRect().width;
      if (copyWidth <= 0 || viewportWidth <= 0) return;
      setMetrics({
        /* Always overflow the viewport by at least one whole copy, otherwise a
           gap opens up on every wrap with narrow content. */
        copies: Math.max(2, Math.ceil((viewportWidth + copyWidth) / copyWidth)),
        shift: `${copyWidth}px`,
        duration: Math.max(6, copyWidth / speed),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(copy);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [speed]);

  const renderCopy = (index: number) => (
    <div
      key={index}
      ref={index === 0 ? copyRef : undefined}
      className="marquee-copy"
      data-marquee-duplicate={index === 0 ? undefined : ""}
      aria-hidden={index === 0 ? undefined : true}
    >
      {items.map((item, itemIndex) => (
        <div key={itemIndex} className={cn("flex shrink-0 items-center", itemClassName)}>
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={viewportRef} className={cn("marquee-viewport w-full", className)}>
      <div
        className="marquee-track"
        style={
          {
            "--marquee-shift": metrics.shift,
            "--marquee-duration": `${metrics.duration}s`,
            "--marquee-direction": direction === "right" ? "reverse" : "normal",
          } as CSSProperties
        }
      >
        {Array.from({ length: metrics.copies }, (_, index) => renderCopy(index))}
      </div>
    </div>
  );
}