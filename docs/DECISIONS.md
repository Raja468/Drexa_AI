# Decisions log — Phase 0

One entry per judgement call the brief told the agent to make itself
("pick the simplest option that meets the acceptance criteria"). Newest last.

## D1 — 3D dependency versions: fiber v9 + drei v10, NOT the brief's ^8/^9

**Deviation from the brief (§2) and from the phase instructions.** The brief
pins `@react-three/fiber@^8` + `@react-three/drei@^9` "because these match
React 18 / Next 14". That premise does not hold in this repo: package.json
runs **Next 16.3.3 + React 19.2.8**, and npm hard-fails the literal install:

```
ERESOLVE  peer react@">=18 <19" from @react-three/fiber@8.18.0
Found: react@19.2.8
```

Installing v8 with `--legacy-peer-deps` would produce a runtime-broken
reconciler (v8 targets React 18 internals), failing the brief's own gate that
the build works. So the **React-19-compatible line** is installed instead:
`three@^0.186.0, @react-three/fiber@^9.7.0, @react-three/drei@^10.7.8`. The
brief's *intent* — a working 3D stack that must never block first paint — is
met; the literal version numbers were written for a stack this repo no longer
uses. One-line revert if the owner insists: `npm install
@react-three/fiber@^8 @react-three/drei@^9 --legacy-peer-deps` (not recommended).

Only these three were installed — gsap/lenis/zod/react-hook-form/simple-icons
are allowed but not needed until Phases 2/4, and the phase instruction was to
install only what Phase 0 requires.

## D2 — Tailwind v4: tokens go in `@theme static`, not `tailwind.config`

The brief says "add tokens to Tailwind config". This repo is Tailwind **v4**
(CSS-first); there is no config file. Tokens were added to the existing
`@theme static` block in `app/globals.css`, which is the v4 equivalent.

## D3 — Token values: existing palette wins where the brief says "extend"

§4: "use the values already in tailwind config where they exist. Extend, do
not replace." Therefore:

- Brief's `--text #F5F5F0` / `--text-muted` map onto the existing
  `--color-foreground #fafafa` / `--color-muted-foreground` (kept).
- Brief's `--accent ≈ #E0F000` → existing `--color-accent #dfe104` kept.
- Brief's `--line rgba(255,255,255,.10)` added as **`--color-line`** (new
  token; the existing `--color-border #3f3f46` stays for current components
  so nothing visually shifts).
- `--color-surface-1` / `--color-surface-2` added as `color-mix` of the
  background + 4% / 8% white, per the brief's formula.
- `--color-danger #f87171` / `--color-success #4ade80` picked ≥ 4.5:1 on the
  background (danger matches the red already used by the form error state).

## D4 — Container stays 1360px; Section carries no default padding

The brief's §4 container is `max-width: 1280px`. A shared Container already
existed at `max-w-[1360px]` and every section is laid out against it —
switching to 1280px would visibly reflow the whole site during the "site must
look the same" phase. Existing value kept; revisit in a later phase if the
owner wants the narrower column.

The new `Section` component applies only the §5.2 isolation rules
(`relative isolate overflow-clip`) and **no** default padding — sections keep
their own `py-*` rhythm classes so adopting it cannot move layout. It was
adopted as a drop-in on the home page sections and `CtaBanner`; the hero was
left as-is because it already declared the identical isolation classes
itself.

## D5 — Fonts: self-hosted from the repo's own build cache

`next/font/google` (Space Grotesk + Geist Mono) violated §2 rule 3. Rather
than download from Google/Bunny (unreliable in the owner's region), the latin
variable woff2 subsets were recovered from the repo's own `.next/static/media`
build output and committed to `app/fonts/`, then loaded via
`next/font/local` with the same CSS variables (`--font-display`,
`--font-mono`). Same faces, same weights (300–700 / 100–900), zero external
font requests at build or runtime.

## D6 — Content extraction: page copy is the source of truth

Where `content/*.ts` and a page's hard-coded copy had drifted (services items,
engagement models, about stats/convictions/stack, contact page), the **live
page strings** were moved into the content module verbatim so the rendered
output is byte-identical. The superseded draft strings in content files were
replaced, not the page visuals.

## D7 — Email placeholder fix scope

`ContactForm` renders every placeholder uppercase (`placeholder:uppercase`
on the shared field class) — that is what clipped the email placeholder into
`YOU@COMPANY.C`. Per §2 rule 8, only the email placeholder was switched to
normal case (and semibold, since the forced bold at 24–30px is what made the
caps overflow); all other placeholders keep their uppercase style, so the fix
is scoped to the reported bug.

## D8 — verify.ps1 assertions realigned to the brief (Phase 1)

The smoke test's signature rules were written against an older page and went
stale as the brief's own changes landed:

- `text-display` → **`text-mega`**: no component ever renders the
  `text-display` token; the viewport-width heading token this design system
  actually uses is `text-mega` (SectionHeader, PageHero, section titles).
