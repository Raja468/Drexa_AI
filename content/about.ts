/**
 * About page copy.
 *
 * `stats` originally carried a fourth entry — "< 500ms avg interface & API
 * latency". That is an unverifiable performance claim, so it is not included;
 * the three that remain describe how the studio works, which is checkable
 * against the process. The grid is sized for what is here.
 */
export const aboutPage = {
  hero: {
    eyebrow: "Studio philosophy",
    title: "We build what thinks forward.",
    accent: "thinks forward.",
    description:
      "DREXA AI is an independent software engineering and applied AI studio. We partner with ambitious founders, growing companies, and innovators to turn complex operational friction into effortless, high-performing digital systems.",
  },

  cta: {
    eyebrow: "Start a dialogue",
    title: "Have a problem worth solving?",
    description:
      "Tell us about what you are trying to build. We will review your requirements and provide honest, practical recommendations.",
    label: "Get in touch",
    href: "/contact",
  },

  stats: [
    { value: "100%", label: "IP Ownership Handover" },
    { value: "2-Week", label: "Iterative Sprint Demos" },
    { value: "0", label: "Middlemen Account Layers" },
  ],

  narrative: {
    label: "The Narrative",
    title: "Why we built an independent technology studio.",
    paragraphs: [
      "The modern software industry is saturated with bloated traditional consultancies that move glacially, and superficial AI creators pushing flimsy wrapper demos.",
      "We started Drexa AI to offer a high-signal alternative: a tight-knit squad of senior engineers and designers who build serious software. We believe that applying artificial intelligence to a business is not about flashy party tricks — it is about saving hundreds of engineering hours, automating critical communication channels, and giving your business an undeniable operational moat.",
      "Every project we ship is treated with uncompromising craft. Clean codebase architecture, modern reactive user experiences, strict type safety, and real production endurance.",
    ],
  },

  convictions: {
    label: "Guiding Principles",
    title: "What we stand for",
    items: [
      {
        number: "01",
        title: "Engineering over hype",
        description:
          "Most AI products today are fragile wrappers around generic APIs. We architect production-hardened systems with evaluation benchmarks, fallback pipelines, and deterministic reliability.",
      },
      {
        number: "02",
        title: "Zero account manager bureaucracy",
        description:
          "Nothing gets lost in translation. You collaborate directly with the lead engineers, AI architects, and designers actively writing your software.",
      },
      {
        number: "03",
        title: "Complete client IP ownership",
        description:
          "From day one, you own 100% of your code, repository, database schemas, prompt libraries, and deployment scripts. No vendor lock-in, ever.",
      },
      {
        number: "04",
        title: "Speed with architectural depth",
        description:
          "We believe in tight 2-week iterative shipping cadences, but never at the expense of type safety, maintainability, and security hardening.",
      },
    ],
  },

  stack: {
    label: "Engineering Stack",
    title: "Modern tools chosen for durability, speed, and scale.",
    groups: [
      {
        category: "AI & Intelligence",
        items: ["Anthropic Claude", "OpenAI GPT", "LangChain", "Qdrant", "Whisper", "PyTorch"],
      },
      {
        category: "Full-Stack Software",
        items: ["Next.js 16", "React 19", "TypeScript", "Python / FastAPI", "Node.js", "Flask"],
      },
      {
        category: "Data & Storage",
        items: ["PostgreSQL", "Redis", "Pinecone", "SQLite", "Prisma"],
      },
      {
        category: "Infrastructure & Security",
        items: ["Docker", "Cloudflare", "AWS", "Linux Hardening", "OWASP"],
      },
    ],
  },
} as const;