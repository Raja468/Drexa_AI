# Design polish progress

Branch: `design-polish`

## Done

**Polish items**
- Item 1 — Typography (self-hosted Manrope/Inter/Instrument Serif/JetBrains Mono, hero H1 72/40, mono labels)
- Item 2 — Hairline structure (sticky `NN / Title` rail, numbering 01–06, vertical hairlines)
- Item 4 — Hero (browser-frame dashboard, phone conversation, mono caption, closing hairline line)

**Gaps 1–5** (deficiencies found while auditing items 1, 2, 4)
- Gap 1 — Instrument Serif on 4 headings: hero `run better.`, Services `One team.`, Work `built.`, Founder `Raja.`
- Gap 2 — all H2 to 44px desktop / 28px mobile, tracking `-0.02em`
- Gap 3 — `border-x` moved from the full-width `<section>` to the inner `max-w-[1440px]` container
- Gap 4 — hero conversation animation rewritten in own CSS in `app/globals.css`
- Gap 5 — `overflow-x-clip` on the hero grid

**1024px overflow fixes**
- Work rows on `/` and `/work`: `min-w-0` on image column, `lg:p-24` → `lg:p-16`, text column `lg:w-[400px]` → `lg:w-[360px]`
- Founder row on `/about`: `lg:p-24` → `lg:p-12`, stacks until `xl`, photo column `xl:w-[320px]`, text `min-w-0`

Commits: `7fafa45` → `86b93fd` → `a694487` → `8414b25` → `32fe5e6` → `d51420c` → `9762f6a`

## Next

1. **Item 3** — Services section: replace 2x2 icon cards with 4 full-width hairline rows (blocked until explicitly started)
2. **Items 5–14** in order — trust strip, process, work, why-Drexa, tools strip, founder, FAQ, micro-details, rhythm, performance
3. **Remaining pages** — 3 case study pages under `/work`, full `/services` overview, `/work` list page, `/about`, `/contact`, `og.png`, JSON-LD, `sitemap.ts`, `robots.ts`

## Verification status

- `npm run build` — PASS (23/23 static pages)
- `npx tsc --noEmit` — **0 errors**
- Widths: 8 pages × 6 widths (360, 390, 768, 1024, 1440, 1920) — **0 overflows**
  - Pages: `/`, `/services`, `/work`, `/work/chatconnect-ai`, `/work/drex-ai-assistant`, `/work/iqra-school-management`, `/about`, `/contact`

## Notes

- **Widths: use Chrome CDP only.** `Emulation.setDeviceMetricsOverride` + `Page.captureScreenshot`. Do **not** use `--window-size` — Chrome enforces a minimum window width, so those images are a wider layout cropped to the requested size and look like overflow when there is none.
- **`npx tsc --noEmit` error count: 0.** Note `next build` prints `Skipping validation of types`, so a passing build alone does not prove type-correctness — run `tsc` separately.
- **Open:** the Edge Runtime deprecation warning on `/api/contact` and `/opengraph-image` (static generation is disabled for those routes). Not yet resolved.
- **Open:** the hero dashboard screenshot is cropped at the right edge and its stats show an empty state (`0`, `0`, `0`, "No recent conversations"). Item 4a asks for the shot "fully visible, nothing clipped" and item 7 for "no empty states" — needs a real demo-data screenshot.
- **Working style:** one simple command per tool call — no chaining, no pipes, no heredocs.
- **One commit per item** (or per gap), built and verified before committing.
- **Forward slashes in paths** (`app/globals.css`, not `app\globals.css`).
- Port 3000 is already occupied by a running dev server; a separate `next start` fails with `EADDRINUSE`.
