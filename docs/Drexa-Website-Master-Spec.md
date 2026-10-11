# DREXA AI: Website Master Spec (drexa.tech)

One file. Design system, all page content, SEO. Copy is final text, ready to paste. Items in `[BRACKETS]` are things only you can fill (prices, photo, links).

Stack assumed: Next.js 14, TypeScript, Tailwind CSS. Animation: CSS only, plus Framer Motion for simple fade-in.

---

## 1. Positioning

**Who you are:** Independent technology studio. Builds AI automation, websites, custom software, and security services for small and growing businesses.

**Tagline (use everywhere):** `Build smarter. Run safer.`

**Why this works:** "Build smarter" covers AI, web, software. "Run safer" covers cybersecurity. One line, whole business.

**Voice rules:**
- Plain words. Short sentences. No "revolutionary", "cutting-edge", "next-gen", "synergy".
- Say what you do, for whom, and what they get.
- Honest. No fake numbers, no fake clients, no fake team.

---

## 2. Design System

### 2.1 Look in one sentence
White and warm-grey pages, near-black text, one deep green accent, generous spacing, sharp typography, real screenshots. Like a good law firm or Stripe-style docs, not an "AI startup".

### 2.2 Banned list (do not add any of these)
- Neon colors, glow effects, glassmorphism, blur, grain/noise textures
- Gradient backgrounds, gradient text, mesh gradients
- Dark blue or navy backgrounds
- Particles, floating orbs, 3D blobs, robot/brain/circuit stock art
- Marquee tickers, preloader on every load, scroll-jacking
- Giant uppercase headlines

### 2.3 Colors

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-alt` | `#F6F6F3` | Alternate sections, cards area |
| `--border` | `#E4E4DF` | Lines, card borders |
| `--text` | `#16181D` | Headings, body |
| `--text-muted` | `#54585F` | Secondary text (passes contrast on white) |
| `--accent` | `#0B6B57` | Buttons, links, small highlights |
| `--accent-hover` | `#08574A` | Hover |
| `--accent-tint` | `#E7F2EE` | Icon backgrounds, tags |
| `--dark` | `#16181D` | CTA band and footer only (neutral charcoal, not blue) |
| `--on-dark` | `#F2F2EE` | Text on dark band |
| `--on-dark-muted` | `#A9ACB2` | Muted text on dark band |

Rules:
- Accent used on: primary buttons, text links, icon tint, small labels. Never as a full section background.
- At most one dark section per page (the CTA band) plus footer.
- Tailwind config: map these to `colors.bg`, `colors.accent`, etc.

### 2.4 Typography
- Headings: **Manrope** 700 / 800
- Body: **Inter** 400 / 500 / 600
- Google Fonts blocked in Pakistan. Do not link Google Fonts. Download woff2 files and self-host with `next/font/local`, or use Bunny Fonts.

| Element | Desktop | Mobile | Weight | Line height |
|---|---|---|---|---|
| H1 | 56px | 36px | 800 | 1.1 |
| H2 | 40px | 28px | 700 | 1.2 |
| H3 | 22px | 20px | 700 | 1.3 |
| Body | 18px | 16px | 400 | 1.65 |
| Small / label | 14px | 14px | 500 | 1.5 |

- Headlines sentence case. No all-caps headlines.
- Small labels above headings (eyebrows): 13px, 600, uppercase, letter-spacing 0.08em, accent color.
- Max text line width: 65 characters (`max-w-prose`).

### 2.5 Layout
- Container: max-width 1200px, side padding 24px (mobile), 40px (desktop).
- Section vertical padding: 96px desktop, 64px mobile.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Grid: 12 columns desktop, 1 column mobile, 2 columns tablet.
- Alternate section backgrounds: white, `--bg-alt`, white, `--bg-alt`.

### 2.6 Components
- **Primary button:** bg `--accent`, white text, radius 8px, padding 14px 24px, weight 600. Hover `--accent-hover`.
- **Secondary button:** transparent, 1px border `--text`, text `--text`, same size. Hover bg `--bg-alt`.
- **Card:** white, 1px `--border`, radius 12px, padding 28px. Hover: border becomes `--accent`. No lift, no big shadow.
- **Icon:** Lucide, 24px, stroke 1.5, color `--accent`, inside 48px square with `--accent-tint` bg and radius 10px.
- **Tag/pill:** 13px text, `--accent-tint` bg, `--accent` text, radius 999px, padding 4px 12px.
- **Browser frame for screenshots:** flat, 1px border, top bar with three small grey dots, radius 12px. No tilt, no shadow glow.
- **FAQ:** accordion, 1px bottom borders, plus/minus icon.
- **Shadow (only if needed):** `0 1px 2px rgba(22,24,29,0.06)`.

