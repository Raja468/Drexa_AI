# Phase 0 Audit — Drexa AI website

Date: 2026-09-19 · Branch: `main` · Auditor: agent (Phase 0, per `Drexa-design-brief.md` §12)

## 1. Stack (as found)

| Layer | Actual | Brief assumes | Consequence |
|---|---|---|---|
| Next.js | **16.3.3** (App Router) | Next 14 | AGENTS.md flags breaking changes; docs in `node_modules/next/dist/docs/` were checked. No Phase 0 surface changed. |
| React | **19.2.8** | React 18 | `@react-three/fiber@^8` peer-requires React 18 and cannot run here — see `docs/DECISIONS.md` D1. |
| Tailwind | **v4.3.3** (CSS-first, `@theme` in `app/globals.css`) | `tailwind.config` file | Tokens go in `@theme static`; there is no config file to extend. |
| Framer Motion | 13.1.1 | Framer Motion | OK. |
| Other deps | class-variance-authority, clsx, lucide-react, resend, tailwind-merge, zod 4 | — | OK. |
| 3D | **not installed** | — | Installed in Phase 0 (three + fiber + drei), see DECISIONS D1. |

The brief's Section 2 wording ("these versions match React 18 / Next 14 — do not install fiber v9") is premised on a Next 14 / React 18 repo. That premise does not hold in this codebase.

## 2. Routes

- `/` — composed from section components, copy via `content/home.ts`
- `/work`, `/services`, `/about`, `/team`, `/contact` — page components (see §4 for copy location)
- `not-found.tsx`, `sitemap.ts`, `robots.ts`, `favicon.ico`, `icon.svg`
- `POST /api/contact` — Resend integration; logs to console when `RESEND_API_KEY` is absent (dev mode). No rate limiting yet (Phase 1, §7.12).

## 3. Components (all reused, nothing torn down)

- **layout**: `Navbar`, `Footer`, `PageHero`
- **sections**: `hero`, `capabilities` (8 flip cards), `work` (project cards), `approach` (process numerals), `why-drexa` (sticky stack), `faq` (accordion), `contact`, `CtaBanner`
- **ui**: `Button`, `Card`, `ContactForm`, `Container`, `Highlight`, `LogoMark`, `NoiseTexture`, `SectionHeader`, `StatNumber`
- **motion**: `FadeUp` / `StaggerContainer` / `StaggerItem`, `Marquee`, `MarqueeBand` (reduced-motion aware)
- `lib/motion.ts` (shared easing), `lib/utils.ts` (`cn`)
- `verify.ps1` — content + design-integrity smoke test against `.next/server/app/index.html`; kept as part of validation.

## 4. Content state

Centralized in `/content`: `home.ts` (hero, ticker, capabilities, work, approach, why, faq, contact), `services.ts`, `work.ts`, `about.ts`, `nav.ts`, `site.ts`. Home page, work page, and about/services hero+CTA already render from content.

**Hard-coded copy still in pages (moved to `/content/*.ts` in Phase 0, verbatim):**

- `app/contact/page.tsx` — hero, direct-lines column, what-to-expect list, service options, budget ranges, contact FAQs
- `app/team/page.tsx` — hero, 4 team members, principles, CTA
- `app/services/page.tsx` — 8 service items + engagement models (drifts slightly from `content/services.ts`; page copy is the live copy)
- `app/about/page.tsx` — stats, narrative paragraphs, convictions, stack groups (drifts slightly from `content/about.ts`; page copy is the live copy)

Icons are mapped by `slug`/key inside components; content files stay pure data.

## 5. Design tokens (Section 4 vs reality)

Already present in `@theme static`: background `#09090b`, foreground `#fafafa`, muted-foreground `#a1a1aa`, border `#3f3f46`, accent `#dfe104`, accent-foreground `#000`, fluid `text-display`/`text-mega`/`text-numeral-*`, easing `--ease-out-expo` (matches the brief's cubic-bezier), reduced-motion global kill switch, `focus-visible` yellow outline.

**Missing / added in Phase 0 (extend, not replace):** `--color-surface-1`, `--color-surface-2`, `--color-line` (rgba(255,255,255,.10)), `--color-danger`, `--color-success`. Brief's `--text`/`--text-muted` map onto the existing `foreground`/`muted-foreground` — kept as-is (brief: "use the values already in tailwind config where they exist").

Shared `Container` exists (max-w 1360px). Brief's 1280px is a spec deviation; existing value kept. **`Section` is new in Phase 0** — wraps sections with `relative isolate overflow-clip` (Section 5.2 isolation rules) without imposing padding.

## 6. Fonts (Section 2 rule 3 — violation found)

`app/layout.tsx` uses `next/font/google` for **Space Grotesk** (display) and **Geist Mono** (mono). No font files exist in the repo; everything is fetched from Google at build time. Phase 0 switches both to `next/font/local` with self-hosted variable `.woff2` files under `app/fonts/` — same faces, same rendering, zero Google dependency at build or runtime.

## 7. Known bugs

- **Email placeholder clipped** (Section 2 rule 8): `ContactForm.tsx` already uses the string `you@company.com`, but the `FIELD` class applies `placeholder:uppercase placeholder:font-bold` at `text-2xl`/`md:text-3xl`, so it renders as `YOU@COMPANY.C` and clips in the half-width column. Fix: render the placeholder in normal case and drop the forced bold, per the brief's stated fix.

## 8. Placeholders / owner-inputs found

- Team page lists 4 members with bios — owner must confirm these are real before the Phase 1 team section (7.9) ships.
- `content/work.ts` "Enterprise RAG Intelligence" is labelled "Architecture concept" and links to the GitHub profile root, with `/hero.png` as its image.
- WhatsApp number, email, and Resend key: present/absent as per `.env`; no booking URL yet (7.12, Phase 1).

## 9. Reuse plan

Everything existing is kept. Phase 0 adds only: tokens, `Section`, content extraction for the four pages above, self-hosted fonts, the placeholder fix, and the 3D dependencies. No visual change other than the email placeholder fix.
