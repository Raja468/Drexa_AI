"use client";

import { useEffect, useRef, useState } from "react";
import { dispatchPreloaderDone, prefersReducedMotion } from "@/lib/preloader";

/**
 * Preloader (design brief §5.5 as amended by the owner — D16): runs on EVERY
 * full page load, capped at ~1.2s, skipped entirely under
 * `prefers-reduced-motion`.
 *
 * The overlay is server-rendered (`fixed`, opaque, z-90 above the nav) so
 * the first paint is already covered — no hero flash, no layout shift.
 *
 * Control hand-off is class-based, which is what keeps strict mode safe:
 * SSR renders `preloader-failsafe`, a pure-CSS animation that holds the
 * overlay for ~2.5s and then fades it out (fill: forwards) if JS never
 * runs. The effect removes that class on hydration and JS owns the rest —
 * lift at 0.85s via a CSS transition, independent 2s wall-clock failsafe,
 * body-lock release, then the `drexa:preloader-done` event starts the §7.2
 * hero sequence, the nav fade and Lenis. If JS arrives after the CSS fade
 * has already completed (cold cache > ~2.5s), the preloader skips instead
 * of popping the overlay back onto the page.
 *
 * Framer-motion is gone from this component on purpose: the lift is a CSS
 * transition and the mark draw-in is a CSS keyframe, so React's double-
 * invoked effects can neither run the animation twice nor restart it — the
 * cleanup only ever clears timers.
 *
 * The §5.5 "logo mark draws in" placeholder stays until the owner supplies
 * `/public/brand/mark.svg` (TODO_OWNER) — swap the two <path> elements.
 */

const HOLD_MS = 850; // draw settles → lift starts
const LIFT_MS = 350; // CSS fade-out
const FAILSAFE_MS = 2000; // independent wall-clock failsafe
const LATE_JS_MS = 2500; // CSS failsafe has (nearly) faded — don't pop it back

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    const unlock = () => document.body.classList.remove("preloader-lock");

    const lift = () => {
      unlock();
      el?.classList.add("preloader-lift");
      dispatchPreloaderDone();
      const t = window.setTimeout(() => setMounted(false), LIFT_MS + 80);
      return () => window.clearTimeout(t);
    };

    if (prefersReducedMotion()) {
      /* Reduced motion: skip entirely — one SSR frame at most. */
      unlock();
      dispatchPreloaderDone();
      const raf = requestAnimationFrame(() => setMounted(false));
      return () => cancelAnimationFrame(raf);
    }

    if (performance.now() > LATE_JS_MS) {
      /* JS arrived after the CSS failsafe already faded the overlay — let
         that animation finish and never bring the overlay back. */
      unlock();
      dispatchPreloaderDone();
      const cancel = window.setTimeout(() => setMounted(false), 500);
      return () => window.clearTimeout(cancel);
    }

    /* Hand control from the CSS failsafe to JS (strict-mode safe: the
       class removal is idempotent and the timers are cleared on cleanup,
       so the double-invoked first mount can never lift twice). */
    el?.classList.remove("preloader-failsafe");
    const timer = window.setTimeout(lift, HOLD_MS);
    const failsafe = window.setTimeout(lift, FAILSAFE_MS);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(failsafe);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div ref={ref} aria-hidden="true" className="preloader-overlay preloader-failsafe">
      <div className="flex flex-col items-center gap-7">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-foreground">
          {/* Frame: quiet hairline square, drawn first. */}
          <path
            d="M2 2 H62 V62 H2 Z"
            pathLength="1"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
            className="preloader-draw"
          />
          {/* D monogram: stem, then bowl, in the accent. */}
          <path
            d="M22 16 V48 M22 16 H33 A16 16 0 0 1 33 48 H22"
            pathLength="1"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeLinecap="square"
            className="preloader-draw preloader-draw-mark"
          />
        </svg>
        <span className="preloader-word font-display text-xl font-bold uppercase tracking-tighter text-foreground">
          DREXA<span className="text-accent">.</span>
        </span>
      </div>
    </div>
  );
}