### 2.7 Motion
- Only: fade-up on scroll (opacity 0 to 1, translateY 12px to 0, 300ms ease-out), once per element.
- Button and link hover: 150ms.
- Respect `prefers-reduced-motion`: disable all animation.
- No preloader. No parallax. No cursor effects.

### 2.8 Imagery
- Founder: real photo, square crop, plain background. `[PHOTO]`
- Projects: real screenshots in browser frame.
- Hero visual (right side desktop, below text on mobile): ChatConnect AI dashboard screenshot in browser frame. Real product beats any illustration.
- No stock photos of people shaking hands or typing.

### 2.9 Accessibility
- Visible focus ring: 2px `--accent`, 2px offset.
- All images have alt text. Buttons are real `<button>` or `<a>`.
- Minimum tap target 44px.

---

## 3. Global Elements

### 3.1 Header (sticky, white, 1px bottom border, height 72px)
- Left: logo + "Drexa AI"
- Center/right links: **Services** (dropdown), **Work**, **About**, **Blog**, **Contact**
- Services dropdown: AI Development & Automation, Web Development, Software Development, Cybersecurity
- Right: primary button **Book a free consultation**
- Mobile: hamburger, full-screen white menu, same links.

### 3.2 CTA band (end of every page, dark `--dark`)
- Heading: `Have a project in mind?`
- Text: `Book a free 30-minute consultation. We will listen, ask questions, and tell you honestly what we would build and what it would cost. No obligation.`
- Buttons: **Book a free consultation** (accent button) and **Message on WhatsApp** (outlined, light border)

### 3.3 Footer (dark `--dark`)
- Column 1: logo, `Build smarter. Run safer.`, `Drexa AI is an independent technology studio based in Pakistan, working with clients worldwide.`
- Column 2 "Services": AI Development & Automation, Web Development, Software Development, Cybersecurity
- Column 3 "Company": Work, About, Blog, Contact
- Column 4 "Contact": hello@drexa.tech, WhatsApp +92 371 5082737, `[LinkedIn]`, GitHub github.com/Raja468
- Bottom row: `© 2026 Drexa AI`, Privacy, Terms

---

## 4. SEO Rules (apply to every page)

**Honest expectation:** nobody can guarantee "top rank". New domain needs 3 to 6 months. Win by targeting narrow phrases (long-tail + local) and publishing useful content. Section 6 lists exactly what to target.

### 4.1 Per page
- One `<h1>` only, includes main keyword naturally.
- Title tag max 60 characters. Meta description max 155 characters.
- Clean URL slug, lowercase, hyphens.
- Canonical URL set. Open Graph + Twitter card set.
- Every image: `alt` describing it plainly. Use `next/image`.
- Internal links: every service page links to Contact, Work, and 2 related pages.
- First 100 words contain the main keyword.

### 4.2 Site-wide technical
- `sitemap.xml` and `robots.txt` (Next.js `app/sitemap.ts`, `app/robots.ts`).
- HTTPS, redirect `www` to non-www (or reverse), one version only.
- Core Web Vitals: LCP under 2.5s on mobile. Self-hosted fonts, compressed images (WebP/AVIF), no autoplay video, no heavy JS.
- Submit site to **Google Search Console** and **Bing Webmaster Tools**. Submit sitemap.
- Create **Google Business Profile** (service-area business, Islamabad). Helps local searches.
- Add Organization + ProfessionalService schema (section 7).
- Add FAQ schema on pages that have FAQ.
- Backlinks (free, real): GitHub profile and repos link to site, LinkedIn company page, Fiverr and PeoplePerHour profiles, university/developer directories, Dev.to / Medium articles linking back.

### 4.3 Next.js metadata example (Home)
```ts
// app/page.tsx
export const metadata = {
  title: "Drexa AI | AI Automation, Web & Software Development",
  description:
    "Independent studio in Pakistan building AI automation, websites, custom software and cybersecurity services for growing businesses. Free consultation.",
  alternates: { canonical: "https://drexa.tech" },
  openGraph: {
    title: "Drexa AI | Build smarter. Run safer.",
    description:
      "AI automation, web and software development, and cybersecurity for growing businesses.",
    url: "https://drexa.tech",
    siteName: "Drexa AI",
    images: ["https://drexa.tech/og.png"],
    type: "website",
  },
};
```
Make `og.png` 1200x630: white background, logo, tagline. Clean, no effects.

---

## 5. Pages

Sitemap:

