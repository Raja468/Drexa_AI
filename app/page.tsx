import Image from "next/image"
import Link from "next/link"
import {
  Bot,
  CircuitBoard,
  Cpu,
  Globe,
  Shield,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { ButtonLink } from "@/components/ui/Button"
import { ContactForm } from "@/components/ui/ContactForm"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/FadeUp"

const PRIMARY_CTA = { label: "Start a project", href: "/contact" }

const services = [
  {
    number: "01",
    icon: CircuitBoard,
    title: "AI automation",
    copy: "Automate repetitive workflows, operations, and internal processes so your team can focus on what matters.",
    tags: ["Workflows", "CRM automation", "Integrations"],
  },
  {
    number: "02",
    icon: Bot,
    title: "AI agents",
    copy: "Build AI employees that can understand tasks, use tools, and take action — customer support, sales, and operations.",
    tags: ["Customer support", "Sales", "Operations"],
  },
  {
    number: "03",
    icon: Cpu,
    title: "LLM integration",
    copy: "Put the right model in the right place with useful, secure interfaces — RAG pipelines, evaluation, and guardrails.",
    tags: ["RAG", "Evaluation", "Guardrails"],
  },
  {
    number: "04",
    icon: Terminal,
    title: "Custom software",
    copy: "Turn your idea into a reliable web application, SaaS product, or internal tool built for real-world use.",
    tags: ["Web apps", "Dashboards", "SaaS"],
  },
  {
    number: "05",
    icon: Globe,
    title: "Web experiences",
    copy: "High-signal websites that make complex technology feel clear, credible, and easy to trust.",
    tags: ["Strategy", "Development"],
  },
  {
    number: "06",
    icon: Sparkles,
    title: "AI development",
    copy: "A practical technical partner for experiments, pilots, and ambitious new product ideas.",
    tags: ["Prototypes", "MVPs"],
  },
  {
    number: "07",
    icon: Shield,
    title: "Cybersecurity",
    copy: "Harden your systems, audit integrations, and protect data — from small business tooling to production AI pipelines.",
    tags: ["Security audits", "Hardening", "Compliance"],
  },
  {
    number: "08",
    icon: Wand2,
    title: "Creative",
    copy: "Video editing, motion design, and graphic design that makes the technical work look like it belongs in the real world.",
    tags: ["Video", "Motion", "Graphic design"],
  },
]

const projects = [
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
]

const steps = [
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
]

const whyPillars = [
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
]

const faqs = [
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
]

export default function Page() {
  return (
    <main className="bg-bg-dark text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background:radial-gradient(60%_50%_at_50%_30%,rgba(25,216,210,0.22),transparent_70%)]" />
        <Container className="relative pt-16 pb-24 md:pt-24 md:pb-32">
          <FadeUp>
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_var(--mint)]" />
              Independent AI technology studio
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="max-w-[900px] font-display text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em] text-white">
              Build what <em className="text-accent not-italic">thinks forward.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-[560px] text-[17px] leading-[1.6] text-text-secondary">
              We build AI systems, automation, and digital products that help businesses
              work smarter and grow faster.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={PRIMARY_CTA.href} variant="primary" size="lg">
                {PRIMARY_CTA.label}
              </ButtonLink>
              <Link
                href="#capabilities"
                className="group inline-flex items-center gap-2 border-b border-border pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:border-accent hover:text-accent"
              >
                Explore our services
                <span className="text-accent transition-transform group-hover:translate-y-0.5">↓</span>
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-16 flex flex-col gap-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted sm:flex-row sm:justify-between">
              <span>AI systems / digital products / 2026</span>
              <span className="hidden sm:inline">Scroll to explore ↓</span>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="border-b border-border py-24 md:py-32">
        <Container>
          <SectionHeader
            label="What we do"
            title={
              <>
                Technology should <em className="text-accent not-italic">move you forward.</em>
              </>
            }
            description="Not more noise. Not another generic chatbot. We combine product thinking, engineering discipline, and applied AI to create systems that earn their place in the real world."
          />
          <StaggerContainer className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <StaggerItem
                  key={service.number}
                  className="group relative flex min-h-[280px] flex-col justify-between bg-bg-dark p-6 transition-colors duration-200 hover:bg-bg-surface md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {service.number}
                    </span>
                    <Icon
                      className="h-6 w-6 text-text-secondary transition-colors group-hover:text-accent"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-medium leading-tight text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">
                      {service.copy}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-b border-border py-24 md:py-32">
        <Container>
          <SectionHeader
            label="Selected directions"
            title={
              <>
                Ideas with <em className="text-accent not-italic">somewhere to go.</em>
              </>
            }
            description="A selection of systems we've built across AI, automation, software products, and education technology. These are our own internal and R&D builds — not client work."
          />
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.number}>
                <article className="group flex h-full flex-col border border-border bg-bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/60">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${project.title} on GitHub`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-elevated">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                          {project.type}
                        </span>
                        <span className="border border-border bg-bg-elevated px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
                          {project.label}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[22px] font-medium leading-tight tracking-[-0.02em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">
                        {project.copy}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white transition-colors group-hover:text-accent">
                        View on GitHub <span className="text-accent">↗</span>
                      </span>
                    </div>
                  </a>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* APPROACH */}
      <section id="approach" className="border-b border-border py-24 md:py-32">
        <Container>
          <SectionHeader
            label="A better way to build"
            title={
              <>
                Small team. <em className="text-accent not-italic">Serious output.</em>
              </>
            }
            description="We keep the room small and the thinking sharp. Every engagement is shaped around a clear outcome, not a bloated process."
          />
          <StaggerContainer className="border-t border-border">
            {steps.map((step) => (
              <StaggerItem
                key={step.number}
                className="grid gap-6 border-b border-border py-8 md:grid-cols-[120px_1fr] md:gap-12 md:py-10"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[22px] font-medium leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] text-text-secondary">
                    {step.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* WHY DREXA */}
      <section className="border-b border-border py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <FadeUp>
              <span className="mb-5 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Why Drexa
              </span>
              <h2 className="max-w-[420px] font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
                Built around outcomes. <em className="text-accent not-italic">Not just code.</em>
              </h2>
              <p className="mt-6 max-w-[440px] text-[16px] leading-[1.65] text-text-secondary">
                We don&apos;t build technology just because we can. Every system starts with a real
                business problem. We focus on practical AI, clean architecture, and production-ready
                engineering — so what we build actually works.
              </p>
            </FadeUp>
            <StaggerContainer className="border-t border-border">
              {whyPillars.map((pillar) => (
                <StaggerItem
                  key={pillar.number}
                  className="grid grid-cols-[56px_1fr] gap-6 border-b border-border py-8"
                >
                  <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    {pillar.number}
                  </span>
                  <div>
                    <h3 className="text-[18px] font-medium leading-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-text-secondary">
                      {pillar.copy}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-border py-24 md:py-32">
        <Container>
          <SectionHeader
            label="FAQ"
            title="Common questions"
            description="The things people ask us most before reaching out."
          />
          <StaggerContainer className="grid gap-px bg-border md:grid-cols-2">
            {faqs.map((item) => (
              <StaggerItem
                key={item.q}
                className="bg-bg-dark p-7 transition-colors duration-200 hover:bg-bg-surface md:p-8"
              >
                <h3 className="text-[16px] font-medium leading-snug text-white">{item.q}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-text-secondary">{item.a}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <FadeUp>
              <span className="mb-6 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                Get started
              </span>
              <h2 className="max-w-[600px] font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1] tracking-[-0.04em] text-white">
                Have an idea? <em className="text-accent not-italic">Let&apos;s build it.</em>
              </h2>
              <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-text-secondary">
                Get a free 30-minute consultation with our team. Whether you need AI automation,
                a custom web solution, cybersecurity, or creative work, we&apos;ll help you find the
                best path forward.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4">
                <ButtonLink href={PRIMARY_CTA.href} variant="primary" size="lg">
                  {PRIMARY_CTA.label}
                </ButtonLink>
                <a
                  href="https://wa.me/923715082737"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border-b border-border pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  Or message us on WhatsApp <span className="text-accent">↗</span>
                </a>
                <a
                  href="mailto:hello@drexa.tech"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent"
                >
                  hello@drexa.tech <span className="text-accent">↗</span>
                </a>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                30-minute call · No obligation · Practical recommendations
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="border border-border bg-bg-surface p-7 md:p-8">
                <h3 className="text-[18px] font-medium leading-tight text-white">
                  Or send a project brief
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-text-secondary">
                  Tell us what you&apos;re working on. We&apos;ll reply within one business day.
                </p>
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>
    </main>
  )
}
