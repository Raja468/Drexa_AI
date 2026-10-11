# Phase 2a progress — global motion systems

Scope: brief §5 global systems + §7.2 TEXT load sequence + §7.3 ticker +
§7.5 count-up + §7.11 accordion + email placeholder fix. No 3D, no work
stack, no process line (Phases 2b/3). Governing decision: D15 in DECISIONS.md.

## Prerequisites (already committed)
- [x] gsap / @gsap/react / lenis installed (do not reinstall)
- [x] components/motion/SmoothScroll.tsx written (unwired)
- [x] components/motion/ScrollProgress.tsx written (unwired)
- [x] Grain overlay shipped (NoiseTexture, root layout) — verify only

## Batch A — owner conditions (DONE, verified on a production build)

Run with `next build` + `next start -p 3001` (port 3000 is occupied by the
owner's `next dev`; production proof ran on 3001). Proof rig:
`node scripts/phase2a-shots.mjs http://127.0.0.1:3001 docs/screenshots/phase2a`
— 11/11 checks PASS. Evidence in `docs/screenshots/phase2a/`:

- [x] C1 one-system-per-element: framer owns the outer (`motion.div` in hero,
        `motion.header` in nav); GSAP owns only the inner `Magnetic` span.
        CountUp mutates textContent only, never transform/opacity.
- [x] C2 preloader failsafe: independent 2s wall-clock timers in Preloader,
        Hero and Navbar; overlay force-lifts at 2s. Verified: covers first
        paint (SSR overlay, no flash/no shift), lifts ≤2s after hydration.
        Shots: preloader-first-load-400ms. **Superseded by D16** (owner
        amendment): the preloader now runs on every full page load instead of
        first-visit-only — see the D16 section below.
- [x] C3 strict-mode safety: teardown destroys Lenis, removes the ticker
        callback, kills tweens/ScrollTriggers, removes listeners; the
        preloader flag is written at lift time (not mount) so dev
        double-effects can't skip the preloader.
- [x] C4 cursor: native cursor hidden only while `has-custom-cursor` is on
        <html>; text-entry fields exempted (native caret returns); coarse
        pointers and reduced motion never activate it.
- [x] C5 Lenis: Back-to-top eases 9717→0 (trajectory sampled); #anchors
        routed; / → /team → / lands at top; ScrollTrigger refreshes on route
        change, fonts.ready and window load; sticky Why Drexa verified
        (clamps at exactly 128px under synthetic-height test).
- [x] C6 email placeholder: measured fit at all widths (390: 176px hint /
        298px field · 768: 211/294 · 1440: 211/231) + zoomed 3× crops
        email-placeholder-{390,768,1440}.png.
- [x] C7 kept FAQ layout item; velocity skew skipped as planned.

**Bug found and fixed by the C5 check:** the Why Drexa sticky column never
actually pinned — the sticky element was the grid item itself with
`lg:self-start` (zero travel). Fixed: grid item stretches, inner wrapper is
sticky (`components/sections/why-drexa.tsx`). Note: with the current copy the
real travel is only ~20px (left 572px vs 592px row) — structurally correct,
content-limited.

**Headless-testing notes** (for Batch B): same-URL `Page.navigate` never
fires `loadEventFired` (detour via about:blank); headless pauses rAF when
the page flips to `visibility: hidden` (`Page.bringToFront` guards; a
running `Page.startScreencast` also pumps frames).

## Batch B — width sweep, scroll effects, reduced motion (DONE, production build)

Rig: `node scripts/phase2b-shots.mjs http://127.0.0.1:3001 docs/screenshots/phase2a`
— **16/16 checks PASS**, 22 screenshots (`home-{390,768,1440}-{1..6}-*.png`,
`reduced-{1440,390}-{1,2}-*.png`).

- [x] 7. §7.2 hero TEXT sequence settles: headline line transforms at
        `none` (y=0), nav opacity 1, after the preloader lift.
- [x] 8. §7.3 ticker: loop exactly 40s; real hover flips
        `animation-play-state` to `paused` and back to `running` on leave.
- [x] 9. §7.11 FAQ: sticky heading left (x=88) / accordion right (x=632);
        one-at-a-time toggle (trigger 2 opens → trigger 1 closes, panel 82px);
        still operable under reduced motion.
- [x] 10. §7.5 count-up runs once and settles on the true content values —
        caught mid-flight: `3, 28+, 93%, 22h → 3, 30+, 100%, 24h`.
- [x] 11. Email placeholder (done in Batch A: measured fit at 390/768/1440
        + 3× crops).
- [x] 13. Gate: tsc ✅ lint ✅ build ✅; screenshots at 390/768/1440 with
        mid-scroll positions for the scroll-linked effects (progress bar
        scaleX 0.88 near page bottom); reduced-motion walkthrough complete:
        no preloader, no Lenis class, no custom cursor, marquee
        `animation-name: none`, counters static on true values, nav
        instant, FAQ operable — at 1440 AND 390.

Note: the owner's `next dev` (port 3000) never completed hydration in the
headless environment (its HMR socket repeatedly fails handshake there), so
iteration and the final check both ran on the production build, which the
owner requires as the source of truth anyway.

## Checklist
- [x] 1. SmoothScroll wired into app/layout.tsx; anchors ease via Lenis
- [x] 2. ScrollProgress wired into app/layout.tsx
- [x] 3. components/motion/CustomCursor.tsx (fine pointer only; View label
         over work cards via data-cursor="view")
- [x] 4. Grain overlay verified (no change needed)
- [x] 5. components/motion/Preloader.tsx + lib/preloader.ts (≤1.2s, skip on
         reduced motion; logo SVG pending). **D16**: sessionStorage flag
         removed — shows on every full page load; server-rendered overlay +
         CSS-only failsafe fade; see the D16 section below.
- [x] 6. components/motion/Magnetic.tsx; hero primary CTA + nav CTA wrapped
- [x] 7. Hero TEXT load sequence (§7.2): mask line reveal replaces enter();
         gated on preloader lift; reduced motion → instant
- [x] 8. Ticker (§7.3): pauseOnHover opt-in on Marquee; loopSeconds={40}; no
         velocity skew (D15)
- [x] 9. FAQ (§7.11): sticky heading left / accordion right; accordion
         behavior reused untouched; JSON-LD deferred to Phase 4
- [x] 10. components/motion/CountUp.tsx; proof-strip counters animated once
          at ~40% visible; suffixes preserved (30+, 100%, 24h)
- [x] 11. Email placeholder clipping fixed in FIELD_EMAIL only (hint now
          20/24px, normal case + semibold, per D7 + this fix)
- [x] 12. DECISIONS.md D15 entry written
- [x] 13. Gate — tsc ✅ lint ✅ build ✅; screenshots 390/768/1440 (incl.
          mid-scroll) + reduced-motion walkthrough done via the CDP rigs
          (Batch A: 11/11, Batch B: 16/16, all on the production build);
          no section overlap in the sweep; LCP content paints under the
          preloader overlay with no shift (real-device eyeball is the
          owner's remaining check)

## D16 — preloader on EVERY full page load (owner amendment, DONE)

Owner change: the preloader runs on every full page load, not first-visit-only.
`sessionStorage` flag logic (read + write) removed from `lib/preloader.ts` and
`components/motion/Preloader.tsx`; brief §5.5 amended; logged as **D16** in
DECISIONS.md with a one-line revert.

- [x] 1. Flag removed; `hasSeenPreloader`/`markPreloaderSeen` gone
- [x] 2. Overlay server-rendered (fixed, opaque, z-90 above nav) → first paint
         is covered; hero never flashes
- [x] 3. Reduced-motion skip kept; 2s failsafe kept; CSS-only failsafe fade
         added (holds ~2.55s, fades out if JS never runs)
- [x] 4. Body scroll locked while up (`preloader-lock`, SSR'd); Lenis starts
         at the lift; hero sequence still waits for the lift
- [x] 5. Strict mode: CSS transition/keyframes (framer-motion dropped) so the
         animation cannot run twice or restart; cleanup clears timers
- [x] 6. Docs: §5.5 amended + D16 entry with one-line revert

**Verified on the production build** (`next build` + `next start -p 3001`) —
rig `node scripts/phase2a-shots.mjs http://127.0.0.1:3001 docs/screenshots/phase2a`:
**22/22 checks PASS** (the 11 Batch A checks still pass plus the D16 set).

- [x] SSR HTML ships the overlay over the first paint — `overlay=true
        failsafe=true bodyLock=true`
- [x] Load 1: opaque (opacity 1) at 380ms, body `overflow: hidden`, Lenis not
        yet created → then lifts
- [x] Fade trace (sampled every frame): `1.00 → 0.91 → 0.52 → 0.28 → 0.14 →
        0.005 → removed` — **monotonic, never brightens** (no flicker, no flash)
- [x] Hard failsafe: body unlocked 794ms after JS took over (limit 2s)
- [x] No layout shift: **CLS = 0.0000, zero shift entries** (control load with
        the overlay skipped is also 0 — the measurement itself is sound)
- [x] Loads 2 and 3: overlay shows again, body locked, Lenis held, then lifts
        again ≤2s — i.e. every refresh, not just the first
- [x] Reduced motion (emulated, `reduceMatches=true`): overlay skipped, no
        Lenis, no custom cursor
- [x] Overlay stays dismissed after the lift (no re-pop)
- [x] No uncaught page exceptions during the run

Evidence: `docs/screenshots/phase2a/preloader-first-load-400ms.png` (first
paint covered) and `preloader-second-load-400ms.png`. Fade-resolution detail
lives in the dedicated trace tool:

`node scripts/preloader-trace.mjs http://127.0.0.1:3001 [--reduce] [--poll]`

**Rig lesson (why the fade needed a second tool):** `Page.captureScreenshot`
with `captureBeyondViewport: true` blocks the CDP connection for ~3s on this
build, which starves rAF and freezes GSAP's ticker mid-tween — the overlay then
looks like it jumps 1 → 0 with no fade. The rig therefore takes its mid-animation
evidence with a viewport-only capture (`shotFrame`) and samples the fade from an
in-page rAF recorder, while `preloader-trace.mjs` gives the frame-by-frame
timeline. Both agree the site is correct.

## Notes
- Preloader mark is a placeholder pending `/public/brand/mark.svg`
  (TODO_OWNER already tracks the file) — swap is the one `<svg>` block in
  Preloader.tsx.
- §7.3 velocity skew intentionally skipped (D15): it would put a second
  motion system on the element the CSS marquee owns.
- FAQPage JSON-LD deliberately deferred to Phase 4 (§12 scopes SEO there).

