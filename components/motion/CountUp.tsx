"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CountUpProps = {
  /**
   * Final value exactly as it should read when settled — the numeric prefix
   * counts up, everything else is preserved verbatim. e.g. "3", "30+",
   * "100%", "24h". The server-rendered output IS the final value, so there
   * is no layout shift and no-JS visitors see the number.
   */
  value: string;
  className?: string;
  /** Seconds the count runs. */
  duration?: number;
  /** Optional title tooltip (the proof counters carry their source). */
  title?: string;
};

/**
 * `value` → { prefix, target number, suffix }. "30+" → 30 + "+"; "24h" →
 * 24 + "h"; "1,000" → 1000, re-grouped on output. Returns null for values
 * without a leading number so the caller can fall back to static text.
 */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const decimals = (match[2].split(".")[1] ?? "").length;
  return {
    prefix: match[1],
    target: parseFloat(match[2].replace(/,/g, "")),
    suffix: match[3],
    decimals,
    grouped: match[2].includes(","),
  };
}

/**
 * Count-up (design brief §7.5.1): animates once when the element is ~40%
 * visible (`start: "top 60%"` — 40% of the viewport below it), scrubbed by
 * nothing — it runs on the GSAP clock that Lenis keeps ScrollTrigger in sync
 * with (SmoothScroll). One system per element (DECISIONS D15): the numeral is
 * otherwise static, so GSAP owns it outright.
 *
 * Reduced motion: the tween never starts, so the server-rendered final value
 * stays on screen untouched (§11: no count-up animation).
 *
 * One system per element, precisely (D15 / owner condition): this component
 * mutates *textContent only* — never transform or opacity — so it can never
 * fight a FadeUp wrapper animating the same element.
 */
export function CountUp({ value, className, duration = 1.2, title }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parsed = parse(value);
    /* Unparseable values render static — never fake a count. */
    if (!parsed || Number.isNaN(parsed.target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const format = (n: number) => {
      const fixed = n.toFixed(parsed.decimals);
      const body = parsed.grouped
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: parsed.decimals,
            maximumFractionDigits: parsed.decimals,
          })
        : fixed;
      return parsed.prefix + body + parsed.suffix;
    };

    el.textContent = format(0);
    const counter = { current: 0 };
    const tween = gsap.to(counter, {
      current: parsed.target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.current);
      },
      scrollTrigger: { trigger: el, start: "top 60%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} title={title} className={className}>
      {value}
    </span>
  );
}
