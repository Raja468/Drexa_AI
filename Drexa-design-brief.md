# DREXA — Website Redesign: Master Design Brief

**For:** the coding agent (Cursor / Antigravity / CLI agent)
**Owner:** Raja (Drexa AI), site: drexa.tech
**Repo location of this file:** `/docs/DESIGN_BRIEF.md`

---

## 0. How to use this document

1. Read this whole file once. Then work **one phase at a time** (Section 12). Do not start the next phase until the owner approves the screenshots of the current one.
2. Tags used below:
   - `[AGENT BUILDS]` — you implement it completely, no questions needed.
   - `[OWNER PROVIDES]` — you cannot invent this (photos, videos, real numbers, testimonials, API keys, 3D model). Build with a clearly marked placeholder and add a line to `/docs/TODO_OWNER.md`.
   - `[AGENT DRAFTS → OWNER APPROVES]` — you may write draft copy, but mark it `// DRAFT COPY` so the owner reviews it.
3. If something is ambiguous, pick the simplest option that meets the acceptance criteria, record the decision in `/docs/DECISIONS.md`, and continue. Ask the owner only when you are truly blocked.
4. At the end of every phase: run `build`, `lint` and `typecheck`; take screenshots at **390px, 768px and 1440px** widths; write a short summary of what changed and what is still a placeholder.
5. Keep components small and named clearly (`Hero`, `ServicesBento`, `WorkStack`, `ProcessTimeline`, `TeamSection`, `AiDemo`, `ContactSection`, `Footer`). Content lives in `/content/*.ts` files, not hard-coded in JSX.

---

## 1. Project context

Drexa is a small, independent AI technology studio. It builds AI agents, automation workflows, LLM integrations, custom software, web experiences, cybersecurity work and creative/motion work. The studio is new. The work shown on the site is **its own internal and R&D products** (ChatConnect AI, Drex AI Assistant, Iqra School Management System), not client work.

**Goal of the site:** make a business owner or startup founder think "these people are technically serious and have taste", and then book a 30-minute call or send a project brief.

**Primary conversion:** "Start a project" (brief form) and "Book a call".
**Secondary conversion:** "See our work".

**Current problem to solve:** the page is well structured but feels empty and repetitive. Every section is the same "big heading + black boxes + big numbers". It lacks proof, people, depth and something interactive.

---

## 2. Non-negotiable rules

1. **Stack (fixed):** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 (tokens live in `@theme` inside the global CSS — there is no `tailwind.config` file), Framer Motion.
   **Allowed additions:** `three`, `@react-three/fiber@^9`, `@react-three/drei@^10` (these versions match React 19 / Next 16 — do not install fiber v8, it peer-requires React 18; see `/docs/DECISIONS.md` D1), `gsap` (with ScrollTrigger) and `@gsap/react`, `lenis`, `zod`, `react-hook-form`, `simple-icons`.
   **Anything else: ask first.**
