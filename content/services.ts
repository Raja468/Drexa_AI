/**
 * Services page copy — the single source of truth for /services.
 *
 * In Phase 0 (brief §12) the page's hard-coded items and engagement models
 * were moved here verbatim; where this module's older draft drifted from the
 * live page copy (e.g. the LLM headline, the WebGL phrasing), the page's
 * rendered strings won so the page output is unchanged. Icons are mapped by
 * position in the page; this file stays pure data.
 */
export const servicesPage = {
  hero: {
    eyebrow: "Studio capabilities",
    title: "Full-spectrum intelligence. Engineered for impact.",
    accent: "Engineered for impact.",
    description:
      "We merge deep software engineering, practical applied AI, product design, and cybersecurity into a unified delivery engine. No generic chatbots — only reliable systems built to win.",
  },

  cta: {
    eyebrow: "Start building",
    title: "Not sure which service matches your problem?",
    description:
      "Share your current workflow bottlenecks or vision. Our architects will outline a practical roadmap on a free 30-minute consultation.",
    label: "Request a project brief",
    href: "/contact",
  },

  practices: { label: "Core Practices", title: "What we build" },

  items: [
    {
      slug: "ai-automation",
      title: "AI Automation & Workflows",
      headline: "Eliminate manual operational drag and scale without increasing headcount.",
      description:
        "We design automated, resilient pipelines that connect your databases, customer channels, and internal tools. Repetitive manual workflows are replaced by self-healing automation routines.",
      deliverables: [
        "WhatsApp & omnichannel customer automation",
        "CRM synchronization (HubSpot, Salesforce)",
        "Automated lead capture & qualification engines",
        "Webhook & third-party API orchestration",
      ],
      tech: ["Python", "FastAPI", "WhatsApp Cloud API", "PostgreSQL", "Redis"],
    },
    {
      slug: "ai-agents",
      title: "Autonomous AI Agents",
      headline: "Digital team members capable of reasoning, using tools, and taking real action.",
      description:
        "Beyond basic scripted bots: we develop goal-oriented AI agents that can browse systems, trigger APIs, verify input, query databases, and resolve complex multi-step tasks independently.",
      deliverables: [
        "Customer support & resolution agents",
        "Internal knowledge copilots for staff",
        "Autonomous lead research & outreach bots",
        "Human-in-the-loop oversight consoles",
      ],
      tech: ["Anthropic Claude", "LangGraph", "OpenAI Tools", "LlamaIndex"],
    },
    {
      slug: "llm-rag",
      title: "LLM & RAG Intelligence",
      headline: "Private, hallucination-free document reasoning over proprietary company data.",
      description:
        "Vector embeddings and semantic search architectures tailored to your internal documentation, legal contracts, and historical data — complete with exact citations and strict security guardrails.",
      deliverables: [
        "Enterprise Retrieval-Augmented Generation (RAG)",
        "Vector database indexing & hybrid search",
        "Hallucination detection & guardrail systems",
        "Model evaluation & benchmarking frameworks",
      ],
      tech: ["Qdrant", "Pinecone", "LangChain", "OpenAI", "Voyage AI"],
    },
    {
      slug: "custom-software",
      title: "Custom Software & SaaS",
      headline: "Reliable, high-performance web applications built for production scale.",
      description:
        "From zero to production: we engineer modern web platforms, internal admin dashboards, and scalable SaaS solutions engineered with type safety, clean architectures, and responsive interfaces.",
      deliverables: [
        "Full-stack web applications & SaaS",
        "Executive reporting & telemetry dashboards",
        "Multi-tenant database architectures",
        "Secure authentication & RBAC hierarchies",
      ],
      tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
    },
    {
      slug: "web-experiences",
      title: "High-Signal Web Experiences",
      headline: "Digital presences that turn complex technology into credible business advantage.",
      description:
        "We build modern, aesthetic web experiences with fluid WebGL 3D elements, sleek micro-animations, and instant load times that position your company as a category leader.",
      deliverables: [
        "Flagship corporate web applications",
        "Interactive 3D WebGL scenes & canvas systems",
        "Responsive design systems & token libraries",
        "Sub-second page load performance & SEO",
      ],
      tech: ["Three.js", "React", "Framer Motion", "Tailwind CSS", "Vercel"],
    },
    {
      slug: "ai-rnd",
      title: "AI R&D & Rapid Prototypes",
      headline: "Validate high-risk, ambitious ideas in weeks before committing capital.",
      description:
        "Got an unproven AI concept? We design proof-of-concept experiments, desktop voice integrations, and functional interactive MVPs that you can demo to customers and investors.",
      deliverables: [
        "Functional 2-week MVP builds",
        "Desktop & native OS voice assistants",
        "Computer vision & screen analysis experiments",
        "API viability & architectural feasibility reports",
      ],
      tech: ["Python", "PyTorch", "Whisper", "Win32 API", "FastAPI"],
    },
    {
      slug: "cybersecurity",
      title: "Cybersecurity & Hardening",
      headline: "Identify vulnerabilities and protect your systems before bad actors do.",
      description:
        "Comprehensive security reviews for modern applications and AI integrations. We audit endpoints, secure LLM prompts against prompt injection, and harden cloud infrastructure.",
      deliverables: [
        "Web application penetration testing",
        "LLM prompt injection & jailbreak audits",
        "Cloud architecture hardening (AWS / Linux)",
        "Vulnerability remediation roadmaps",
      ],
      tech: ["OWASP ZAP", "Burp Suite", "Linux Hardening", "NIST Framework"],
    },
    {
      slug: "creative",
      title: "Creative Motion & Media",
      headline: "Translating sophisticated technical engineering into undeniable visual power.",
      description:
        "High-end motion graphics, technical product walkthroughs, and UI design that clarify complex engineering architectures and make your technical product look world-class.",
      deliverables: [
        "Technical product demo videos",
        "High-fidelity UI/UX design in Figma",
        "Dynamic interactive motion graphics",
        "Investor pitch & product narrative visuals",
      ],
      tech: ["Figma", "After Effects", "Spline", "Premiere Pro"],
    },
  ],

  engagement: {
    label: "Partnership Options",
    title: "Flexible engagement shaped around your outcomes.",
    models: [
      {
        badge: "Fastest Start",
        title: "Sprint Engagement",
        timeline: "2 to 4 Weeks",
        description:
          "Ideal for rapid MVPs, AI feasibility prototypes, automation workflows, or focused security audits with clear scope and fixed delivery.",
        features: [
          "Dedicated senior engineer pair",
          "Weekly milestone demos",
          "Full source code & documentation handover",
          "Post-launch bug warranty",
        ],
      },
      {
        badge: "Most Popular",
        title: "Dedicated Technical Partner",
        timeline: "Ongoing (Monthly Retainer)",
        description:
          "Continuous product engineering, proactive AI automation scaling, systems architecture, and security oversight tailored to your roadmap.",
        features: [
          "Full-stack & AI engineering pod",
          "Direct Slack/Discord communication",
          "Flexible roadmap prioritization",
          "Continuous deployment & monitoring",
        ],
      },
      {
        badge: "High Leverage",
        title: "Architecture & Advisory",
        timeline: "Ad-hoc / Bi-weekly",
        description:
          "Strategic consulting for leadership teams evaluating AI vendors, model architectures, LLM security guardrails, and technical hiring.",
        features: [
          "1-on-1 sessions with AI Architects",
          "Detailed architectural blueprint reviews",
          "Vendor & tech stack evaluation",
          "Security & compliance guidance",
        ],
      },
    ],
  },
} as const;