```
/                              Home
/services                      Services overview
/services/ai-automation        AI Development & Automation
/services/web-development      Web Development
/services/software-development Custom Software Development
/services/cybersecurity        Cybersecurity
/work                          Work (project list)
/work/chatconnect-ai           Case study
/work/drex-ai-assistant        Case study
/work/iqra-school-management   Case study
/about                         About
/contact                       Contact
/blog                          Blog list
/privacy  /terms               Legal
404                            Not found
```

---

### 5.1 HOME `/`

**SEO**
- Title: `Drexa AI | AI Automation, Web & Software Development`
- Description: `Independent studio in Pakistan building AI automation, websites, custom software and cybersecurity services for growing businesses. Free consultation.`
- Main keywords: AI automation services, custom software development, website development, cybersecurity services

**Section A: Hero** (white bg)
- Eyebrow: `Independent technology studio`
- H1: `Technology that helps your business run better.`
- Sub: `Drexa AI builds AI automation, websites, custom software, and security services for small and growing businesses. You work directly with the people building it.`
- Buttons: **Book a free consultation** / **See our work** (secondary)
- Under buttons, small muted line: `Free 30-minute call. No obligation. Reply within one business day.`
- Right side: ChatConnect AI dashboard screenshot in browser frame.

**Section B: Trust strip** (`--bg-alt`, four items in a row, icon + text)
- `Direct communication` : no account managers
- `You own everything` : code, designs, and documentation
- `Fixed scope, clear price` : agreed before work starts
- `Security built in` : not added at the end

**Section C: Services** (white)
- Eyebrow: `What we do`
- H2: `Four services. One team.`
- Intro: `Most businesses need a few of these together. We handle all of them, so nothing gets lost between vendors.`
- 4 cards (2x2 desktop), each: icon, H3, 2-line description, link "Learn more".

1. **AI Development & Automation**: `Automate repetitive work with AI agents, chatbots, and workflow automation. WhatsApp support bots, lead capture, document processing, and internal tools.`
2. **Web Development**: `Fast, clear, search-friendly websites and web apps. Business sites, landing pages, WordPress, and custom Next.js builds.`
3. **Custom Software**: `Dashboards, management systems, SaaS products, and internal tools built around how your business actually works.`
4. **Cybersecurity**: `Web application security checks, security monitoring support, and staff awareness training. Find weak points before attackers do.`

**Section D: How we work** (`--bg-alt`)
- Eyebrow: `Our process`
- H2: `Simple process. No surprises.`
- 4 steps, numbered:
  1. **Discover**: `We learn your business, your goals, and your limits before suggesting anything.`
  2. **Design**: `We define the solution and show you a clear plan or prototype you can react to.`
  3. **Build**: `We build in short cycles and show you progress regularly.`
  4. **Launch & support**: `We deploy, test, hand over everything, and stay available after launch.`

**Section E: Selected work** (white)
- Eyebrow: `Selected work`
- H2: `What we have built.`
- Intro: `These are our own products and R&D projects. We build real systems, not slide decks.`
- 3 project cards (screenshot top, tags, 1-line description, link "View project"):
  - **ChatConnect AI**: `WhatsApp support automation with knowledge-base answers, lead capture, and human handoff.` Tags: React, Express, PostgreSQL
  - **Drex AI Assistant**: `Windows desktop AI assistant with voice input and output, app control, and web search.` Tags: Python, Voice AI
  - **Iqra School Management System**: `School management app with admin, teacher, and student roles, attendance, fees, and notices.` Tags: Flask, SQLite
- Small label on each card: `Internal build`
- Link under cards: **View all work**

**Section F: Why Drexa** (`--bg-alt`)
- H2: `Built around outcomes, not just code.`
- Three columns:
  - **Practical AI**: `We build automation and agents that do real jobs. If AI is not the right answer for your problem, we will say so.`
  - **Small team, direct access**: `You talk to the person doing the work. Questions get answered fast.`
  - **Built to last**: `Clean code, secure setup, and documentation, so you are never locked in.`

**Section G: Founder** (white, photo left, text right)
- Eyebrow: `Who you work with`
- H2: `Hi, I'm Raja.`
- Text: `I am the founder of Drexa AI. I am a software developer and Computer Science student with hands-on experience in web development, AI automation, and cybersecurity. I started Drexa to help businesses use technology in practical ways, without confusing jargon or inflated promises.`
- Link: **More about me**

