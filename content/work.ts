/**
 * Work page copy.
 *
 * Replaces an orphaned module that carried invented case studies ("RAG Policy
 * Assistant", "Pentest Reporting Portal", "Creator Newsletter Platform") that
 * were never on the live site. This is the copy that was live, with one
 * change: the per-project `metrics` arrays are gone.
 *
 * Those metrics ("98% automation rate", "99.9% uptime", "1,200+ daily users",
 * "96.4% intent accuracy", "100% citation rate") are unverifiable performance
 * claims about internal builds. They are not measurable from anything in this
 * repository, so they are not rendered. The badges, taglines, descriptions and
 * repository links carry the same substance without asserting numbers.
 *
 * If any figure can be substantiated, add it back as a `metrics` array and
 * render it in `components/sections/work-grid.tsx`.
 */
export const workPage = {
  hero: {
    eyebrow: "Selected portfolio",
    title: "Projects, not promises. Built for the real world.",
    accent: "Built for the real world.",
    description:
      "Explore our production builds across autonomous AI agents, WhatsApp automations, enterprise platforms, and native system automation. Designed cleanly and built to solve actual business bottlenecks.",
  },

  cta: {
    eyebrow: "Let's build together",
    title: "Have a project or technical challenge?",
    description:
      "Whether you need to automate critical workflows with AI, build custom software, or engineer an MVP, we are ready to help.",
    label: "Start a project",
    href: "/contact",
  },

  filters: {
    label: "Filter by",
    empty: "No projects in this category yet.",
    tabs: [
      { id: "all", label: "All projects" },
      { id: "ai", label: "AI & automation" },
      { id: "software", label: "Software systems" },
      { id: "rnd", label: "R&D builds" },
    ],
  },

  repositoryLabel: "Explore repository",

  items: [
    {
      slug: "chatconnect-ai",
      number: "01",
      category: "ai",
      badge: "Internal build",
      type: "AI / WhatsApp operations",
      title: "ChatConnect AI",
      tagline: "Autonomous customer communication engine with CRM integration.",
      description:
        "A complete AI-powered WhatsApp customer support and sales automation platform. Features dynamic vector retrieval for knowledge-base answering, lead qualification, seamless human agent handoff, and an executive analytics dashboard.",
      tags: ["React", "Express", "PostgreSQL", "Anthropic Claude", "WhatsApp API"],
      github: "https://github.com/Raja468/chatconnect-ai",
      image: "/chatconnectai.png",
      featured: true,
    },
    {
      slug: "drex-ai-assistant",
      number: "02",
      category: "rnd",
      badge: "R&D project",
      type: "AI / Desktop automation",
      title: "DREX AI Assistant",
      tagline: "Native Windows desktop assistant with multimodal system control.",
      description:
        "A desktop assistant with speech-to-text, intent parsing, screen analysis, OS application orchestration, and contextual web search. Bridges LLM reasoning directly with native OS controls.",
      tags: ["Python", "Whisper", "Voice AI", "Win32 API", "PyTorch"],
      github: "https://github.com/Raja468/Drex-AI-Assisstant",
      image: "/drex.png",
      featured: true,
    },
    {
      slug: "iqra-school-system",
      number: "03",
      category: "software",
      badge: "Internal build",
      type: "Education / Operations platform",
      title: "Iqra School Management System",
      tagline: "Institutional platform with role-based student and faculty workflows.",
      description:
        "An end-to-end educational administration platform managing admissions, attendance tracking, automated grade calculation, fee vouchers, notices, and role-based permissions for administrators, faculty, and students.",
      tags: ["Flask", "SQLite", "Jinja2", "Tailwind CSS", "Chart.js"],
      github: "https://github.com/Raja468/iqra-school-system",
      image: "/lms.png",
      featured: false,
    },
    {
      slug: "enterprise-rag",
      number: "04",
      category: "ai",
      badge: "Architecture concept",
      type: "Enterprise AI / RAG",
      title: "Enterprise RAG Intelligence",
      tagline: "Private document reasoning engine with citation enforcement.",
      description:
        "A vector-indexed retrieval pipeline designed to synthesize answers across large collections of internal policy manuals, contracts, and codebases, with page-level citations and verification checks.",
      tags: ["Next.js", "Python", "Qdrant", "LangChain", "OpenAI"],
      github: "https://github.com/Raja468",
      image: "/hero.png",
      featured: false,
    },
  ],
} as const;