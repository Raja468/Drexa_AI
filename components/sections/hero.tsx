"use client";

import { useEffect, useRef, type SyntheticEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Entrance animation shared by every block in the type column. A helper rather
 * than variants, so each block can take its own place in the stagger without a
 * parent `variants` contract to keep in sync.
 */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO },
});

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
          {/* Eyebrow */}
          <motion.div
            {...enter(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.05] px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="beacon-pulse h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {home.hero.eyebrow.toUpperCase()}
            </span>
          </motion.div>

          {/* Headline. Uppercase and oversized by definition; the accent phrase
              takes the gradient fill so the acid yellow reads as light. */}
          <motion.h1
            {...enter(0.08)}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground"
          >
            <span className="block">BUILD WHAT</span>
            <span className="text-gradient-accent block">THINKS FORWARD.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            {...enter(0.16)}
            className="mt-6 max-w-[50ch] text-[clamp(1.05rem,1.3vw,1.25rem)] leading-[1.6] text-foreground/75"
          >
            {home.hero.subhead}
          </motion.p>

          {/* Actions */}
          <motion.div
            {...enter(0.24)}
            className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            <ButtonLink href={home.hero.cta.href} size="lg">
              {home.hero.cta.label}
            </ButtonLink>

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

          {/* Proof strip. Hairline-topped, monospace, deliberately quiet —
              it corroborates the claim without competing with the CTA. */}
          <motion.div
            {...enter(0.32)}
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
