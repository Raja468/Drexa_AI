"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Smooth scroll (design brief §5.1): Lenis with `lerp: 0.1`, driven by the
 * GSAP ticker and synced with ScrollTrigger (`lenis.on("scroll",
 * ScrollTrigger.update)`), so every ScrollTrigger effect — progress bar,
 * count-ups, later 2b scroll scenes — shares one clock with the smoothing.
 *
 * Disabled entirely under `prefers-reduced-motion` (native scroll) and for
 * touch devices Lenis's own default (it only smooths wheel input; touch stays
 * native, which is what prevents jank). Anchor links are routed through
 * `lenis.scrollTo` so in-page jumps (footer "Back to top") animate with the
 * same easing instead of snapping.
 *
 * One system per element (see DECISIONS D15): this component owns scrolling
 * itself. It does not animate any element; framer-motion keeps owning the
 * per-element reveals it already has.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1 });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /* Route in-page anchors through Lenis so they ease like the scroll. */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
