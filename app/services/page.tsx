"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Brain,
  CheckCircle2,
  CircuitBoard,
  Globe,
  Layers,
  Shield,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";

const allServices = [
  {
    number: "01",
    icon: CircuitBoard,
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
    number: "02",
    icon: Bot,
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
    number: "03",
    icon: Brain,
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
    number: "04",
    icon: Terminal,
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
    number: "05",
    icon: Globe,
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
    number: "06",
    icon: Sparkles,
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
    number: "07",
    icon: Shield,
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
    number: "08",
    icon: Wand2,
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
];

const engagementModels = [
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
];

export default function ServicesPage() {
  return (
    <main className="bg-bg-dark text-white pt-24 pb-28">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-[10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-accent/10 blur-[140px]"
          aria-hidden="true"
        />
        <Container>
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ae6b4]">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-mint" />
              Studio Capabilities
            </div>
            <h1 className="max-w-[850px] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              Full-spectrum intelligence.{" "}
              <span className="hero-glow-text block">Engineered for impact.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-text-secondary md:text-[18px]">
              We merge deep software engineering, practical applied AI, product design, and cybersecurity
              into a unified delivery engine. No generic chatbots — only reliable systems built to win.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* 8 Detailed Capabilities Grid */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Core Practices
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white tracking-tight">
              What we build
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {allServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <FadeUp key={svc.number}>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-bg-surface p-7 sm:p-9 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(25,216,210,0.12)]">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-bg-dark text-accent shadow-[0_0_15px_rgba(25,216,210,0.25)]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-[12px] font-semibold text-accent">
                          {svc.number}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-[22px] font-semibold text-white">
                        {svc.title}
                      </h3>
                      <p className="mt-2 text-[14px] font-medium text-accent/90">
                        {svc.headline}
                      </p>
                      <p className="mt-3 text-[14.5px] leading-[1.65] text-text-secondary">
                        {svc.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="mt-6 border-t border-border/70 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                          Key Deliverables
                        </span>
                        <ul className="mt-2.5 space-y-2">
                          {svc.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-2 text-[13.5px] text-text-secondary"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tech tags */}
                    <div className="mt-8 border-t border-border/70 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {svc.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-border bg-bg-dark px-2.5 py-0.5 font-mono text-[9px] uppercase text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="py-20 md:py-28 border-b border-border bg-bg-surface/30">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Partnership Options
            </span>
            <h2 className="mt-2 max-w-[600px] font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-white tracking-tight">
              Flexible engagement shaped around your outcomes.
            </h2>
          </FadeUp>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <FadeUp key={model.title}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-bg-dark p-8 transition-all hover:border-accent/40">
                  <div>
                    <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      {model.badge}
                    </span>
                    <h3 className="mt-5 font-display text-[22px] font-semibold text-white">
                      {model.title}
                    </h3>
                    <div className="mt-1 font-mono text-[12px] text-mint">
                      {model.timeline}
                    </div>
                    <p className="mt-4 text-[14px] leading-[1.6] text-text-secondary">
                      {model.description}
                    </p>

                    <div className="mt-6 border-t border-border/70 pt-4">
                      <ul className="space-y-2.5">
                        {model.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-[13px] text-text-secondary"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border">
                    <Link
                      href="/contact"
                      className="hero-neon-pill flex h-11 w-full items-center justify-center gap-2 text-[13px] font-semibold text-white"
                    >
                      <span>Inquire About {model.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <FadeUp className="rounded-3xl border border-accent/30 bg-gradient-to-br from-[#0a120e] to-bg-dark p-8 md:p-14 text-center shadow-[0_0_50px_rgba(25,216,210,0.1)]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Start Building
            </span>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white tracking-[-0.04em]">
              Not sure which service matches your problem?
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[16px] text-text-secondary leading-[1.6]">
              Share your current workflow bottlenecks or vision. Our architects will outline a practical roadmap on a free 30-minute consultation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="hero-neon-pill inline-flex h-12 items-center gap-2 px-8 text-[14px] font-semibold text-white"
              >
                <span>Request a Project Brief</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
