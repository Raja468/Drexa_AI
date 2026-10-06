# Drexa AI website polish and completion handoff

## Context

The previous Manus run did not perform the polish task. It failed to read the attachment because of a path error and the terminal was unavailable. Do not treat the previous run's "task completed" report as completion.

Read this file from the repository before starting. Do not rely on an attached prompt. Use the repository copy of `docs/Drexa-Website-Master-Spec.md` as the source of truth for the master specification.

## Required execution order

1. Perform the requested design polish first, using the complete polish checklist supplied by the owner in the chat. Do not skip or reinterpret any of polish items 1–14.
2. After the design polish is complete, finish the remaining master-spec items in this exact order:
   - Three case-study pages under `/work`:
     - `/work/chatconnect-ai`
     - `/work/drex-ai-assistant`
     - `/work/iqra-school-management`
   - Full `/services` overview content
   - `/work` list page
   - `/about`
   - `/contact`
   - `og.png` at 1200x630 with a white background, logo, and tagline
   - JSON-LD for `ProfessionalService` and `FAQPage`
   - `sitemap.ts`
   - `robots.ts`
3. Use the exact copy from `docs/Drexa-Website-Master-Spec.md`. Do not invent prices, client claims, testimonials, metrics, founder photography, or links marked as owner-provided.
4. Run `npm run build` after each page or page group. If the terminal is unavailable, start a new terminal session or wait and retry. Do not claim completion without a successful build result or a clearly documented environment failure.
5. At the end, freeze the site for review. Publishing and Search Console submission are follow-up deployment actions and must not be claimed as completed unless actually performed.

## Known remaining items from the previous report

The previous run reported these as still missing:

- Three case-study pages
- Full services overview content
- Founder photo
- `og.png`
- SEO and schema refinements

The founder photo remains an owner-provided asset. Keep a clearly labelled placeholder until the owner supplies the real photo.

## Completion standard

The work is complete only when:

- Polish items 1–14 are implemented and verified.
- The remaining master-spec pages and SEO files above are implemented.
- TypeScript, lint, and production build have been run.
- Any failed validation includes the exact command and error rather than being reported as success.
- No banned visual treatments from the master spec are reintroduced: neon, glow, glassmorphism, blur, grain/noise, gradients, dark blue/navy, particles, 3D blobs, robot/brain/circuit stock art, marquees, per-load preloaders, scroll-jacking, giant uppercase headlines, parallax, or cursor effects.
