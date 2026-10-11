"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { waitPreloader } from "@/lib/preloader";

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
  const pathname = usePathname();
  /* The Lenis instance survives across route changes (this component lives in
     the root layout), so the route-change effect below can re-sync it. */
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let teardown: (() => void) | null = null;

    /* D16: body scroll is locked while the preloader overlay is up, so the
       smooth-scroll clock only starts when the overlay lifts — Lenis is
       created in the `waitPreloader` callback, never before. */
    const startLenis = () => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;

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

      /* Strict-mode safe (owner condition): teardown destroys the Lenis
         instance, detaches the ticker callback and the delegated listener,
         so the mount → cleanup → mount cycle can never leave two Lenis
         instances or two ticker callbacks behind. */
      return () => {
        lenisRef.current = null;
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    void waitPreloader().then(() => {
      if (!alive) return;
      teardown = startLenis();
    });

    return () => {
      alive = false;
      teardown?.();
    };
  }, []);

  /* Route changes (owner condition 5): Next resets window scroll between
     pages, but Lenis caches its own animated value — re-sync it immediately
     or the next wheel event animates from a stale position and the page
     jumps. Every route lands at the top. Then remeasure the fresh page. */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  /* Late layout (owner condition 5): web-font swaps and images decoding
     change section heights — refresh ScrollTrigger once fonts settle and on
     the window load event, so scrubbed effects never act on stale geometry.
     (`position: sticky` needs nothing: Lenis scrolls the real window, so the
     Why Drexa pinning keeps working.) */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return null;
}
