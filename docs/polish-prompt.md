# Drexa design polish: full prompt (items 1-14 + remaining pages)

Task: raise design quality of drexa.tech so it stops looking like an AI template. Keep same copy, same colors, same pages. Change layout craft and typography only. Execute items 1-14 in order. Do not invent requirements. If anything is missing, stop and ask.

## Setup
- Run `git checkout -b design-polish`. Commit current state first.
- Work one section at a time. After each, run `npm run build`, fix errors, show screenshot.

## HARD BANS
neon, gradients, blur, glow, glassmorphism, grain/noise, 3D, orbs, particles, stock photos, AI-generated images, Pinterest images, fake stats, fake logos, fake testimonials, Next.js dev badge in production.

## 1) TYPOGRAPHY
- Keep Manrope for headings, Inter for body.
- Add Instrument Serif (italic only) for ONE emphasized word per headline, e.g. "Technology that helps your business <em>run better.</em>". Use on hero + 3 other headings only.
- Add JetBrains Mono for labels: eyebrows, tags, section numbers, small metadata. 12-13px, uppercase, letter-spacing 0.06em.
- Self-host all fonts with next/font/local. No Google Fonts links.
- Hero H1: 72px desktop / 40px mobile, weight 800, letter-spacing -0.03em, line-height 1.02.
- H2: 44px desktop, letter-spacing -0.02em.
- Body 18px, color #54585F, max width 60ch.

## 2) HAIRLINE STRUCTURE (brand signature)
- Replace floating cards with hairline structure. 1px #E4E4DF lines between sections and rows. Container shows two faint vertical hairlines at left and right edge on desktop.
- Section header pattern: left column holds sticky mono label "01 / Services" (position: sticky; top: 96px), right column holds content.
- Numbering on home: 01 Services, 02 Process, 03 Work, 04 Approach, 05 Founder, 06 FAQ.

## 3) SERVICES SECTION: no more 2x2 icon cards
- 4 full-width rows separated by hairlines. Each row: big mono number (01-04), service name 32px, 2-line description, mono tag list, arrow icon on right.
- Hover: row bg #F6F6F3, name shifts 8px right (transform 150ms), arrow moves 4px, accent underline grows under name. No shadows.
- Remove tinted icon squares everywhere on the site.

## 4) HERO: product alive, not static
- Right side: layered composition built in code.
  a) Browser-frame dashboard (real screenshot WITH demo data, fully visible, nothing clipped).
  b) Phone frame overlapping bottom-left of dashboard, showing WhatsApp-style conversation in HTML/CSS: customer asks price and timing, bot answers, then "Handed to a human agent" label.
  c) Conversation plays once on load: messages appear one by one, 600ms gap, typing dots between. CSS animation only. Respect prefers-reduced-motion (show all instantly).
- Mono label under it: "Demo conversation. ChatConnect AI."
- Flat: 1px borders, radius 12-16px, no tilt, no glow. Only shadow allowed: 0 1px 2px rgba(22,24,29,.06).
- 1px hairline under hero with mono line: "Independent studio / Islamabad, Pakistan / Working worldwide".

## 5) TRUST STRIP
- Single row of 4 items separated by vertical hairlines, no icons, mono label on top, short text below.
- Content:
  - DIRECT COMMUNICATION / No account managers
  - YOU OWN EVERYTHING / Code, designs, documentation
  - FIXED SCOPE / Agreed before work starts
  - SECURITY BUILT IN / Not added at the end

## 6) PROCESS
- Horizontal 4 columns separated by vertical hairlines. Large numerals Manrope 800, 64px, color #E4E4DF. Step title and text dark below. Thin 1px line with 4 small dots connecting steps at top.
- Content:
  - 01 Discover: We learn your business, your goals, and your limits before suggesting anything.
  - 02 Design: We define the solution and show you a clear plan or prototype you can react to.
  - 03 Build: We build in short cycles and show you progress regularly.
  - 04 Launch & support: We deploy, test, hand over everything, and stay available after launch.

## 7) WORK SECTION
- Three projects as large alternating rows (image left/text right, then reverse), not small thumbnails.
- Each: screenshot 16:10 in browser frame, name, 2-sentence description, mono stack tags, "Internal build" label, links "Read case study" and "GitHub".
- Screenshots sharp, at least 1600px wide, filled with demo data, no empty states, nothing cropped at edge. object-fit: cover; object-position: top.

## 8) WHY DREXA SECTION
- Replace three plain text columns with dark statement block (only mid-page dark section, bg #16181D, text #F2F2EE): one large 40px sentence, e.g. "We build the system, then we stay to make sure it works." Under it, 3 short points separated by hairlines #2A2D33.
- Dark sections total: this + CTA + footer.

## 9) TOOLS STRIP
- Slim row above FAQ: mono label "Tools we build with" and monochrome grey icons/wordmarks (Python, Next.js, React, Node.js, PostgreSQL, Flask, Anthropic). Color #8A8D93, hover #16181D. Real tech only, never client logos.

## 10) FOUNDER SECTION
- Remove blue orb image. Use /public/raja.jpg if it exists. If not, remove image entirely, show text only with mono caption "Founder, Drexa AI". Never AI/stock/3D image.

## 11) FAQ
- Same container and left edge as other sections. Hairline accordion, plus/minus rotates 90deg in 150ms. Question text 20px.

## 12) MICRO-DETAILS
- Links: underline offset 4px, accent color, animated underline on hover.
- Buttons: arrow nudges 3px on hover. Focus ring 2px #0B6B57 offset 2px.
- Header: on scroll add 1px bottom border and white bg. Active nav link has accent underline.
- Inner page headers: no image. Mono breadcrumb, large H1, one sentence, buttons.
- `::selection { background: #E7F2EE; color: #16181D; }`
- Custom 404. Footer with large flat "Drexa" wordmark in #2A2D33.

## 13) RHYTHM
- Section padding vary: 112px, 80px, 112px, 96px. Mobile 56-64px.
- No centered section headers except CTA band.
- Never same layout in two consecutive sections.

## 14) PERFORMANCE
- Images WebP under 150KB, width/height set, only hero uses priority.
- Preload only Manrope 800 and Inter 400. font-display: swap.
- Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 100.
- Test 360, 390, 768, 1024, 1440px. No horizontal scroll, no clipped text or images.

## AFTER POLISH: remaining spec items, in this order
3 case study pages under /work, full /services overview, /work list page, /about, /contact, og.png (1200x630, white, logo, tagline), JSON-LD (ProfessionalService + FAQPage), sitemap.ts, robots.ts. Use exact copy from docs/Drexa-Website-Master-Spec.md. Run `npm run build` after each page.

## Rules
- Do not change copy, prices, or add claims. Leave [BRACKET] TODOs untouched.
- After each numbered item: report what changed, show screenshot.