**Section H: FAQ** (`--bg-alt`)
- H2: `Common questions`
- Q1: **Do you work with startups or established businesses?** `Both. We work with teams that need to validate an idea, automate an existing process, or build a new digital product.`
- Q2: **Can you add AI to our existing software?** `Yes. We can connect AI models, chatbots, and automation to your existing website, CRM, or internal tools through APIs.`
- Q3: **How much does a project cost?** `It depends on scope. After the free consultation you receive a fixed-scope quote, so you know the price before work begins.`
- Q4: **How long does a project take?** `Simple websites and automations: 1 to 3 weeks. Custom software: usually 4 to 12 weeks, depending on size.`
- Q5: **Who owns the code after the project?** `You do. Code, designs, and documentation are handed over at launch.`
- Q6: **Do you offer support after launch?** `Yes. We offer optional monthly support for updates, fixes, and monitoring.`

**Section I:** CTA band.

---

### 5.2 SERVICES OVERVIEW `/services`

**SEO**
- Title: `Services: AI, Web, Software & Security | Drexa AI`
- Description: `AI automation, website development, custom software, and cybersecurity services from Drexa AI. See what we offer and book a free consultation.`
- H1: `Our services`

**Content**
- Intro: `Drexa AI is a small studio that covers the full path from idea to secure, working product. Pick one service or combine several.`
- 4 large cards (full width, alternating), each: H2, 3-sentence description, list of 4 items, button "Learn more".
- Section "Not sure what you need?": `Tell us the problem, not the solution. We will recommend the simplest approach that works.` Button: Book a free consultation.
- Common combinations (3 small cards):
  - `Website + AI chatbot`: `A site that answers customer questions and captures leads at any hour.`
  - `Custom software + security review`: `A business system tested for weak points before launch.`
  - `Automation + staff awareness training`: `Faster operations and a team that spots phishing.`

---

### 5.3 AI DEVELOPMENT & AUTOMATION `/services/ai-automation`

**SEO**
- Title: `AI Automation & Chatbot Development | Drexa AI`
- Description: `We build AI agents, WhatsApp chatbots, and workflow automation that save your team hours every week. Free consultation. Based in Pakistan.`
- H1: `AI automation and development for real business work`
- Main keywords: AI automation services, WhatsApp chatbot for business, AI agent development, LLM integration, business process automation
- Local variant (add one natural sentence on page): `We work with businesses in Islamabad, Rawalpindi, across Pakistan, and internationally.`

**Hero**
- Sub: `We build AI systems that handle repetitive tasks, answer customer questions, and connect your tools, so your team can focus on work that needs people.`
- Buttons: Book a free consultation / See ChatConnect AI

**Section: What we build** (cards)
1. **WhatsApp and website chatbots**: `Answer customer questions from your own documents, capture leads, and hand over to a human when needed.`
2. **AI agents**: `Software that understands a task, uses your tools, and takes action. Support, sales follow-up, and operations.`
3. **Workflow automation**: `Connect forms, spreadsheets, CRM, email, and messaging so data moves without manual copying.`
4. **LLM integration**: `Add AI models to your existing product safely. Retrieval (RAG), evaluation, and guardrails included.`
5. **Document and data processing**: `Extract, sort, and summarize invoices, forms, emails, and reports.`
6. **Voice and desktop assistants**: `Custom assistants with voice input and output and app control.`

**Section: Who it is for**
- `Clinics and service businesses with many repeat customer questions`
- `Online shops handling orders and support on WhatsApp`
- `Schools and training centers managing inquiries and notices`
- `Small teams doing the same manual tasks every day`

**Section: Example, ChatConnect AI**
- `ChatConnect AI is our own WhatsApp support platform. It answers from a business knowledge base, captures leads, hands over to a human agent, and gives owners a dashboard.` Link to case study. Label `Internal build`.

**Section: How an automation project runs**
1. `Free call: we map the task you want to remove from your day.`
2. `Scope: we write down what the system will and will not do, and the price.`
3. `Build and test with your real examples.`
4. `Launch, train your team, and monitor for the first weeks.`

**Section: Honest limits** (builds trust)
- H2: `When AI is not the answer`
- Text: `AI is good at language and repetitive decisions. It is not magic. If a simple form, spreadsheet, or rule solves your problem, we will tell you. We test every system on real examples before launch and keep a human in the loop where mistakes are costly.`

**Section: Pricing**
- `Starter automation: from [PRICE]` / `Chatbot setup: from [PRICE]` / `Custom AI project: quote after consultation`
- Note: `Exact price is fixed after a free call.`

