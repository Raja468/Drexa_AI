/**
 * Team page copy — the single source of truth for /team.
 * Extracted verbatim from app/team/page.tsx in Phase 0 (brief §12). Icons are
 * mapped from `icon` by the page; this module stays pure data.
 *
 * OWNER INPUT: member bios/roles were authored in code — confirm each person,
 * role and bio is real before the brief's §7.9 founder section ships (see
 * docs/TODO_OWNER.md).
 */
export const teamPage = {
  hero: {
    eyebrow: "The people behind Drexa",
    title: "Engineers and builders. Not middle management.",
    accent: "Not middle management.",
    description:
      "We are a compact, multidisciplinary technical studio. We bring together AI specialists, full-stack engineers, cybersecurity analysts, and product designers who treat your software with the craft and rigor it deserves.",
  },

  members: {
    label: "Core Team",
    title: "Meet the crew",
    note: "Based in PK · Working Globally",
    items: [
      {
        icon: "cpu" as const,
        name: "Raja",
        role: "Founder & Lead AI Architect",
        bio: "Leads engineering architecture and applied AI systems at Drexa. Specialized in autonomous agents, voice intelligence, and end-to-end automation pipelines.",
        specialties: ["Autonomous Agents", "LLM Pipelines", "Voice AI", "System Architecture"],
        skills: ["Python", "Anthropic Claude", "OpenAI", "Next.js", "LangChain"],
        github: "https://github.com/Raja468",
        status: "Active on core builds",
      },
      {
        icon: "terminal" as const,
        name: "Hamza Tariq",
        role: "Senior Systems & Backend Engineer",
        bio: "Builds high-throughput backends, secure database architectures, and API integrations that sustain mission-critical production loads.",
        specialties: ["Cloud Infrastructure", "API Gateways", "Relational Databases", "Microservices"],
        skills: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "AWS"],
        github: "https://github.com/Raja468",
        status: "Infrastructure & APIs",
      },
      {
        icon: "sparkles" as const,
        name: "Ayan Malik",
        role: "Product Designer & UI Engineer",
        bio: "Bridges user psychology and technical engineering to craft high-conversion interfaces, sleek design systems, and responsive web experiences.",
        specialties: ["Design Systems", "Interactive Motion", "Information Architecture", "UX Strategy"],
        skills: ["Figma", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
        github: "https://github.com/Raja468",
        status: "Design & Interaction",
      },
      {
        icon: "shield" as const,
        name: "Zain Ahmed",
        role: "Cybersecurity & DevOps Lead",
        bio: "Hardens AI pipelines, conducts web application penetration testing, and ensures data governance across client platforms and internal tools.",
        specialties: ["Penetration Testing", "Threat Modeling", "CI/CD Hardening", "Data Privacy"],
        skills: ["Security Audits", "Linux", "OWASP", "Vulnerability Scanning", "Network Security"],
        github: "https://github.com/Raja468",
        status: "Security & Hardening",
      },
    ],
  },

  principles: {
    label: "How We Operate",
    title: "A studio culture anchored in engineering truth.",
    items: [
      {
        number: "01",
        title: "Direct engineering access",
        copy: "You don't talk to account managers or junior coordinators. You communicate directly with the senior engineers architecting and writing your code.",
      },
      {
        number: "02",
        title: "AI as a native capability",
        copy: "AI isn't a trendy feature we tack on at the end. We understand model behavior, latency, evaluation, and failure modes from the ground up.",
      },
      {
        number: "03",
        title: "Relentless execution speed",
        copy: "We ship in tight, iterative sprints with weekly working demos. Ideas turn into testable reality in weeks, not quarters.",
      },
    ],
  },

  cta: {
    eyebrow: "Work with us",
    title: "Ready to work with a dedicated team?",
    description:
      "Book a direct consultation with our engineering leads. No sales pitches — just actionable technical architecture.",
    cta: { label: "Book a consultation", href: "/contact" },
  },

  /**
   * Home-page founder section (brief §7.9), founder-led because the team is
   * currently one person plus collaborators.
   *
   * DRAFT COPY — story, facts and role wording need owner approval (§0 tag
   * [AGENT DRAFTS → OWNER APPROVES]). Everything factual is drawn from copy
   * already live on /about and /contact.
   *
   * `portrait` — [OWNER PROVIDES] /public/team/raja.webp; the monogram below
   * renders until then (never a stock photo).
   * `certifications` — hidden until real certificates with verification URLs
   * are supplied (§2 rule 2).
   */
  founder: {
    name: "Raja",
    role: "Founder, Drexa",
    monogram: "R",
    portrait: null as string | null,
    story: [
      "I started Drexa because most \"AI agencies\" ship demos, not products. We build agents, automation, and web software that has to survive production — ours first.",
      "Everything on this site is something we built and run ourselves. When we take on your project, you work directly with the people writing the code.",
    ],
    howWeWork: [
      "You talk to the engineers building your system — never a middleman.",
      "Two-week sprints with a working demo at the end of each.",
      "You own 100% of the code, designs, and infrastructure at launch.",
    ],
    links: {
      github: "https://github.com/Raja468",
      email: "hello@drexa.tech",
    },
    certifications: [] as ReadonlyArray<{ name: string; verifyUrl: string }>,
  },
} as const;
