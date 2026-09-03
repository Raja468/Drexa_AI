# Drexa AI — Marketing Site

Production-quality marketing site for [Drexa AI](https://drexa.ai), a multi-service tech agency (AI / LLM, web & software, cybersecurity).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-based config via `@theme`)
- **Framer Motion** for animation
- **Lucide** icons
- **Resend** for the contact form (Node runtime)

## Develop

```bash
npm install
cp .env.local.example .env.local   # optional, only for email
npm run dev                        # http://localhost:3000
```

Without `RESEND_API_KEY` the contact form runs in dev mode (logs to the server console) so the UI is fully testable locally.

## Build

```bash
npm run build
npm run start
```

## Structure

```
app/
  layout.tsx          # Root layout, fonts, MotionConfig
  page.tsx            # Home: composes all sections
  services/           # /services, /services/[slug]
  work/               # /work, /work/[slug]
  about/              # /about
  contact/            # /contact (full-page form)
  api/contact/        # Resend handler
components/
  ui/                 # Re-skinned primitives (Button, Input, Select)
  nav/                # Header, Footer, Logo
  motion/             # Reveal, Stagger
  layout/             # Section, Eyebrow
  sections/           # Hero, Services, Work, Process, Contact, Trust
  terminal.tsx        # Animated typing proof object
content/              # Typed site copy: site.ts, services.ts, work.ts
lib/utils.ts          # cn() helper
```

## Design

Dark technical / operator lane. Custom amber accent (no AI-template blue-violet gradient), editorial serif display, mono everywhere else. All design tokens live in `app/globals.css` under `@theme inline`.

## License

Private — © Drexa AI.
