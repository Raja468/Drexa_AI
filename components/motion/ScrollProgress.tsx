"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll progress (design brief §5.8): a thin 2px acid-yellow bar fixed to the
 * very top of the viewport, scaling from 0 to 1 across the whole document via
 * a scrubbed ScrollTrigger. Purely an orientation affordance — it carries no
 * text and never changes state, so it stays silent chrome.
 *
 * Reduced motion: kept. It reports a position, it doesn't animate anything on
 * its own, and it works identically with native scroll.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