**FAQ**
- **What does a WhatsApp chatbot cost to run?** `Setup is a one-time project fee. Running cost is usually the WhatsApp Business API messaging fees plus AI model usage. We estimate this before you decide.`
- **Will the bot give wrong answers?** `We limit it to your approved information, test it heavily, and add human handoff for anything it is unsure about.`
- **Is my business data safe?** `We use secure APIs, restricted access, and do not use your data for anything else. We explain exactly where data goes.`
- **Can you connect it to our existing tools?** `Usually yes, through APIs and integrations with common tools like Google Sheets, CRMs, and email.`

---

### 5.4 WEB DEVELOPMENT `/services/web-development`

**SEO**
- Title: `Website Development Services | Drexa AI`
- Description: `Fast, search-friendly business websites, WordPress and Next.js web apps. Clear design, clean code, mobile-first. Free consultation. Pakistan-based.`
- H1: `Websites that load fast and bring in customers`
- Main keywords: website development services, business website design, WordPress development, Next.js development, web development Islamabad
- Local line: `We build websites for businesses in Islamabad, Rawalpindi, and across Pakistan, and for international clients.`

**Hero sub:** `Clear design, clean code, and pages built to be found on Google. Your site should explain what you do in five seconds and make it easy to contact you.`

**What we build** (cards)
1. **Business websites**: `Professional multi-page sites for companies, clinics, schools, and service providers.`
2. **Landing pages**: `Focused single pages for a product, offer, or campaign.`
3. **WordPress sites**: `Easy-to-manage WordPress websites, themes, and WooCommerce stores.`
4. **Custom web apps**: `Portals, dashboards, and tools built with Next.js and modern frameworks.`
5. **Redesign and speed fixes**: `Fix slow, outdated, or confusing sites without starting from scratch.`
6. **Website care**: `Updates, backups, security patches, and small changes each month.`

**Every website includes** (checklist)
- Mobile-first responsive design
- On-page SEO setup (titles, descriptions, schema, sitemap)
- Fast loading (optimized images and code)
- Contact forms and WhatsApp button
- Basic security hardening
- Google Search Console and analytics setup
- Handover of all files and access

**Process:** Discover, Design, Build, Launch (same four steps, 1 line each, web-specific).

**Pricing:** `Business website: from [PRICE]` / `Landing page: from [PRICE]` / `WordPress store: from [PRICE]` / `Custom web app: quote after consultation`

**FAQ**
- **How long does a website take?** `A landing page: about a week. A business site: 2 to 3 weeks, depending on content readiness.`
- **Will my site appear on Google?** `We set up everything search engines need. Ranking also depends on competition and time, so we explain realistic expectations. We cannot promise page one.`
- **Can I edit the website myself?** `Yes. We build so you can change text and images, and we show you how.`
- **Do you provide hosting and domain?** `We can set up and manage them for you, or work with your existing provider.`

---

### 5.5 CUSTOM SOFTWARE DEVELOPMENT `/services/software-development`

**SEO**
- Title: `Custom Software Development | Drexa AI`
- Description: `Custom web applications, dashboards, management systems, and SaaS products built around your business. Clean code, secure by design. Free consultation.`
- H1: `Custom software built around how your business works`
- Main keywords: custom software development, business management system, SaaS development, web application development, software engineering services

**Hero sub:** `If spreadsheets and off-the-shelf tools are slowing you down, we build the system that fits your process.`

**What we build** (cards)
1. **Management systems**: `Schools, clinics, shops, and offices. Records, roles, attendance, billing, reports.`
2. **Dashboards and reporting**: `See your numbers in one place instead of five spreadsheets.`
3. **SaaS products**: `Take an idea from prototype to a working product with user accounts and payments.`
4. **Internal tools**: `Order tracking, approvals, inventory, and team workflows.`
5. **APIs and integrations**: `Connect your systems to payment gateways, messaging, and third-party tools.`
6. **Desktop and automation tools**: `Windows applications and scripts for repeated tasks.`

**Technology** (small tags, plain list): Python, Flask, JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, SQLite.

**How we build**
- `Clear scope document before coding starts`
- `Short build cycles with regular demos`
- `Role-based access and secure login by default`
- `Tested before delivery`
- `Full source code and documentation handed over`

**Example:** `Iqra School Management System`: a school management app with admin, teacher, and student roles, attendance, fee tracking, and notices. Link to case study. Label `Internal build`.

**Pricing:** `MVP / small tool: from [PRICE]` / `Management system: quote after consultation`

**FAQ**
- **Do I need to know exactly what I want?** `No. Bring the problem. We help turn it into a clear scope.`
- **Can you improve our existing software?** `Yes. We can review, fix, extend, or rebuild parts of it.`
- **Who owns the source code?** `You do, fully, at handover.`
- **What if I need changes later?** `We offer monthly support or per-task updates.`