2. **No fake proof.** Never invent client logos, testimonials, metrics, awards, team members or certifications. If real data is missing, the component must render nothing (return `null`) or a clearly labelled placeholder in development only.
3. **Fonts:** Google Fonts is blocked in the owner's region. Do **not** use `next/font/google` or any `fonts.googleapis.com` link. Use the fonts already in the repo. If you must add one, load it from Bunny Fonts (`fonts.bunny.net`) or self-host with `next/font/local`.
4. **No runtime dependence on third-party CDNs for critical assets.** Host locally in `/public`: Draco decoder files, HDRI environment map, fonts, icons. (Do not use drei's `<Environment preset="...">` — presets fetch from an external CDN. Use a local `.hdr` file.)
5. **Performance budget:** see Section 11. The 3D scene must never block first paint.
6. **Accessibility:** respect `prefers-reduced-motion`, visible keyboard focus, body-text contrast ≥ 4.5:1, meaningful `alt` text, all interactive elements reachable by keyboard.
7. **Do not break** existing routes, metadata or content unless a section below says to change it.
8. **Existing bug to fix in Phase 0:** the email field placeholder in the contact form is clipped ("YOU@COMPANY.C"). Use a shorter placeholder in normal case (`you@company.com`) and make the input wide enough.

---

## 3. Design direction

**Concept: "precision studio".** Dark canvas, one acid-yellow accent (the owner's choice — keep it), sharp geometry, generous space, and a single memorable interactive moment: the 3D hero object.

**Principles**

- **Spend boldness in one place.** The 3D hero is the memorable thing. Everything else stays quiet and disciplined.
- **Structure must carry meaning.** Numbered markers (01, 02, 03) appear **only** where the content is a real sequence (the Process section). Services and "Why Drexa" must not be numbered.
- **Vary the rhythm.** Do not use one repeated block type. The page must contain: one full-bleed **yellow** inverted section, one **media-heavy** section (work), one **bento** grid (services), one **timeline** (process), and one **human** section (team).
- **Reduce template chrome.** Cut the tracked-out ALL-CAPS eyebrow label above every heading. Allow at most one small label per section, and only when it adds information. Large display headlines may stay uppercase (brand voice); body, labels and buttons use sentence case.
- **Motion is sparing and purposeful.** One orchestrated page-load sequence. Scroll-linked motion only in Hero, Work and Process. Motion that answers a user action (hover, open, submit) is welcome. Do **not** add fade-and-slide-up to every section and hover-lift to every card.
- **Copy:** plain, specific, active voice. Say what happens ("Start a project", "Send brief"), not vague marketing.

---

## 4. Design tokens

Use the values already in `tailwind.config` where they exist. Extend, do not replace.

**Color**

| Token | Value | Use |
|---|---|---|
| `--bg` | existing near-black | page background |
| `--surface-1` | bg + 4% white | cards |
| `--surface-2` | bg + 8% white | raised / hover |
| `--line` | `rgba(255,255,255,.10)` | borders, dividers |
| `--text` | `#F5F5F0` | headings |
| `--text-muted` | `rgba(255,255,255,.72)` | body (must pass 4.5:1) |
| `--accent` | existing yellow (approx `#E0F000`) | CTAs, highlights, 3D material |
| `--accent-ink` | existing near-black | text on yellow |
| `--danger` / `--success` | pick accessible values | form states |

**Type**

- Keep the current display, body and mono fonts already in the repo (do not swap them).
- Fluid scale with `clamp()`:
  - H1: `clamp(3rem, 7vw, 6.5rem)`, line-height 0.95, letter-spacing `-0.02em` (loosen if letters collide)
  - H2: `clamp(2.25rem, 4.5vw, 4.5rem)`, line-height 1
  - H3: `clamp(1.25rem, 2vw, 1.75rem)`
  - Body: `clamp(1rem, 1.1vw, 1.125rem)`, line-height 1.6, **max-width 60ch**
- Mono only for genuine data (tags, tech stack, counters), never as decoration.

**Layout**

- One shared container everywhere (nav, hero, sections, footer): `max-width: 1360px; margin-inline: auto; padding-inline: 1.25rem / 2rem / 3rem` (the repo's `Container`: `max-w-[1360px] px-5 sm:px-8 lg:px-12`; see `/docs/DECISIONS.md` D4).
- 12-column grid, 8px spacing scale. Section vertical padding `clamp(5rem, 10vw, 9rem)`.
- Breakpoints: 390, 768, 1024, 1440, 1920. Test all.
- Radius hierarchy (do not use one radius for everything): buttons 0–2px (sharp, brand), cards 6px, media frames 12px, pills 999px.

**Motion tokens**

- Durations: 200ms (micro), 500ms (UI), 900ms (reveal), 1400ms (hero).
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out feel) for entrances; `power3.out` in GSAP.
- All motion disabled or reduced when `prefers-reduced-motion: reduce`.

---

## 5. Global systems `[AGENT BUILDS]`

1. **Smooth scroll:** Lenis, `lerp: 0.1`. Sync with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` and drive Lenis from `gsap.ticker`). Disable on reduced motion and on touch devices if it causes jank.
2. **Section isolation:** every section gets its own stacking context (`position: relative; isolation: isolate; overflow: clip`). No scroll effect from one section may visually overlap the next one. Hero scroll effects must finish before the ticker begins.
3. **Custom cursor (desktop with fine pointer only):** small dot plus a ring that lags slightly (lerp 0.15). Ring grows over links/buttons; shows the label "View" over work cards; hides over form inputs. Never on touch devices.
4. **Grain overlay:** fixed, `pointer-events: none`, 3–4% opacity noise (inline SVG or tiny PNG). Adds depth to the flat black.
5. **Preloader:** first visit only (store flag in `sessionStorage`), max 1.2s, logo mark draws in, then the hero load sequence starts. Skip entirely on reduced motion. Must not delay LCP more than that.
6. **Magnetic buttons:** primary CTA moves up to 8px toward the cursor on desktop. Return with spring.
7. **Focus styles:** 2px yellow outline with 3px offset on every interactive element.
8. **Scroll progress:** thin 2px yellow bar under the nav.
9. **Error/empty/loading states:** every async thing (form, AI demo, 3D) has a defined loading, error and success state written in plain language.

---

## 6. Page architecture

Order of sections (top to bottom):

1. Nav
2. Hero (3D)
3. Ticker (keep)
4. What we do — services **bento**
5. Proof strip (**new**)
6. Selected creations — work **stack**
7. Process — **timeline**
8. Why Drexa — **yellow inverted** full-bleed
9. Team / founder (**new**)
10. Live AI demo (**new**)
11. FAQ
12. Contact + booking
13. Footer

Rhythm map: dark → dark → dark (bento) → dark (proof, light density) → **media** (work) → dark (timeline) → **YELLOW** (why) → dark (team, portrait-led) → dark (demo, glass card) → dark (FAQ) → dark (contact) → **giant wordmark footer**.

---

## 7. Section specs

### 7.1 Nav `[AGENT BUILDS]`

- Keep links: Work, Services, Our Team, About, Contact, plus CTA "Start a project".
- Height 76px at top, shrinks to 64px after 80px scroll with backdrop blur and a 1px bottom line.
- Highlight the link of the section currently in view.
- "Our Team" and "About" must scroll to real sections (Section 7.9). If they were separate pages before, keep the routes and also anchor.
- Mobile (<1024px): hamburger opens a full-screen menu; links stagger in (60ms apart); body scroll locked; focus trapped; Esc closes.
- CTA is a magnetic button.

### 7.2 Hero `[AGENT BUILDS]` (+ 3D from Section 8)

**Wireframe (desktop)**

```
┌────────────────────────────────────────────────────────────────┐
│ [logo]     WORK  SERVICES  OUR TEAM  ABOUT  CONTACT  [START ↗] │
├────────────────────────────────────────────────────────────────┤
│  ● Independent AI technology studio          ╭───────────────╮ │
│                                              │               │ │
│  BUILD WHAT                                  │   3D OBJECT   │ │
│  THINKS                                      │  (R3F canvas, │ │
│  FORWARD.                                    │  bleeds to    │ │
│                                              │  right edge)  │ │
│  We design and ship AI agents, automation    │               │ │
│  workflows and web products — from           ╰───────────────╯ │
│  prototype to production.                                      │
│  [Start a project ↗]   See our work                            │
│  3 AI products shipped · Next.js · Python · PostgreSQL         │
└────────────────────────────────────────────────────────────────┘
```

**Content**

- Keep the headline "BUILD WHAT THINKS FORWARD." (white, then yellow on "THINKS FORWARD.").
- Subhead (`DRAFT COPY`): "We design and ship AI agents, automation workflows, and web products — from prototype to production."
- Primary CTA "Start a project" (yellow, solid). Secondary CTA "See our work" (text link with underline that draws on hover). Both must be fully visible **above the fold at 1440×800 and 390×800**.
- Small proof line under the CTAs: "3 AI products shipped" + tech list (keep what exists).

**Layout rules**

- Text column 6/12, canvas column 6/12 on desktop, canvas allowed to bleed to the right viewport edge. On mobile: canvas goes **below** the CTAs as a 320px-tall block (or static poster), never behind the text.
- Hero height `min-height: calc(100svh - 64px)`. Nothing important below the fold.
- Headline: fluid size from Section 4, line-height 0.95. Make sure letters do not collide.
- Subhead: max 50ch, `--text-muted`.

**Load sequence (the one orchestrated moment)**

1. t=0: nav fades in.
2. t=0.1s: headline lines reveal one by one with a mask (translateY 100% → 0 inside an `overflow: hidden` line box), 80ms stagger, 900ms each.
3. t=0.5s: subhead + CTAs fade in.
4. t=0.6s: canvas fades in (opacity 0→1, 1200ms) only when the 3D scene reports ready.
5. Ambient: thin background grid/network lines drift very slowly (CSS only, 2% opacity).

**Scroll behavior**

- As the hero leaves the viewport: the 3D object rotates (Y axis 0 → 90°) and scales 1 → 0.85; the text column moves up 8% and fades. Effects are scrubbed with ScrollTrigger and must be complete by the time the hero's bottom edge reaches the top of the viewport.
- Remove the old floating robot photo and the random wireframe cube / hex labels from the background.

### 7.3 Ticker `[AGENT BUILDS]`

- Keep the "AI AUTOMATION • AI AGENTS • LLM INTEGRATION • CUSTOM SOFTWARE…" band (yellow background, black text).
- Linear infinite marquee, ~40s per loop, pauses on hover, static on reduced motion.
- Optional: skew the band by up to 2° in the direction of scroll velocity (Lenis velocity), easing back to 0.
- The band must sit fully **below** the hero's stacking context (no overlap from hero effects).

### 7.4 What we do — services bento `[AGENT BUILDS]`

Goal: replace the uniform 4×2 grid of identical numbered boxes with a **bento** layout that has hierarchy.

```
┌───────────────────────┬───────────────────────┬──────────────┐
│  AI AUTOMATION        │  AI AGENTS            │ LLM          │
│  (large, 2 cols)      │  (large, 2 cols)      │ INTEGRATION  │
│  animated flow visual │  animated node graph  │ (1 col)      │
├──────────┬────────────┼──────────┬────────────┼──────────────┤
│ CUSTOM   │ WEB        │ AI DEV   │ CYBERSEC   │ CREATIVE     │
│ SOFTWARE │ EXPERIENCES│          │            │              │
└──────────┴────────────┴──────────┴────────────┴──────────────┘
```

- Keep all 8 services and their existing descriptions and tag chips (content moves to `/content/services.ts`). Remove the 01–08 numbers; use a small line icon per service instead.
- Heading (keep): "Technology should move you forward." Add a one-sentence intro under it (max 60ch).
- **Card behavior:** cursor-following radial yellow spotlight on the card background and border (CSS variables `--x`, `--y` updated on `pointermove`). Small icon animates on hover. Whole card is a link to `/services/[slug]` (create stub pages in Phase 4; until then link to `#contact`).
- **Large cards** contain a small looping CSS/SVG animation (no video): AI Automation = boxes connected by a line with a dot travelling along it; AI Agents = 5 nodes with pulsing connections. Each ≤ 40 lines of SVG/CSS.
- Mobile: single column, large cards first; tag chips scroll horizontally (snap).

### 7.5 Proof strip (new) `[AGENT BUILDS]` layout, `[OWNER PROVIDES]` data

Purpose: give visitors something to believe. Because the work is internal builds, proof is **product-based and honest**.

Contents (each renders only if its data exists in `/content/proof.ts`):

1. **Counters (3–4):** real numbers only, e.g. products shipped, technologies used, years building, public repositories. Animated count-up once when 40% visible. Each number needs a source in the data file (a comment is enough).
2. **Tech-stack marquee:** logos from the `simple-icons` package (Next.js, React, Python, Node.js, TypeScript, PostgreSQL, Supabase, OpenAI, Flask, etc.), monochrome, turning yellow on hover. Two rows moving in opposite directions, slow.
3. **Testimonial slot:** hidden unless at least one real testimonial (name, role, quote, optional photo) exists.
4. **Client logos row:** hidden unless real logos exist. Do **not** add placeholder logos.

### 7.6 Selected creations — work stack `[AGENT BUILDS]` layout, `[OWNER PROVIDES]` media

- Keep the heading "Ideas with somewhere to go." and the honest note that these are internal / R&D builds.
- **Sticky stacking cards:** each project is a large panel (~85vh). As the next panel scrolls in, the previous one scales to 0.94 and dims to 60% (ScrollTrigger scrub). Use `position: sticky`, no pinning libraries needed beyond ScrollTrigger.

```
┌────────────────────────────────────────────────────────────────┐
│ ChatConnect AI                        ┌──────────────────────┐ │
│ WhatsApp automation for support       │ browser/device frame │ │
│ and lead handling                     │ looping screen video │ │
│ Outcome line (one sentence, real)     │ (muted, 10–20 s)     │ │
│ [React] [Express] [PostgreSQL]        └──────────────────────┘ │
│ [View case study]   [GitHub ↗]                                 │
└────────────────────────────────────────────────────────────────┘
```

- Projects (keep current copy from the site): ChatConnect AI, Drex AI Assistant, Iqra School Management System.
- Media per project `[OWNER PROVIDES]`: one looping screen recording (`.webm` + `.mp4`, ≤ 3 MB, 1280×720, no audio) and one poster image (`.webp`). Until provided: a static screenshot inside the frame.
- Videos: `preload="none"` until near viewport, `autoplay muted loop playsinline`, paused when off-screen (IntersectionObserver).
- Cursor shows "View" over the panel. Whole panel links to `/work/[slug]` (stub until Phase 4; fall back to GitHub link).
- Add a one-line **result** per project `[OWNER PROVIDES]` (what it does, in plain numbers or facts that are true).

### 7.7 Process — timeline `[AGENT BUILDS]`

The four steps (Discover, Design, Build, Launch) are a real sequence, so numbers stay here.

- Vertical timeline, large numerals on the left, content right. A 2px line runs down the left; it **draws itself** as the user scrolls (SVG `stroke-dashoffset` scrubbed by ScrollTrigger). The active step's numeral turns yellow and its text goes to full opacity; inactive steps sit at 40% opacity.
- Under each step add a small "You get:" chip `DRAFT COPY` (e.g. "a scoped brief", "a clickable prototype", "weekly demo builds", "production hand-off and support").
- Keep existing step descriptions.
- Mobile: the line moves to the far left edge; numerals shrink.

### 7.8 Why Drexa — yellow inverted section `[AGENT BUILDS]`

This is the rhythm breaker: **full-bleed yellow background, near-black text.**

- Left column (sticky on desktop): heading "Built around outcomes. Not just code." plus the existing paragraph.
- Right column: three statements (keep existing copy: "AI that actually works", "Small team. Direct communication.", "Built for the long term"). **No numbers.** Each is a large statement with a short line under it, separated by 1px dark rules.
- Transition: the section's background wipes in from a circle/clip-path expanding from the cursor-side edge as it enters (ScrollTrigger, once). Text remains readable at every frame.
- Ensure contrast: dark text on yellow ≥ 7:1.

### 7.9 Team / About (new) `[OWNER PROVIDES]` content

The nav promises "Our Team" and "About", so this section must exist.

```
┌──────────────────────────────────────────────────────────┐
│ ┌────────────┐   Name                                    │
│ │  portrait  │   Role — Founder, Drexa                   │
│ │ B/W, yellow│   3–4 sentence honest story               │
│ │ on hover   │   [GitHub] [LinkedIn] [Email]             │
│ └────────────┘                                           │
│  How we work:  ▸ fact 1   ▸ fact 2   ▸ fact 3            │
│  Certifications (verifiable badges only, with links)     │
└──────────────────────────────────────────────────────────┘
```

- Support 1–N team members from `/content/team.ts`. With one person, lay it out as a **founder-led** section (portrait left, story right). With more, use a grid.
- Portrait: grayscale by default, yellow duotone on hover (CSS `mix-blend-mode` or filter). If no photo is provided, render initials in a large monogram (never a stock photo).
- "How we work": three short factual statements `[AGENT DRAFTS → OWNER APPROVES]`.
- Certifications: show only ones the owner supplies with a verification URL.
- Tone: first-person plural or singular, honest, specific. No buzzwords.

### 7.10 Live AI demo (new)

See Section 10 for the full spec. Placement: after the team section, before the FAQ. Heading `DRAFT COPY`: "Talk to an agent we built."

### 7.11 FAQ `[AGENT BUILDS]`

- Keep the six existing questions and answers.
- Accordion: one open at a time, smooth height animation (CSS `grid-template-rows: 0fr → 1fr` or Framer Motion), plus/minus icon rotates. Fully keyboard accessible (`button` with `aria-expanded`, `aria-controls`).
- Add `FAQPage` JSON-LD structured data generated from the same content array.
- Layout: heading left (sticky on desktop), accordion right.

### 7.12 Contact + booking `[AGENT BUILDS]` / `[OWNER PROVIDES]` keys

Two columns.

- **Left:** heading "Have an idea? Let's build it." Text: free 30-minute consultation. Buttons: "Book a call" (opens inline Cal.com/Calendly embed or links to it — `[OWNER PROVIDES]` the booking URL), "Message on WhatsApp" (`wa.me` link, `[OWNER PROVIDES]` number), and email link. Keep the small reassurance line ("No obligation, practical recommendations").
- **Right:** the project brief form. Fields: Name, Email, Budget range (custom accessible select), Project description (textarea). Validation with `zod` + `react-hook-form`; inline error messages in plain language; honeypot field for spam; disabled state while sending; success state replaces the form with a confirmation and "what happens next".
- Submission: Next.js route handler `/api/contact`. Send the email via a provider the owner chooses (`[OWNER PROVIDES]` API key in `.env.local`: e.g. Resend free tier) **or** save to a database the owner already uses. Add basic rate limiting (5 requests / 10 min / IP). Never expose keys client-side.
- Fix the clipped email placeholder (Section 2, rule 8).

### 7.13 Footer `[AGENT BUILDS]`

- Columns: Explore (Work, Services, About, Contact), Contact (email), Social (GitHub and other real links), Legal (Privacy, Terms — stub pages OK).
- Below: a **giant "DREXA." wordmark** spanning the full container width, cropped by the bottom edge (about 60% visible). Yellow glow follows the cursor over it (radial gradient mask). Scales on mobile.
- "Back to top" button with smooth scroll.
- Copyright line.

---

## 8. 3D system

### 8.1 Three tiers (build in order; stop when the owner is happy)

| Tier | What | Needs owner's file? |
|---|---|---|
| **A — Procedural (default, Phase 3a)** | Scene built entirely in code: extruded Drexa logo mark (from the SVG via `SVGLoader` + `ExtrudeGeometry`) in polished yellow metal, plus subtle orbiting thin rings and a particle field | Only the **logo as SVG** |
| **B — GLB object (Phase 3b)** | A single hero object exported as `.glb` (AI-generated or made in Blender), swapped in for the logo mark | Yes: `/public/models/hero.glb` |
| **C — Custom model** | Higher-end custom or purchased model, same slot as B | Yes |

**Architecture requirement:** create `HeroScene.tsx` with a `HeroObject` component that **loads `/models/hero.glb` if it exists, otherwise renders the Tier A procedural object**. Swapping in a model must require **zero code changes** — only dropping the file in `/public/models/`.

### 8.2 Scene spec

- **Canvas:** `@react-three/fiber` `<Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: true, powerPreference: 'high-performance' }}>`.
- **Loading:** `next/dynamic(() => import('./HeroScene'), { ssr: false })` — in Next 16 this call must live inside a `'use client'` wrapper component (e.g. `HeroCanvas.tsx`), which the server component then imports. Render a **static poster image** (`/images/hero-poster.webp`) first, then cross-fade to the canvas when ready. The poster is also the reduced-motion and low-power fallback.
- **Lighting:** local HDRI `/public/hdr/studio.hdr` via `<Environment files="/hdr/studio.hdr" />` (`[OWNER PROVIDES]` or agent downloads a free CC0 studio HDRI from Poly Haven and commits it), one soft yellow rim light from the back-right, intensity low. No shadows on mobile.
- **Material for the hero object:** `MeshStandardMaterial` (or `MeshPhysicalMaterial` with `clearcoat: 1`) with `color: var(--accent)`, `metalness: 1`, `roughness: 0.18`, `envMapIntensity: 1.2`. For a GLB: **override the material in code** (traverse the scene, replace materials) so the object always matches the brand regardless of how the file was textured. Keep an option to preserve the original textures via a boolean prop.
- **Idle motion:** slow float (drei `<Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>`).
- **Pointer interaction:** object rotation follows the pointer with damping (`lerp` factor ~0.08), max ±0.35 rad on each axis. On touch devices use device tilt only if permission is already granted; otherwise idle motion only.
- **Scroll interaction:** see Section 7.2 (scrubbed rotate + scale as the hero exits).
- **Post-processing (desktop only, optional):** very subtle bloom on the yellow. Skip on mobile or if FPS drops.
- **Quality scaling:** use drei `<PerformanceMonitor>`; on decline, lower `dpr` to 1 and disable bloom.
- **Pause when not visible:** `frameloop="demand"` when the hero is out of view (IntersectionObserver) and when the tab is hidden.
- **Draco/meshopt:** call `useGLTF.setDecoderPath('/draco/')` and copy the decoder files into `/public/draco/` (do not rely on the default CDN decoder).
- **Low-power fallback:** if `navigator.hardwareConcurrency < 4`, `navigator.deviceMemory < 4` (when available), a WebGL context cannot be created, or reduced motion is on → show the poster only.
- **Errors:** wrap the canvas in an error boundary; on any failure show the poster and log to console. The hero must never appear broken.

### 8.3 Requirements for the GLB the owner supplies (`/public/models/hero.glb`)

- Single object, centered at the origin, facing +Z, scale roughly 1–2 units tall.
- ≤ 100,000 triangles; file ≤ 2 MB after Draco/meshopt compression; textures ≤ 2048 px (WebP/KTX2 preferred).
- No cameras, lights or animations required. Node names should be readable.
- The agent should, on first load, log the model's bounding box and auto-fit/auto-center it (`<Bounds>` or manual normalisation) so imperfect exports still look right.
- If the model is off-center, wrongly scaled or too heavy, **fix it in code where possible** and tell the owner what to fix in the file otherwise.

### 8.4 Other allowed 3D touches (small, optional, Phase 5)

- Tiny 3D icon per large service card (only if the hero is done and FPS is healthy). Prefer CSS/SVG.
- Never run more than **one** WebGL canvas visible at a time.

---

## 9. Asset manifest

| File / data | Path | Who | Status |
|---|---|---|---|
| Logo as SVG (mark + wordmark) | `/public/brand/logo.svg`, `/public/brand/mark.svg` | Owner | needed for Tier A |
| Hero GLB (optional, Tier B/C) | `/public/models/hero.glb` | Owner | optional |
| Hero poster image | `/public/images/hero-poster.webp` | Agent (screenshot of canvas) | agent generates after Phase 3a |
| Studio HDRI | `/public/hdr/studio.hdr` | Agent downloads CC0 (Poly Haven) or owner | needed |
| Draco decoder | `/public/draco/*` | Agent copies from `three/examples/jsm/libs/draco` | needed |
| Founder portrait | `/public/team/*.webp` | Owner | needed for 7.9 |
| Project screen recordings + posters | `/public/work/[slug].webm/.mp4/.webp` | Owner | needed for 7.6 |
| Real numbers for proof | `/content/proof.ts` | Owner | needed for 7.5 |
| Testimonials (if any) | `/content/proof.ts` | Owner | optional |
| Booking URL, WhatsApp number, contact email | `/content/site.ts` | Owner | needed for 7.12 |
| Email provider API key / AI provider API key | `.env.local` | Owner | needed for 7.12 / 10 |

Create `/docs/TODO_OWNER.md` in Phase 0 and keep it updated: a checklist of everything above still missing, in the order it blocks work.

---

## 10. Live AI demo spec

**Purpose:** proof that Drexa actually builds working AI, not just describes it.

- **UI:** a chat card in a device/browser frame. A header with the agent name, a message list, an input, three suggested-prompt chips ("What can Drexa build for my business?", "How does a project work?", "Book a call"). Streaming text output, typing indicator, auto-scroll, Enter to send.
- **Behavior:** the agent is limited to Drexa's services, process, and booking. It answers briefly, does not invent prices or claim clients, and offers the booking link or brief form when the visitor shows intent. It can collect a name and email and hand off to the contact form.
- **Backend:** route handler `/api/demo` calling a provider the owner already uses on a free tier (Gemini, Groq or OpenRouter — `[OWNER PROVIDES]` key in `.env.local`). Put the provider behind a small adapter so it can be swapped.
- **Protection:** server-side system prompt; max input 500 chars; max output tokens ~300; rate limit (e.g. 10 messages per 10 minutes per IP); daily cap; refuse prompt-injection attempts to reveal instructions or keys; never send keys or the system prompt to the client.
- **Fallback:** if the API errors, is rate-limited or the key is missing, show a friendly message and a **pre-scripted conversation replay** so the section never looks broken.
- **A11y:** messages in an `aria-live="polite"` region; input labelled; suggested prompts are buttons.
- **Disclaimer line:** "This is a demo agent. Don't share sensitive information."

---

## 11. Performance, accessibility, SEO — acceptance criteria

**Performance (mobile, throttled)**

- LCP ≤ 2.5s (LCP element = hero heading or poster, **not** the canvas), CLS ≤ 0.1, INP ≤ 200ms.
- Initial JS for the home route: keep the 3D bundle (`three`, R3F, drei, GLB) **out of the initial bundle** (dynamic import).
- Images through `next/image` with proper `sizes`; hero poster gets `priority`. Videos lazy.
- 60fps on desktop, ≥ 30fps on mid-range mobile, or fall back to the poster.

**Accessibility**

- Lighthouse a11y ≥ 95. Keyboard-only walkthrough works for nav, accordion, form, demo, cursor-independent.
- `prefers-reduced-motion`: no parallax, no marquee movement, no preloader, no 3D (poster), no count-up animation.
- All non-decorative images have alt text; decorative SVG/canvas are `aria-hidden`.

**SEO**

- Per-page metadata and Open Graph image; semantic headings (one `h1`); `FAQPage` and `Organization` JSON-LD; sitemap and robots; descriptive link text.

---

## 12. Build phases

Work **one phase per session**. After each phase: build + lint + typecheck pass, screenshots at 390 / 768 / 1440, summary, and **wait for owner approval**.

### Phase 0 — Audit and foundation (small)
- [ ] Read the repo; list existing components and content; write `/docs/AUDIT.md` (what exists, what is reused).
- [ ] Install allowed dependencies (Section 2). Confirm fonts load without Google.
- [ ] Add tokens to Tailwind config; create shared `Container` and `Section` components (isolation rules from Section 5).
- [ ] Move copy into `/content/*.ts`.
- [ ] Create `/docs/TODO_OWNER.md` and `/docs/DECISIONS.md`.
- [ ] Fix the clipped email placeholder.
- **Gate:** site looks the same as before (plus the bug fix); build passes.

### Phase 1 — Fill the emptiness (structure and content)
- [ ] Hero layout fix: CTAs above the fold, tracking, subhead contrast, shared container; remove random cube/labels and the old robot image (leave a temporary poster).
- [ ] New sections: Proof strip (7.5), Team (7.9), Footer with wordmark (7.13).
- [ ] Contact + booking + form handling (7.12).
- [ ] Section rhythm: yellow Why Drexa (7.8), remove numbering from services and Why Drexa.
- **Gate:** page feels complete and varied with **zero** animation added yet; all placeholders listed in TODO_OWNER.

### Phase 2 — Motion and depth
- [ ] Lenis + GSAP setup, preloader, grain, scroll progress, custom cursor, magnetic CTA.
- [ ] Hero load sequence (7.2).
- [ ] Services bento with spotlight and mini-animations (7.4).
- [ ] Work sticky stack with video frames (7.6).
- [ ] Process timeline with drawing line (7.7).
- [ ] Ticker polish (7.3), FAQ accordion (7.11).
- **Gate:** smooth at 60fps on desktop; reduced-motion mode verified; no section overlap.

### Phase 3 — 3D hero
- [ ] **3a:** procedural logo-mark scene with Environment, pointer + scroll interaction, poster fallback, error boundary, performance monitor (Section 8).
- [ ] **3b:** GLB slot: load `/models/hero.glb` when present, auto-fit, material override, compression check.
- [ ] Generate `/images/hero-poster.webp` from the final scene.
- **Gate:** LCP unaffected by 3D; mobile fallback works; swapping the GLB needs no code change.

### Phase 4 — AI demo, case studies, SEO
- [ ] Live AI demo (Section 10).
- [ ] `/work/[slug]` case-study template (problem, approach, stack, result, media, next project) and `/services/[slug]` stub template.
- [ ] Metadata, OG images, JSON-LD, sitemap.
- **Gate:** all internal CTAs resolve to real pages; demo has working fallback.

### Phase 5 — QA and polish
- [ ] Lighthouse mobile + desktop; fix issues.
- [ ] Cross-browser check (Chrome, Safari, Firefox), real-device check for iOS/Android.
- [ ] Keyboard-only and screen-reader smoke test.
- [ ] Remove unused code, check bundle size.
- [ ] Update `/docs/TODO_OWNER.md` with the final list of still-missing real content.

---

## 13. Definition of done and hard "don'ts"

**Done means:** every acceptance criterion in Section 11 passes; every section in Section 7 exists at all breakpoints; no console errors; no layout shift on load; nothing overlaps between sections; the owner can replace content and swap the GLB without touching component code.

**Do not:**
- invent proof (logos, testimonials, numbers, awards, team members)
- use Google Fonts or other third-party CDNs for critical assets
- add fade-up and hover-lift to every element
- number things that are not a sequence
- run more than one WebGL canvas at once
- ship anything that only looks right at 1440px
- add libraries outside the allowed list without asking