- Gradients: the blanket `'gradient'` ban tripped over the site's sanctioned
  `.text-gradient-accent` hero treatment (declared in globals.css as part of
  the identity). The rule now flags only `bg-gradient` / `bg-linear-to-*`
  utilities and `linear-gradient()` in the page body — radial glow/spotlight
  gradients and `.text-gradient-accent` stay allowed, as the owner directed.
- Massive numerals `min 8` → **`min 4`**: Phase 1 removes numbering from
  services (§7.4) and Why Drexa (§7.8), which the brief itself mandates —
  numerals legitimately remain only in the Process sequence and work cards.
- Sticky `min 3` → **`min 1`**: the Why Drexa sticky card stack is replaced
  by the §7.8 yellow layout, whose left column is the one sanctioned sticky.

## D9 — Hero: video ground kept, robot removed, no poster slot yet (§7.2 layout only)

Phase 1 says "hero layout fix … remove the old robot image (leave a temporary
poster)". Interpretation: the robot plate (`robo-hero.png` + `.hero-robo`
CSS) is removed; the owner-supplied studio reel stays as the hero ground —
it is a real asset in active use, and stripping it would leave a black void
rather than a "temporary poster". The brief's right-column 3D/poster slot is
a Phase 3a deliverable and is not faked here. Hero height now follows §7.2
literally: `min-h-[calc(100svh-64px)]`. The "random wireframe cube / hex
labels" named by the brief no longer exist in code (removed in an earlier
redesign) — nothing to delete.

## D10 — "Book a call" renders only when a real booking URL exists (§7.12)