---

### 5.6 CYBERSECURITY `/services/cybersecurity`

**SEO**
- Title: `Cybersecurity Services: Pentesting & Awareness | Drexa AI`
- Description: `Web application security checks, security monitoring support, WordPress hardening, and staff awareness training for small businesses. Free consultation.`
- H1: `Practical cybersecurity for small and growing businesses`
- Main keywords: cybersecurity services Pakistan, web application penetration testing, vulnerability assessment, security awareness training, WordPress security, SOC monitoring support

**Hero sub:** `Most small businesses are attacked through simple mistakes: weak passwords, outdated plugins, exposed admin pages, and phishing emails. We help you find and fix these before someone else finds them.`

**What we offer** (cards)
1. **Web application security assessment**: `A scope-limited test of your website or web app for common vulnerabilities such as the OWASP Top 10. You receive a clear report with severity and fix steps.`
2. **WordPress security hardening**: `Updates, login protection, backups, permissions, and malware checks for WordPress sites.`
3. **Security monitoring support**: `Set up logging and alerting, and learn to review alerts. Basic SOC-style monitoring guidance for small teams.`
4. **Security awareness training**: `Short sessions for your staff on phishing, passwords, safe browsing, and reporting incidents. Plain language, real examples.`
5. **Security review for AI and automation**: `Check API keys, permissions, and data flow in chatbots and automations before launch.`
6. **Security basics checklist**: `A written review of accounts, backups, devices, and access, with a prioritized action list.`

**How an assessment works**
1. `Written authorization: you confirm in writing what we may test.`
2. `Scope: agreed list of sites, apps, and test types.`
3. `Testing: we check for common weaknesses using standard methods, safely.`
4. `Report: findings ranked by severity, with simple steps to fix each.`
5. `Optional retest after you fix issues.`

**Our rules**
- `We only test systems you own or have written permission to test.`
- `We never access data beyond what is needed to prove an issue.`
- `We keep your findings confidential.`

**Honest scope** (important)
- H2: `What we do and do not offer`
- Text: `Our assessments are focused checks for small businesses and web applications. We are not a large red-team firm, and we do not promise that a system is "fully secure". No one can. We tell you what we found, what to fix first, and what we did not test.`

**Pricing:** `Awareness session: from [PRICE]` / `WordPress hardening: from [PRICE]` / `Web app assessment: quote based on scope`

**FAQ**
- **Is penetration testing legal?** `Yes, when done with the owner's written permission. We always require it.`
- **Will testing break my website?** `We use safe methods and agree testing windows with you. Risk is kept low and discussed beforehand.`
- **How often should I test?** `After major changes and at least once a year for business-critical systems.`
- **Is my business too small to be a target?** `No. Attacks are mostly automated and look for easy weaknesses on any site.`

---

### 5.7 WORK `/work`

**SEO**
- Title: `Our Work: AI, Software and Automation Projects | Drexa AI`
- Description: `Explore ChatConnect AI, Drex AI Assistant, and the Iqra School Management System. Real systems built by Drexa AI.`
- H1: `Our work`
- Intro: `These are our own products and R&D projects. We build real working systems and publish the code where we can. Client projects will be added as they are completed with permission.`

3 large project cards (screenshot, name, one-liner, tags, "Internal build" label, button "Read case study", GitHub link).

(When you complete a real client project with permission, add it here as a card with `Client project`. Do not add any client name or number without written permission.)

---

### 5.8 CASE STUDY: ChatConnect AI `/work/chatconnect-ai`

**SEO**
- Title: `ChatConnect AI: WhatsApp Support Automation | Drexa AI`
- Description: `Case study of ChatConnect AI, a WhatsApp support platform with knowledge-base answers, lead capture, and human handoff.`
- H1: `ChatConnect AI`
- Tag line: `AI-powered WhatsApp support and lead capture`
- Facts row: `Type: Internal build` / `Stack: React, Express, PostgreSQL, Anthropic API` / `Role: Design, development, deployment` / `Code: GitHub link`

**Sections**
- **The problem:** `Small businesses receive the same questions on WhatsApp all day: prices, timings, availability. Answering manually is slow, and leads get lost when nobody replies.`
- **What we built:** `A platform that answers customer messages using the business's own knowledge base, captures lead details, hands the chat to a human when needed, and gives the owner a dashboard to manage conversations.`
- **Key features:** knowledge-base answers, lead capture, human handoff, management dashboard.
- **How it works:** short 4-step diagram: Customer message, AI checks knowledge base, answer or handoff, owner sees it in dashboard.
- **Technology choices:** `React for the dashboard, Express and PostgreSQL for the backend, and Anthropic models for language understanding. Answers are restricted to approved business information to avoid made-up replies.`
- **Results:** `[Add real measured results only after real use. Until then, write: "Currently in active development and testing." Do not invent percentages.]`
- **Screenshots:** 3 to 4 real screenshots in browser frames.
- CTA: `Want something like this for your business?` Button: Book a free consultation.

