/**
 * Home page copy — the single source of truth.
 *
 * Pure data: no JSX, no icons, no components. Sections attach their own
 * presentation (icons are mapped by `slug` inside the section that renders
 * them), which keeps this portable to a CMS later.
 *
 * `titleAccent` is the substring of `title` that receives the accent colour.
 */
export const home = {
  hero: {
    eyebrow: "Independent AI technology studio",
    headline: "Build what thinks forward.",
    headlineAccent: "thinks forward.",
    subhead:
      "We design and ship AI agents, automation workflows, and web products, from prototype to production.",
    cta: { label: "Start a project", href: "/contact" },
    secondary: { label: "See our work", href: "/work" },
    /* Proof strip. Only verifiable facts: the three projects listed in `work`
       are real and linked to source, and the stack names are their actual
       tags. No invented metrics, no fabricated logos. */
    proof: {
      label: "3 AI products shipped",
      stack: ["React", "Python", "PostgreSQL", "Anthropic"],
    },
    /** Decorative word painted behind the headline in the muted tone. */
    ghostWord: "Drexa",
  },

  /**
   * Capability ticker. Deliberately keywords rather than figures — there are no
   * verified metrics for this studio, and inventing them on a live site is not
   * an option. Swap in real numbers when they exist.
   */
  ticker: [
    "AI automation",
    "AI agents",
    "LLM integration",
    "Custom software",
    "Web experiences",
    "AI development",
    "Cybersecurity",
    "Creative",
  ],

  capabilities: {
    label: "What we do",
    title: "Technology should move you forward.",
    titleAccent: "move you forward.",
    description:
      "Not more noise. Not another generic chatbot. We combine product thinking, engineering discipline, and applied AI to create systems that earn their place in the real world.",
    items: [
      {
        number: "01",
        slug: "ai-automation",
        title: "AI automation",
        copy: "Automate repetitive workflows, operations, and internal processes so your team can focus on what matters.",
        tags: ["Workflows", "CRM automation", "Integrations"],
      },
      {
        number: "02",
        slug: "ai-agents",
        title: "AI agents",
        copy: "Build AI employees that can understand tasks, use tools, and take action — customer support, sales, and operations.",
        tags: ["Customer support", "Sales", "Operations"],
      },
      {
        number: "03",
        slug: "llm-integration",
        title: "LLM integration",
        copy: "Put the right model in the right place with useful, secure interfaces — RAG pipelines, evaluation, and guardrails.",
        tags: ["RAG", "Evaluation", "Guardrails"],
      },
      {
        number: "04",
        slug: "custom-software",
        title: "Custom software",
        copy: "Turn your idea into a reliable web application, SaaS product, or internal tool built for real-world use.",
        tags: ["Web apps", "Dashboards", "SaaS"],
      },
      {
        number: "05",
        slug: "web-experiences",
        title: "Web experiences",
        copy: "High-signal websites that make complex technology feel clear, credible, and easy to trust.",
        tags: ["Strategy", "Development"],
      },
      {
        number: "06",
        slug: "ai-development",
        title: "AI development",
        copy: "A practical technical partner for experiments, pilots, and ambitious new product ideas.",
        tags: ["Prototypes", "MVPs"],
      },
      {
        number: "07",
        slug: "cybersecurity",
        title: "Cybersecurity",
        copy: "Harden your systems, audit integrations, and protect data — from small business tooling to production AI pipelines.",
        tags: ["Security audits", "Hardening", "Compliance"],
      },
      {
        number: "08",
        slug: "creative",
        title: "Creative",
        copy: "Video editing, motion design, and graphic design that makes the technical work look like it belongs in the real world.",
        tags: ["Video", "Motion", "Graphic design"],
      },

    ],

  },

  work: {
    label: "Selected directions",
    title: "Ideas with somewhere to go.",
    titleAccent: "somewhere to go.",
    description:
      "A selection of systems we've built across AI, automation, software products, and education technology. These are our own internal and R&D builds — not client work.",
    items: [
      {
        number: "01",
        label: "Internal build",
        type: "AI / WhatsApp operations",
        title: "ChatConnect AI",
        copy: "AI-powered WhatsApp support & automation — knowledge-base responses, lead capture, human handoff, and business management dashboard.",
        tags: ["React", "Express", "PostgreSQL", "Anthropic"],
        href: "https://github.com/Raja468/chatconnect-ai",
        image: "/chatconnectai.png",
      },
      {
        number: "02",
        label: "R&D project",
        type: "AI / Desktop automation",
        title: "DREX AI Assistant",
        copy: "A Windows desktop AI assistant with voice input/output, intent parsing, app control, web search, screenshots, and text mode.",
        tags: ["Python", "Voice AI", "Automation"],
        href: "https://github.com/Raja468/Drex-AI-Assisstant",
        image: "/drex.png",
      },
      {
        number: "03",
        label: "Internal build",
        type: "Education / Operations platform",
        title: "Iqra School Management System",
        copy: "A Flask school management application with admin, teacher, and student roles, attendance, fee tracking, and notices.",
        tags: ["Flask", "SQLite", "Jinja2"],
        href: "https://github.com/Raja468/iqra-school-system",
        image: "/lms.png",
      },
    ],
  },

  approach: {
    label: "A better way to build",
    title: "Small team. Serious output.",
    titleAccent: "Serious output.",
    description:
      "We keep the room small and the thinking sharp. Every engagement is shaped around a clear outcome, not a bloated process.",
    steps: [
      {
        number: "01",
        title: "Discover",
        copy: "Understand your business, goals, and constraints before building anything.",
      },
      {
        number: "02",
        title: "Design",
        copy: "Define the solution and create a focused prototype you can see and test.",
      },
      {
        number: "03",
        title: "Build",
        copy: "Develop, integrate, test, and refine — two-week sprints with weekly demos.",
      },
      {
        number: "04",
        title: "Launch",
        copy: "Deploy the product and help you move it into production. We stay on if you need us.",
      },
    ],
  },

  why: {
    label: "Why Drexa",
    title: "Built around outcomes. Not just code.",
    titleAccent: "Not just code.",
    description:
      "We don't build technology just because we can. Every system starts with a real business problem. We focus on practical AI, clean architecture, and production-ready engineering — so what we build actually works.",
    pillars: [
      {
        number: "01",
        title: "AI that actually works",
        copy: "Practical AI — automation, agents, integrations, and products that people can use. Not demos.",
      },
      {
        number: "02",
        title: "Small team. Direct communication.",
        copy: "No layers of account managers. You work directly with the people building your solution.",
      },
      {
        number: "03",
        title: "Built for the long term",
        copy: "Clean architecture, secure integrations, and production-ready engineering from day one.",
      },
    ],
  },

  faq: {
    label: "FAQ",
    title: "Common questions",
    description: "The things people ask us most before reaching out.",
    items: [
      {
        q: "Do you work with startups or established businesses?",
        a: "Both. We work with teams that need to validate an idea, automate an existing process, or build a new digital product.",
      },
      {
        q: "Can you integrate AI into our existing software?",
        a: "Yes. We can integrate LLMs, AI agents, RAG systems, APIs, automation platforms, and other AI capabilities into existing workflows.",
      },
      {
        q: "Do you build custom software?",
        a: "Yes. We build custom web applications, SaaS products, dashboards, and AI-powered platforms.",
      },
      {
        q: "Do you offer cybersecurity and creative work too?",
        a: "Yes. Alongside engineering, we handle security audits and hardening as well as video editing, motion design, and graphic design.",
      },
      {
        q: "How does the consultation work?",
        a: "We'll discuss your goals, understand the problem, and identify potential solutions. There's no obligation to continue.",
      },
      {
        q: "Who owns the code and IP after the project?",
        a: "You do. Everything we build — code, designs, documentation, and infrastructure — is transferred to you at launch.",
      },
    ],
  },

  contact: {
    label: "Get started",
    title: "Have an idea? Let's build it.",
    titleAccent: "Let's build it.",
    description:
      "Get a free 30-minute consultation with our team. Whether you need AI automation, a custom web solution, cybersecurity, or creative work, we'll help you find the best path forward.",
    cta: { label: "Start a project", href: "/contact" },
    whatsapp: { label: "Or message us on WhatsApp", href: "https://wa.me/923715082737" },
    email: "hello@drexa.tech",
    form: {
      label: "Or send a project brief",
      description: "Tell us what you're working on. We'll reply within one business day.",
    },
    meta: "30-minute call · No obligation · Practical recommendations",
  },
} as const;