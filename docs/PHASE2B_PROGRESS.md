# Phase 2b progress — services bento, work stack, process timeline

Scope: brief §7.4 (services bento), §7.6 (work sticky stack), §7.7 (process timeline).
Governing decisions: D15 (one animation system per element), D17+ (new entries).

## Prerequisites (from Phase 2a)
- [x] GSAP + Lenis + ScrollTrigger installed and wired
- [x] Custom cursor, magnetic, preloader, scroll progress working
- [x] CountUp component ready for reuse

---

## 1. Services Bento (§7.4) `[AGENT BUILDS]`

### Layout
- [x] Bento grid: 2×2 large cards (AI Automation, AI Agents) + 2×3 small cards
- [x] Large cards span 2 columns on desktop; single column on mobile
- [x] Small cards in 2-col grid on desktop; single column on mobile
- [x] No numbering; small line icon per service (from Lucide, mapped by slug)
- [x] Heading + intro sentence from `home.capabilities`

### Interactions
- [x] Cursor-following radial yellow spotlight on card background/border (CSS vars `--x`, `--y`)
- [x] Icon animates on hover (scale/rotate)
- [x] Large cards: mini CSS/SVG animation inside
  - AI Automation: boxes connected by line with travelling dot
  - AI Agents: 5 nodes with pulsing connections
- [x] Whole card links to `/services/[slug]` (stub → `#contact` until Phase 4)
- [x] Tag chips horizontal scroll with snap on mobile

### Motion rules (D15)
- [x] Spotlight is CSS (custom properties + `background: radial-gradient`)
- [x] Mini-animations are CSS keyframes (no GSAP/Framer on same element)
- [x] Hover icon animation is CSS transition
- [x] Respects `prefers-reduced-motion`

### Accessibility
- [x] Cards are `<article>` with proper heading structure
- [x] Link wraps entire card (or clear CTA)
- [x] Focus visible with 2px accent outline

---

## 2. Work Stack (§7.6) `[AGENT BUILDS]` layout, `[OWNER PROVIDES]` media

### Layout
- [x] Sticky stacking panels (~85vh each)
- [x] Panel structure: browser/device frame (left) + copy (right)
- [x] Frame: looping screen video (`.webm` + `.mp4`, ≤3MB, 1280×720, silent) + poster `.webp`
- [x] Static screenshot fallback until owner provides media
- [x] Video: `preload="none"`, `autoplay muted loop playsinline`, paused off-screen (IntersectionObserver)
- [x] Outcome line (one sentence, real facts) under description
- [x] Tags + "View case study" / GitHub links
- [x] Cursor shows "View" over panel (`data-cursor="view"`)

### Scroll behavior
- [x] As next panel enters, previous scales to 0.94 and dims to 60% opacity (ScrollTrigger scrub)
- [x] No pinning library beyond ScrollTrigger; uses `position: sticky`
- [x] Whole panel links to `/work/[slug]` (stub → GitHub until Phase 4)

### Motion rules (D15)
- [x] Stack scale/opacity driven by GSAP ScrollTrigger
- [x] Video play/pause via IntersectionObserver (separate system, not on same element)
- [x] Reduced motion: static screenshots, no stack animation

### Accessibility
- [x] Videos have `aria-hidden` (decorative)
- [x] Posters have meaningful `alt`
- [x] Panel link is keyboard accessible

---

## 3. Process Timeline (§7.7) `[AGENT BUILDS]`

### Layout
- [x] Vertical timeline: large numerals left, content right
- [x] 2px line down left edge draws itself (SVG `stroke-dashoffset` scrubbed by ScrollTrigger)
- [x] Active step: numeral yellow, text full opacity; inactive: 40% opacity
- [x] "You get:" chip under each step (`DRAFT COPY`)
- [x] Mobile: line at far left edge; numerals shrink

### Motion rules (D15)
- [x] Line drawing is GSAP ScrollTrigger (scrubbed)
- [x] Step activation (color/opacity) is GSAP ScrollTrigger
- [x] No Framer Motion on timeline elements
- [x] Reduced motion: line fully drawn, all steps full opacity

### Accessibility
- [x] Numerals decorative (`aria-hidden`)
- [x] Proper heading structure for steps
- [x] Line is decorative (`aria-hidden`)

---

## Integration

- [x] Replace `Capabilities` with `ServicesBento` in `app/page.tsx`
- [x] Replace `Work` with `WorkStack` in `app/page.tsx`
- [x] Replace `Approach` with `ProcessTimeline` in `app/page.tsx`

---

## Gate

- [x] `npx tsc --noEmit` ✅
- [x] `npm run lint` ✅
- [x] `npm run build` ✅
- [x] `.\verify.ps1` ✅
- [ ] Screenshots at 390/768/1440 (production build)
- [ ] Reduced-motion walkthrough verified

---

## Decision log entries (new)

- **D17** — Services Bento: spotlight is CSS custom-property radial gradient; mini-animations are CSS keyframes; icon hover is CSS transition. No GSAP/Framer on cards.
- **D18** — Work Stack: stack scale/opacity via GSAP ScrollTrigger scrub; video play/pause via IntersectionObserver (separate system). Static screenshots until owner media lands.
- **D19** — Process Timeline: line draw + step activation via GSAP ScrollTrigger; decorative line/numerals `aria-hidden`; reduced motion shows final state.