"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { waitPreloader } from "@/lib/preloader";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/* Loop rig: the source clip ends on a frame that differs sharply from its
   first frame, so a single `loop` video jump-cuts every pass. Two stacked
   players share one decoded source and crossfade over the last stretch of
   media, turning the seam into a dissolve. Playback runs at 0.85x for an
   ambient pace. The fade window is measured in media-time; the CSS
   transition is its real-time equivalent at the slowed rate. */
const VIDEO_SRC = "/hero-sectio-vid-opt.mp4";
const VIDEO_RATE = 0.85;
const FADE_MEDIA_SECONDS = 1.6;
const FADE_TRANSITION = `opacity ${(FADE_MEDIA_SECONDS / VIDEO_RATE).toFixed(2)}s linear`;

/**
 * Kinetic hero.
 *
 * Layering, bottom to top:
 *   0   the studio reel plus the two scrims that keep type legible over it
 *   10  the type column
 *
 * The §7.2 robot plate was removed in Phase 1 (brief: "remove the old
 * floating robot photo"); the footage itself is the right-column visual until
 * the Phase 3 3D canvas (with its poster fallback) replaces it.
 *
 * The section is a `min-h` flex column and never a fixed height. That is
 * load-bearing: the headline wraps to three lines on wide screens, so a fixed
 * height clips the CTA row — and since the marquee band below is `z-20`, it
 * would then paint *over* the buttons instead of sitting under them. Height
 * follows §7.2: `calc(100svh - 64px)`, keeping the CTAs above the fold.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const fading = useRef(false);

  /* §7.2 load sequence — "the one orchestrated moment". The whole type column
     is gated on the preloader lift (`waitPreloader` resolves immediately on
     repeat visits and under reduced motion). Timings per the brief: t=0 the
     nav fades in (Navbar), t=0.1s the headline lines reveal one by one
     through an overflow-hidden line box (80ms stagger, 900ms each), t=0.5s
     subhead + CTAs fade in, t=0.6s the proof line. The brief's t=0.6s canvas
     beat belongs to the Phase 3 3D scene and is intentionally absent here. */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    void waitPreloader().then(() => {
      if (live) setReady(true);
    });
    /* Independent failsafe (owner condition): the sequence runs after 2s max
       even if the preloader promise never resolves — it does not depend on
       the promise, only on the wall clock. */
    const failsafe = window.setTimeout(() => {
      if (live) setReady(true);
    }, 2000);
    return () => {
      live = false;
      window.clearTimeout(failsafe);
    };
  }, []);

  /* Mask reveal for one headline line: translateY 110% → 0 inside an
     overflow-hidden line box. Reduced motion: no travel, instant. */
  const mask = (delay: number) => ({
    initial: { y: reduce ? "0%" : "110%" },
    animate: { y: ready || reduce ? "0%" : "110%" },
    transition: { duration: reduce ? 0.01 : 0.9, delay: reduce ? 0 : delay, ease: EASE_OUT_EXPO },
  });

  /* Simple fade for the supporting blocks (§7.2 beats 1 / 3 / 5). A helper
     rather than variants, so each block can take its own place in the
     sequence without a parent `variants` contract to keep in sync. */
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: ready ? 1 : 0 },
    transition: { duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : delay, ease: EASE_OUT_EXPO },
  });

  /* Browsers only autoplay muted video, so `muted` is unconditional.
     Reduced-motion users get the poster frame: both players pause on mount
     and the first frame stays on screen as a still. */
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;
    if (reduce) {
      a.pause();
      b.pause();
      return;
    }
    a.playbackRate = b.playbackRate = VIDEO_RATE;
    void a.play().catch(() => {});
  }, [reduce]);

  /* When the visible player nears the end of its media, start the hidden one
     from zero and dissolve between them; `onEnded` then parks the finished
     player at frame 0, ready to be the hidden one for the next pass. */
  const handleTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const front = e.currentTarget;
    const back = front === videoARef.current ? videoBRef.current : videoARef.current;
    if (!back || fading.current) return;
    if (!Number.isFinite(front.duration)) return;
    if (front.duration - front.currentTime > FADE_MEDIA_SECONDS) return;
    fading.current = true;
    back.currentTime = 0;
    void back.play().catch(() => {});
    front.style.opacity = "0";
    back.style.opacity = "1";
  };

  const handleEnded = (e: SyntheticEvent<HTMLVideoElement>) => {
    const done = e.currentTarget;
    fading.current = false;
    done.pause();
    done.currentTime = 0;
  };

  return (
    <section
      id="hero"
      className={cn(
        "relative isolate flex w-full flex-col justify-center overflow-hidden",
        "min-h-[calc(100svh-64px)] border-b border-border bg-background",
        "pt-[112px] pb-16 md:pt-[128px] md:pb-20 lg:pt-[140px] lg:pb-24",
      )}
    >
      {/* Ground layer: the studio reel, muted and crossfade-looped. Decorative
          by definition — nothing in it is content, so it is out of the
          accessibility tree and cannot take focus. Both players reference the
          same URL, so the browser fetches and buffers it once; the poster on
          the front player is what paints before the first frames decode. */}
      <video
        ref={videoARef}
        src={VIDEO_SRC}
        poster="/hero-poster.webp"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ transition: FADE_TRANSITION }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <video
        ref={videoBRef}
        src={VIDEO_SRC}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ opacity: 0, transition: FADE_TRANSITION }}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Legibility scrims: dark under the type column, opening up to the right
          so the footage still reads, then a bottom fade that dissolves the hero
          into the marquee band rather than ending on a hard video edge. */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-0" />
      <div
        aria-hidden="true"
        className="hero-scrim-bottom absolute inset-x-0 bottom-0 z-0 h-40"
      />

      {/* Atmospheric glow highlights — flat depth over the footage (blur only,
          never shadow), anchored so the cyan bloom sits behind the figure. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[15%] top-1/2 z-0 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px] md:h-[700px] md:w-[700px] md:bg-cyan-500/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-[25%] z-0 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[-5%] z-0 h-[320px] w-[320px] rounded-full bg-teal-500/6 blur-[130px]"
      />

      {/* Type column — the poster. */}
      <Container className="relative z-10">
        <div className="max-w-[720px]">
          {/* Eyebrow (§7.2 beat 1, alongside the nav fade). */}
          <motion.div
            {...fade(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.05] px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="beacon-pulse h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {home.hero.eyebrow.toUpperCase()}
            </span>
          </motion.div>

          {/* Headline — §7.2: lines reveal one by one through an
              overflow-hidden line box, 80ms stagger, 900ms each. Uppercase
              and oversized by definition; the accent phrase takes the
              gradient fill so the acid yellow reads as light. */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground">
            {/* The padding/-margin pair widens the clip box for the glyphs
                without moving the layout — oversized display type sits close
                to its line box at leading 0.95. */}
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
              <motion.span {...mask(0.1)} className="block">
                BUILD WHAT
              </motion.span>
            </span>
            <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
              <motion.span {...mask(0.18)} className="text-gradient-accent block">
                THINKS FORWARD.
              </motion.span>
            </span>
          </h1>

          {/* Subhead (§7.2 beat 3, t=0.5s). */}
          <motion.p
            {...fade(0.5)}
            className="mt-6 max-w-[50ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.6] text-foreground/75"
          >
            {home.hero.subhead}
          </motion.p>

          {/* Actions (§7.2 beat 3, t=0.5s). */}
          <motion.div
            {...fade(0.5)}
            className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {/* §5.6: the primary CTA is magnetic (fine pointers only). */}
            <Magnetic>
              <ButtonLink href={home.hero.cta.href} size="lg">
                {home.hero.cta.label}
              </ButtonLink>
            </Magnetic>

            <a
              href={home.hero.secondary.href}
              className="group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              {home.hero.secondary.label}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Proof strip (§7.2 beat 5, t=0.6s). Hairline-topped, monospace,
              deliberately quiet — it corroborates the claim without competing
              with the CTA. */}
          <motion.div
            {...fade(0.6)}
            className="mt-12 border-t border-border/60 pt-5"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              {home.hero.proof.label}
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              {home.hero.proof.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
