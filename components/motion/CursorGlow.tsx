"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CursorGlowProps = {
  className?: string;
  size?: number;
  blur?: number;
  color?: string;
};

/**
 * Subtle cursor-following glow. Tracks pointer position within its parent
 * and renders a soft, blurred radial that follows with eased motion.
 * Disabled when prefers-reduced-motion is set.
 */
export function CursorGlow({
  className,
  size = 520,
  blur = 90,
  color = "rgba(25, 216, 210, 0.18)",
}: CursorGlowProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef<number>(0);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current?.parentElement;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      target.current.x = event.clientX - rect.left - size / 2;
      target.current.y = event.clientY - rect.top - size / 2;
      if (!active) setActive(true);
    };
    const onLeave = () => setActive(false);

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame.current = window.requestAnimationFrame(tick);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    frame.current = window.requestAnimationFrame(tick);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frame.current);
    };
  }, [active, reduce, size]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "9999px",
        background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
        filter: `blur(${blur}px)`,
        opacity: active ? 1 : 0,
        pointerEvents: "none",
        left: 0,
        top: 0,
        transition: "opacity 400ms ease",
        willChange: "transform",
      }}
    />
  );
}
