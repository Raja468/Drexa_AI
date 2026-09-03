export const home = {
  hero: { eyebrow: "Digital products · AI · Automation", headline: "We build digital products that move businesses forward.", subhead: "Strategy, design, engineering and AI automation for ambitious businesses.", cta: { label: "Start a project", href: "/contact" }, ctaSecondary: { label: "View our work", href: "/#work" } },
  work: { label: "Selected work", title: "Projects, not promises.", description: "From AI-powered platforms to high-performance digital experiences, we turn complex ideas into products people can actually use.", items: [
    { slug: "rag-policy-bot", number: "01", name: "RAG Policy Assistant", industry: "AI · Automation", description: "An internal assistant for finding answers across complex policy systems.", tags: ["AI", "Automation", "Web"], href: "/work", featured: true },
    { slug: "pentest-reporting", number: "02", name: "Pentest Reporting Portal", industry: "Digital product", description: "A focused workspace for triaging findings and moving security work forward.", tags: ["Product", "Engineering"], href: "/work", featured: false },
    { slug: "creator-newsletter", number: "03", name: "Creator Newsletter Platform", industry: "Digital experience", description: "A fast, flexible publishing experience built around the people using it.", tags: ["Design", "Web"], href: "/work", featured: false },
  ] },
  services: { label: "Capabilities", title: "From idea to intelligent product.", description: "We combine strategy, design, software engineering, and AI automation to build digital systems that solve real business problems.", items: [
    { number: "01", title: "AI & Automation", description: "AI agents, LLM applications, workflow automation, WhatsApp automation, and AI integrations.", flow: ["Input", "AI", "Decision", "Action"] },
    { number: "02", title: "Digital Products", description: "Web applications, SaaS platforms, dashboards, internal tools, APIs, and systems.", flow: ["Interface", "Application", "System", "People"] },
    { number: "03", title: "Product Design", description: "UX strategy, UI design, design systems, prototyping, and interaction design.", flow: ["Understand", "Explore", "Define", "Design"] },
    { number: "04", title: "Engineering", description: "Frontend, backend, cloud, databases, and integrations built for real-world use.", flow: ["Frontend", "API", "Services", "Database"] },
  ] },
  whyUs: { label: "Why DREXA", title: "Technology should create an advantage.", description: "We don't build software for the sake of building software. We combine product thinking, engineering, and AI to create systems that make businesses faster, smarter, and easier to operate.", principles: [
    { number: "01", title: "Product thinking", description: "We start with the problem, not the technology." },
    { number: "02", title: "AI-native", description: "AI isn't an add-on. It's part of how we think about products." },
    { number: "03", title: "Engineering depth", description: "Designed beautifully. Built properly." },
    { number: "04", title: "Built for outcomes", description: "The finished product should change something." },
  ] },
  process: { label: "How we work", title: "From first idea to finished product.", description: "A focused process keeps strategy, design, engineering, and delivery moving in the same direction.", steps: [
    { number: "01", title: "Discover", body: "Understand the problem before building anything.", meta: "Research · Requirements · Strategy" }, { number: "02", title: "Design", body: "Turn the idea into a clear product experience.", meta: "UX · UI · Architecture · Prototype" }, { number: "03", title: "Build", body: "Engineer the product for real-world use.", meta: "Engineering · AI · APIs · Automation" }, { number: "04", title: "Launch & improve", body: "Ship, measure, and make it better.", meta: "Launch · Analytics · Optimization · Support" },
  ] },
  techStack: { label: "Technology", title: "Built on the right technology.", description: "We choose tools around the product, not the other way around. Modern technologies give us the flexibility to build fast, reliable, and scalable systems.", categories: [
    { title: "AI & Intelligence", items: ["OpenAI", "Anthropic", "Google AI", "LangChain", "Python"] }, { title: "Product", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] }, { title: "Backend & Data", items: ["Node.js", "Python", "PostgreSQL", "Redis"] }, { title: "Infrastructure", items: ["Docker", "Cloudflare", "Vercel", "AWS"] },
  ] },
  finalCta: { label: "Start a project", title: "Have an idea worth building?", body: "Tell us what you're trying to solve. We'll help turn the idea into a clear plan, and a product built to work.", cta: { label: "Start a project", href: "/contact" }, secondary: { label: "Talk to us", href: "/contact" } },
} as const;
