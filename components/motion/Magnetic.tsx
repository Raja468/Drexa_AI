"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  /** Max travel in px toward the cursor (brief §5.6: up to 8px). */
  strength?: number;
  className?: string;
};

/**
 * Magnetic wrapper (design brief §5.6): the wrapped element drifts up to
 * `strength` px toward the pointer while it is over the element, then returns
 * with a spring (`elastic.out`). GSAP `quickTo` keeps the follow smooth
 * without re-renders.
 *
 * Active only for fine pointers; under `prefers-reduced-motion` the wrapper
 * stays inert (the children render exactly as before). The inner element
 * keeps its own hover transform (e.g. Button's scale) — this component only
 * ever writes x/y on the wrapper span, so the two never fight.
 */
export function Magnetic({ children, strength = 8, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      /* 0.4 factor + clamp keeps the travel inside the brief's 8px budget
         even at the far edge of a wide CTA. */
      xTo(gsap.utils.clamp(-strength, strength, dx * 0.4));
      yTo(gsap.utils.clamp(-strength, strength, dy * 0.4));
    };

    /* Spring return (§5.6 "return with spring"). */
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}