---

### 5.9 CASE STUDY: Drex AI Assistant `/work/drex-ai-assistant`

**SEO**
- Title: `Drex AI Assistant: Windows Voice AI Assistant | Drexa AI`
- Description: `Case study of Drex AI Assistant, a Windows desktop assistant with voice input and output, app control, web search, and screenshots.`
- H1: `Drex AI Assistant`
- Facts: `Type: R&D project` / `Stack: Python` / `Code: GitHub link`
- **The idea:** `Explore how far a desktop assistant can go: listening, understanding intent, and acting on the computer.`
- **What it does:** voice input and output, intent parsing, opening and controlling apps, web search, screenshots, text mode.
- **What we learned:** `Reliable intent parsing and safe app control matter more than flashy features.`
- **Results:** same honest rule as above.
- CTA: `Need a custom assistant or desktop automation tool?`

---

### 5.10 CASE STUDY: Iqra School Management System `/work/iqra-school-management`

**SEO**
- Title: `School Management System in Flask | Drexa AI`
- Description: `Case study of a school management system with admin, teacher, and student roles, attendance, fee tracking, and notices.`
- H1: `Iqra School Management System`
- Facts: `Type: Internal build` / `Stack: Flask, Jinja2` / `Code: GitHub link`
- **The problem:** `Schools often run on paper registers and scattered spreadsheets. Attendance, fees, and notices become hard to track.`
- **What we built:** `A web application with separate roles for admin, teachers, and students. Staff mark attendance, track fee payments, and publish notices in one place.`
- **Key features:** role-based access, attendance, fee tracking, notices.
- **Results:** `[Add only real, verified usage details.]`
- CTA: `Need a management system for your school, clinic, or business?`

---

### 5.11 ABOUT `/about`

**SEO**
- Title: `About Drexa AI | Independent Technology Studio`
- Description: `Drexa AI is an independent studio in Pakistan building AI automation, web and software development, and security services. Meet the founder.`
- H1: `An independent studio that keeps things practical`

**Sections**
- **Story:** `Drexa AI started with a simple idea: many businesses want to use AI, better websites, and better software, but get lost in jargon and inflated promises. We build practical systems, explain them clearly, and tell you honestly what will and will not work.`
- **Founder (photo + text):** H2 `Raja, founder.` `I am a software developer and BS Computer Science student at Virtual University of Pakistan. I work across web development, AI automation, and cybersecurity, and I hold certifications from Cisco, EC-Council, IBM, and Google. [VERIFY exact certification names and list only those you hold.] I build Drexa AI because I enjoy turning real problems into working systems.`
- **How we work (values, 4 items):**
  - `Honest first`: `We tell you what we can and cannot do.`
  - `Clear communication`: `Plain language, regular updates.`
  - `You own it`: `Code and designs are yours.`
  - `Secure by default`: `Security is part of the build.`
- **Where we work:** `Based near Islamabad, Pakistan. We work remotely with clients worldwide.`
- CTA band.

(If you work alone, keep "I" and "independent studio". Do not invent team members.)

---

### 5.12 CONTACT `/contact`

**SEO**
- Title: `Contact Drexa AI | Free 30-Minute Consultation`
- Description: `Book a free consultation with Drexa AI. Tell us about your AI, web, software, or security project. We reply within one business day.`
- H1: `Let's talk about your project`
- Intro: `Book a free 30-minute call, or send a short brief. We reply within one business day.`

**Left: form**
- Fields: Name, Email, Service (dropdown: AI Development & Automation / Web Development / Custom Software / Cybersecurity / Not sure), Budget (dropdown: `Not sure yet` / `Under $500` / `$500 - $2,000` / `$2,000 - $5,000` / `$5,000+`), Project details (textarea, placeholder `What problem are you trying to solve?`)
- Button: **Send message**
- Success text: `Thank you. We will reply within one business day.`
- Validation messages inline, plain language.

**Right: contact details**
- Email: hello@drexa.tech
- WhatsApp: +92 371 5082737 (button "Message on WhatsApp")
- Location: `Islamabad, Pakistan. Working remotely worldwide.`
- Hours: `Monday to Saturday` `[SET HOURS AND TIMEZONE (PKT)]`
- "What happens next": 1. `We read your message.` 2. `We reply within one business day.` 3. `We schedule a free call.` 4. `You get a clear plan and quote.`

