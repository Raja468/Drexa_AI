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
 * Composition (D20): two columns on desktop, one shared baseline.
 *   left   the poster — eyebrow, headline, subhead, CTAs, proof rail
 *   right  the shipped index — a flat rail sourced from `home.work.items`,
 *          which fills the dead space the type column used to leave beside it
 *
 * Layering, bottom to top:
 *   0   the studio reel plus the two scrims that keep type legible over it
 *   0   one accent-tinted bloom (the three off-palette colour blooms that used
 *       to sit here were removed — see D20)
 *   10  the type column and the index rail
 *
 * The §7.2 robot plate was removed in Phase 1 (brief: "remove the old
 * floating robot photo"); the footage is the visual ground under both columns,
 * and the Phase 3 3D canvas (with its poster fallback) replaces it.
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

  /* Headline is rendered from content/home.ts rather than from literals. The
     two masked lines are the headline split at its accent phrase, so editing
     the copy file moves the hero with it. Falls back to the literal pair if the
     accent phrase ever stops matching (a heading can never blank out). */
  const accentPhrase = home.hero.headlineAccent;
  const accentAt = home.hero.headline.indexOf(accentPhrase);
  const headLine1 = accentAt > 0 ? home.hero.headline.slice(0, accentAt).trim() : "Build what";
  const headLine2 = accentAt > 0 ? accentPhrase : "thinks forward.";

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

      {/* Atmospheric depth — one layer, not three. The previous build stacked
          cyan, purple and teal blooms here (off-palette, and the exact
          "AI-generated" glow look the design brief rules out). A single
          accent-tinted bloom sits behind the footprint of the index rail
          instead, so the depth still reads without a second colour system. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-1/2 z-0 h-[420px] w-[420px] -translate-y-1/2 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_9%,transparent),transparent_70%)] blur-[110px] md:h-[620px] md:w-[620px]"
      />

      {/* Type column — the poster. */}
      <Container className="relative z-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16 xl:gap-24">
          <div className="max-w-[720px]">
            {/* Eyebrow (§7.2 beat 1, alongside the nav fade). No backdrop blur:
                the pill sits on the scrim's opaque zone, so glass here was only
                ever a second effect for its own sake. */}
            <motion.div
              {...fade(0)}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5"
            >
              <span className="beacon-pulse h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {home.hero.eyebrow.toUpperCase()}
              </span>
            </motion.div>

            {/* Headline — §7.2: lines reveal one by one through an
                overflow-hidden line box, 80ms stagger, 900ms each. Uppercase
                and oversized by definition; the accent phrase takes the
                gradient fill so the acid yellow reads as light. */}
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-foreground">
              {/* The padding/-margin pair widens the clip box for the glyphs
                  without moving the layout — oversized display type sits close
                  to its line box at leading 0.95. */}
              <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                <motion.span {...mask(0.1)} className="block">
                  {headLine1}
                </motion.span>
              </span>
              <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
                <motion.span {...mask(0.18)} className="text-gradient-accent block">
                  {headLine2}
                </motion.span>
              </span>
            </h1>

            {/* Subhead (§7.2 beat 3, t=0.5s). Body tone, not a 75%-opacity
                foreground: this is the sentence that explains the claim. */}
            <motion.p
              {...fade(0.5)}
              className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.6] text-body"
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
              className="mt-12 border-t border-line pt-5"
            >
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-foreground">
                {home.hero.proof.label}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {home.hero.proof.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        {/* Shipped index — the second column, and the answer to the dead space
            the hero used to leave above the footage: the type column stopped at
            720px on a 1360px canvas, so the right third of the most valuable
            screen on the site carried nothing. The rail is populated from the
            real inventory in content/home.ts (`work.items`) — claim on the left,
            evidence on the right, one shared baseline (lg:items-end).
            Solid surface, no blur: it sits over the video ground, and this
            layer must never read as glass. */}
        <motion.aside
          {...fade(0.4)}
          aria-label="Shipped work"
          className="hidden lg:block"
        >
          <div className="border border-line bg-background/90">
            <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Shipped
              </span>
              <span className="font-mono text-xs tabular-nums text-dim">
                {String(home.work.items.length).padStart(2, "0")}
              </span>
            </div>

            <ul>
              {home.work.items.map((item) => (
                <li key={item.number} className="border-b border-line last:border-b-0">
                  <a
                    href={home.hero.secondary.href}
                    className="group/row flex items-baseline gap-4 px-5 py-4 transition-colors duration-200 hover:bg-surface-1"
                  >
                    <span className="font-mono text-xs tabular-nums text-dim">{item.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base uppercase tracking-tight text-foreground transition-colors duration-200 group-hover/row:text-accent">
                        {item.title}
                      </span>
                      <span className="mt-1 block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {item.type}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 self-center text-dim transition-colors duration-200 group-hover/row:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-5 py-3">
              <a
                href={home.hero.secondary.href}
                className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-accent"
              >
                {home.hero.secondary.label} →
              </a>
            </div>
          </div>
        </motion.aside>
        </div>
      </Container>
    </section>
  );
}
