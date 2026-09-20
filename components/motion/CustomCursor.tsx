"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor (design brief §5.3): an immediate acid-yellow dot plus a ring
 * that lags behind (the brief's lerp 0.15 feel, approximated with a slower
 * GSAP `quickTo` on the ring than the dot). One delegated `mouseover` drives
 * every state, so markup anywhere on the site opts in without wiring:
 *
 *   · over links / buttons → the ring grows;
 *   · over `[data-cursor="view"]` (the work cards) → the ring grows further
 *     and shows the "View" label;
 *   · over text-entry fields → the custom cursor hides and the native caret
 *     cursor returns (§5.3 "hides over form inputs");
 *   · leaving the window hides it until the pointer returns.
 *
 * Fine pointers only (`pointer: fine`) and disabled under reduced motion —
 * on touch devices the element never renders and the native cursor is never
 * hidden (`html.has-custom-cursor` in globals.css is the opt-out switch).
 */

type CursorState = "default" | "link" | "view" | "hidden";

const INTERACTIVE =
  'a, button, [role="button"], summary, [data-cursor], input, select, textarea, label';
const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]';

const RING_VIEW_SCALE = 2.8;
const RING_LINK_SCALE = 1.7;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    /* Ring lag ≈ lerp 0.15; dot is near-instant. */
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let state: CursorState = "default";
    let moved = false;

    /* paint() renders the current state; setCursor() dedupes and defers to
       the first pointer move, so the cursor can never flash at the top-left
       corner before the pointer's real position is known. */
    const paint = () => {
      const next = state;
      if (next === "hidden") {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.15, overwrite: "auto" });
        return;
      }
      const ringScale = next === "view" ? RING_VIEW_SCALE : next === "link" ? RING_LINK_SCALE : 1;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      gsap.to(ring, { scale: ringScale, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      gsap.to(dot, {
        scale: next === "view" ? 0 : next === "link" ? 0.5 : 1,
        duration: 0.25,
        overwrite: "auto",
      });
      /* The label counter-scales so it stays readable inside the grown ring. */
      gsap.to(label, {
        autoAlpha: next === "view" ? 1 : 0,
        scale: next === "view" ? 1.3 / RING_VIEW_SCALE : 1,
        duration: 0.25,
        overwrite: "auto",
      });
    };

    const setCursor = (next: CursorState) => {
      if (next === state) return;
      state = next;
      if (moved) paint();
    };

    const onMove = (e: PointerEvent) => {
      if (!moved) {
        /* First move: jump to the pointer so the cursor never sweeps in
           from the top-left corner. */
        moved = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        paint();
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(TEXT_ENTRY)) {
        setCursor("hidden");
        return;
      }
      if (target.closest('[data-cursor="view"]')) {
        setCursor("view");
        return;
      }
      if (target.closest(INTERACTIVE)) {
        setCursor("link");
        return;
      }
      setCursor("default");
    };

    const onLeave = () => setCursor("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, true);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-custom-cursor");
      gsap.killTweensOf([dot, ring, label]);
    };
  }, []);

  /* `hidden` at base so the element never exists on coarse-pointer devices
     even before the effect runs; the arbitrary media variant mirrors the
     JS guard for fine pointers. Children start at opacity 0 and are shown
     on the first pointer move (no corner flash). */
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent opacity-0"
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent opacity-0"
        >
          View
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent opacity-0"
      />
    </div>
  );
}
