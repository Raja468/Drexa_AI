"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  /** Extra classes for the positioning wrapper (e.g. `relative`). */
  className?: string;
  /** Total drift in px: `distance` down as the block enters, `-distance` as it leaves. */
  distance?: number;
};

/**
 * Scroll parallax (design brief §5 scroll scenes, light edition): the
 * wrapper's content drifts `distance` px down→up while the block travels
 * through the viewport, driven by framer-motion's `useScroll`. Per-element
 * motion stays with framer-motion — Lenis/GSAP keep owning the scroll
 * itself (DECISIONS D15), so this component never touches scrolling.
 *
 * The transform is only attached after hydration, so server HTML renders
 * the content in place with no layout shift; under `prefers-reduced-motion`
 * it is never attached at all and the content stays static.
 */
export function Parallax({ children, className, distance = 48 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}