---

### 5.13 BLOG `/blog`

**SEO**
- Title: `Blog: AI, Web Development & Cybersecurity Guides | Drexa AI`
- Description: `Practical guides on AI automation, websites, software, and cybersecurity for small businesses.`
- H1: `Insights`

Blog is your main SEO engine. Publish 2 posts per month. Each post: 1,000 to 1,500 words, one main keyword, 3+ internal links (service page, related post, contact), real examples.

**First 12 post ideas (target keyword in brackets):**
1. How a WhatsApp chatbot can save your business hours every week [WhatsApp chatbot for business]
2. AI automation for small business: 7 tasks to automate first [AI automation for small business]
3. How much does a website cost in Pakistan? [website cost Pakistan]
4. WordPress security checklist: 12 steps to protect your site [WordPress security checklist]
5. What is penetration testing? A plain guide for business owners [what is penetration testing]
6. Phishing awareness: 8 signs of a fake email your staff should know [phishing awareness]
7. Custom software vs ready-made software: how to decide [custom software vs off-the-shelf]
8. What is RAG and why chatbots need it [what is RAG AI]
9. Website speed: why slow sites lose customers and how to fix them [website speed optimization]
10. Do small businesses really get hacked? Real attack patterns [small business cybersecurity]
11. How to choose a web development company [how to choose web development company]
12. Behind the build: how we made ChatConnect AI [case study blog post]

---

### 5.14 PRIVACY and TERMS
Use a standard template written for a services company. Must include: what data the contact form collects, how it is used, no selling of data, how to request deletion (hello@drexa.tech), cookies/analytics note. Have the final text checked before launch.

### 5.15 404
- H1: `Page not found`
- Text: `The page you are looking for does not exist or has moved.`
- Buttons: **Go to homepage** / **Contact us**

---

## 6. SEO Keyword Plan

New domain: avoid fighting for "web development" worldwide. Target these first.

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| Home | AI automation and software development studio | custom software, website development, cybersecurity services |
| AI | AI automation services | WhatsApp chatbot for business, AI agent development, LLM integration, chatbot development Pakistan |
| Web | website development services | business website design, WordPress development, Next.js developer, web development Islamabad |
| Software | custom software development | business management system, SaaS development, school management system |
| Cybersecurity | cybersecurity services Pakistan | web application penetration testing, WordPress security, security awareness training, vulnerability assessment |

Local targeting: mention Islamabad, Rawalpindi, and Pakistan naturally in service pages and footer. Create Google Business Profile.

---

## 7. Schema (add in layout)

```tsx
// app/layout.tsx, inside <body>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Drexa AI",
      url: "https://drexa.tech",
      logo: "https://drexa.tech/logo.png",
      description:
        "Independent technology studio building AI automation, web and software development, and cybersecurity services.",
      email: "hello@drexa.tech",
      telephone: "+923715082737",
      areaServed: ["Pakistan", "Worldwide"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      sameAs: ["https://github.com/Raja468"],
    }),
  }}
/>
```

Also add `FAQPage` JSON-LD on every page that has a FAQ (use the Q and A text above exactly as shown on the page).

---

## 8. Honesty Rules (protect your reputation)

- No testimonials until real clients give them in writing.
- No numbers (percentages, "30+ projects", uptime, students) unless you can prove them.
- Keep the "Internal build" label on your own projects.
- Cybersecurity: advertise only what you can deliver. Always get written authorization before testing anything. Never test systems you do not own.
- Certifications: list only ones you hold, exact names.
- Prices: put real prices or "from" prices you will honor.

---

## 9. Pre-Launch Checklist

- [ ] Colors, fonts, spacing match section 2
- [ ] None of the banned list items present (section 2.2)
- [ ] All `[BRACKETS]` filled: prices, photo, LinkedIn, hours
- [ ] Every page has unique title, description, one H1
- [ ] Mobile tested on a real phone (360px and 390px widths)
- [ ] Lighthouse mobile: Performance 90+, Accessibility 95+, SEO 100
- [ ] Contact form tested and delivers to hello@drexa.tech
- [ ] WhatsApp link tested
- [ ] Sitemap and robots live, submitted to Search Console and Bing
- [ ] Schema validated at validator.schema.org
- [ ] Privacy and Terms pages live
- [ ] Analytics installed (track: contact form sends, WhatsApp clicks)
- [ ] Freeze design for 60 days after launch. Change only based on data.