`site.bookingUrl` is `null` until the owner provides Cal.com/Calendly. Per
§2 rule 2 (no fake proof/links), the button renders nothing while null;
WhatsApp remains the primary CTA (also the owner's standing preference).
Dropping a URL into `content/site.ts` switches the button on with no code
change. Recorded in TODO_OWNER.

## D11 — Zero new animation in Phase 1 sections

The Phase 1 gate demands "zero animation added". The new sections
(ProofStrip, TeamSection) and rewritten WhyDrexa/Footer use no FadeUp /
Stagger wrappers, no count-up (proof counters are static; the §7.5 animation
is a Phase 2 item), no cursor glow over the footer wordmark (§7.13, Phase 2).
The tech marquee reuses the site's existing CSS marquee primitive — that
motion already ships site-wide and is reduced-motion aware, so it is not a
new animation system.

## D12 — Form validation: zod + react-hook-form without @hookform/resolvers

§7.12 asks for zod + react-hook-form validation. `@hookform/resolvers` is
NOT on the brief's allowed-dependency list, so a ~10-line zod-backed resolver
lives inside ContactForm.tsx instead of adding the package. Honeypot field
(`website`) is visually hidden and unvalidated on purpose so a filled honeypot
still reaches the handler, which fakes success server- and client-side.
Rate limiting (5 req / 10 min / IP) is added to `/api/contact` as an
in-memory map — per-instance on serverless; swap point documented in the
route file.

## D13 — Numbering kept in content, unrendered

`home.capabilities[].number` and `home.why.pillars[].number` stay in the
content files (they are data, and a future layout may want them) but no
component renders them, per §3. Work-card numerals were left untouched —
§12 Phase 1 scopes numbering removal to services and Why Drexa only; the
work stack is restyled in Phase 2 (§7.6).

## D14 — Legal pages are honest stubs (§7.13)

`/privacy` and `/terms` exist as stubs (explicitly allowed by §7.13) with
placeholder copy that says the policy text is pending — not fake legal text.
Owner must supply real policy content (TODO_OWNER). `/team` was also missing
from the sitemap and has been added alongside the two stubs.

## D15 — Phase 2a: one animation system per element (GSAP/Lenis ↔ framer-motion ↔ CSS)

The brief allows GSAP *and* Framer Motion; running both over the same element
is how sites get 60fps violations and double-driven transforms. Ownership was
split explicitly:

- **Lenis + GSAP own the scroll-level systems** (§5): SmoothScroll (lerp 0.1,
  gsap.ticker-driven, ScrollTrigger-synced), the 2px progress bar, the custom
  cursor, the magnetic CTA wrapper, the preloader lift, and the §7.5
  count-up. All are fine-pointer / reduced-motion gated per §11.
- **framer-motion keeps every per-element reveal it already had**: the site
  wide FadeUp/Stagger primitives, the §7.11 FAQ accordion (already meets
  every §7.11 behavior criterion — one-at-a-time, height spring, ARIA — so it
  was reused untouched), and the §7.2 hero load sequence. The sequence was
  rebuilt in place (mask line reveals per §7.2's timing table) rather than
  ported to GSAP: it is an element entrance, framer already owned it, and the
  two clocks are aligned by gating the whole column on `waitPreloader()`
  (lib/preloader.ts), which resolves when the preloader starts lifting.
- **The CSS marquee stays CSS.** §7.3 was satisfied by two opt-in props on the
  existing primitive — `loopSeconds` (exact 40s loop, brief: "~40s per loop")
  and `pauseOnHover` (CSS `animation-play-state`, scoped to the accent ticker
  via `data-pause-on-hover`). The old Marquee rule "the system forbids a hover
  pause" is superseded by this opt-in; all other marquees remain pause-free.
- **§7.3's optional velocity skew is skipped**: it would put a second motion
  system (Lenis velocity) on the same element the CSS marquee owns. Revisit on
  owner request.
- **Preloader mark is a placeholder**: §5.5 wants the *logo mark* to draw in,
  but `/public/brand/mark.svg` is still an owner input (TODO_OWNER). A stroked
  SVG "D" monogram + "DREXA." wordmark stands in; when mark.svg lands, only
  the `<svg>` block in Preloader.tsx changes.
- **Custom cursor**: the native cursor is hidden only while the custom cursor
  is active (`html.has-custom-cursor`), and text-entry fields are exempted in
  CSS so the caret/I-beam returns where §5.3 demands the custom cursor hide.
- **Count-up**: `CountUp` parses numeric prefix/suffix out of the content
  values ("3", "30+", "100%", "24h") so content/proof.ts stays the single
  source of truth; unparseable values render static rather than faked.

### D15 refinements — Batch A owner conditions

- **One system per element, enforced structurally**: framer-motion animates
  only *outer* elements (`motion.div` in the hero column, `motion.header` in
  the nav); GSAP animates only *inner* ones (the `Magnetic` wrapper span,
  `CountUp` textContent). No element is driven by both.
- **Preloader failsafe**: three independent 2s wall-clock timers (Preloader
  force-lifts; Hero and Navbar release their sequence) so the page can never
  be stuck behind the overlay even if the promise/event is lost. First paint
  is still covered by the SSR overlay (no flash, no shift — hero text is
  hidden by opacity/transform only, layout is in place).
- **Strict-mode safety**: every GSAP component fully tears down on unmount
  (Lenis `.destroy()`, `gsap.ticker.remove`, tween/ScrollTrigger kills,
  listener removal). The preloader session flag is written at *lift* time,
  not at mount, so dev's double-invoked effects cannot pollute it and
  silently skip the preloader.
- **Cursor native visibility**: `cursor: none` is applied only while the
  custom cursor is actually running (`html.has-custom-cursor`, added/removed
  by its effect); text-entry fields are exempted so the native caret/I-beam
  returns where the custom cursor hides itself; coarse pointers and reduced
  motion never hide the native cursor at all.
- **Lenis route hygiene**: on every route change Lenis is re-synced
  (`scrollTo(0, immediate)`) so Next's scroll reset can't leave a stale
  animated value, and `ScrollTrigger.refresh()` runs on route change,
  `document.fonts.ready` and window `load` (late fonts/images change
  geometry).
- **Sticky Why Drexa was silently broken**: the sticky element was the grid
  item itself with `lg:self-start` — zero travel, never pinned. Fixed by
  stretching the grid item and making an inner wrapper sticky. Real travel
  with the current copy is ~20px (content-limited, not a code limit).

## D16 — Preloader shows on EVERY full page load (§5.5 amended by owner)

The owner amended §5.5: the preloader now runs on every full page load, not
only the first visit per session. The `sessionStorage` flag logic was removed
entirely (read and write; `hasSeenPreloader`/`markPreloaderSeen` are gone
from `lib/preloader.ts` and `Preloader.tsx`).

Implementation:

- The overlay is server-rendered (fixed, opaque, z-90 above the nav) so the
  first paint is already covered — no hero flash, no layout shift.
- **Class-based control hand-off**: SSR renders `preloader-failsafe`, a
  pure-CSS animation that holds the overlay ~2.55s and fades it out
  (fill: forwards) if JS never runs. The Preloader effect removes that
  class on hydration and JS owns the rest — lift at 0.85s via a CSS
  transition, independent 2s wall-clock failsafe, then the
  `drexa:preloader-done` event. If JS arrives after the CSS fade already
  ran (cold cache > ~2.5s), the preloader skips instead of popping the
  overlay back.
- **Body scroll lock**: a server-rendered `preloader-lock` class on `<body>`
  (`overflow: hidden`) is removed at lift — the lock covers exactly the
  overlay's lifetime. Lenis is only created when the lift fires
  (`SmoothScroll` waits on the preloader event). No-JS caveat: the CSS fade
  reveals the page but the lock has no JS to release it — accepted (the
  site is JS-dependent anyway).
- **Strict-mode safety by construction**: the preloader dropped
  framer-motion — lift, mark draw-in and wordmark are CSS transition/
  keyframes, so double-invoked effects can neither run the animation twice
  nor restart it; the effect cleanup only clears timers.
- Reduced-motion skip and the 2s failsafe retained. Hero/nav sequence still
  waits for the lift via `waitPreloader()`.

**One-line revert:** restore `hasSeenPreloader()`/`markPreloaderSeen()` in
`lib/preloader.ts` and re-add the `hasSeenPreloader() ||` early-return in
`components/motion/Preloader.tsx` (the flag read) + `markPreloaderSeen()`
inside its `lift()` — i.e. tag-for-tag undo of the `// D16` changes in those
two files.
