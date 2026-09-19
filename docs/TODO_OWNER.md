# Owner inputs still missing — Drexa AI website

Live checklist of everything the brief marks `[OWNER PROVIDES]` that is still
missing, ordered by what blocks work next. Phase 0 additions first.

## Blocking Phase 2

- [ ] **Team confirmation (§7.9):** `/team` currently lists 4 members (Raja,
      Hamza Tariq, Ayan Malik, Zain Ahmed) with roles/bios authored in code.
      Confirm every person, role and bio is real. The home founder section
      (§7.9) additionally ships **DRAFT COPY** (story + "How we work" facts in
      `content/team.ts` `founder`) that needs owner approval before it is
      treated as final.
- [ ] **Founder portrait (§7.9):** `/public/team/raja.webp` (grayscale source
      is fine). The section renders a monogram "R" until it exists.
- [ ] **Booking URL (§7.12):** Cal.com / Calendly link. Set
      `bookingUrl` in `content/site.ts` — the "Book a call" button renders
      nothing (no fake link) until then; WhatsApp stays primary.
- [ ] **Legal text (§7.13):** real Privacy Policy and Terms copy for
      `/privacy` and `/terms` (honest stubs ship today).
- [ ] **WhatsApp number as a single source:** `wa.me/923715082737` is correct
      and already used site-wide; confirm it stays the primary CTA.
- [ ] **Email provider key (§7.12):** `RESEND_API_KEY` in `.env.local`
      (route handler exists and logs to console in dev without it). Add
      `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL` if non-default. Rate limiting
      is in-memory per server instance — say the word if you want a shared
      store (Upstash) instead.

## Blocking later phases

- [ ] **Proof-strip data (§7.5):** the counters that ship today
      (3 products / 30+ technologies / 100% IP / 24h reply) are derived from
      this repository's own content files — confirm each claim reads true to
      you, and supply real `years building` / repository counts if you want
      them added. Nothing else renders until data exists — no invented numbers.
- [ ] **Testimonials (§7.5, optional):** name, role, quote, optional photo.
      Section stays hidden until at least one real one exists.
- [ ] **Client logos (§7.5, optional):** none exist; row stays hidden.
- [ ] **Project media (§7.6):** per project (ChatConnect AI, DREX AI
      Assistant, Iqra SMS): looping screen recording `.webm` + `.mp4`
      (≤ 3 MB, 1280×720, silent) + poster `.webp`. Static screenshots in use
      until then. Also a one-line **result** per project, in plain facts.
- [ ] **Logo as SVG (§8/asset manifest):** `/public/brand/logo.svg` and
      `mark.svg` — required for the Tier A procedural 3D hero.
- [ ] **Studio HDRI (§8.2):** `/public/hdr/studio.hdr` — agent can fetch a CC0
      Poly Haven file; owner preference on which one is welcome.
- [ ] **Hero GLB (§8, optional):** `/public/models/hero.glb` — Tier B/C slot;
      drops in with zero code changes once the Phase 3 loader exists.
- [ ] **AI demo provider key (§10):** Gemini / Groq / OpenRouter key in
      `.env.local` for `/api/demo`; scripted fallback ships regardless.
- [ ] **`content/work.ts` "Enterprise RAG Intelligence":** labelled
      "Architecture concept", links to the GitHub profile root, uses
      `/hero.png` as its image — confirm it stays listed (and with real media)
      or is dropped.
