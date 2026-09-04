'use client'

import Image from 'next/image'
import { useState } from 'react'

const services = [
  { number: '01', title: 'AI automation', copy: 'Automate repetitive workflows, operations, and internal processes so your team can focus on what matters.', tags: ['Workflows', 'CRM automation', 'Integrations'] },
  { number: '02', title: 'AI agents', copy: 'Build AI employees that can understand tasks, use tools, and take action — customer support, sales, and operations.', tags: ['Customer support', 'Sales', 'Operations'] },
  { number: '03', title: 'LLM integration', copy: 'Put the right model in the right place with useful, secure interfaces — RAG pipelines, evaluation, and guardrails.', tags: ['RAG', 'Evaluation', 'Guardrails'] },
  { number: '04', title: 'Custom software', copy: 'Turn your idea into a reliable web application, SaaS product, or internal tool built for real-world use.', tags: ['Web apps', 'Dashboards', 'SaaS'] },
  { number: '05', title: 'Web experiences', copy: 'High-signal websites that make complex technology feel clear, credible, and easy to trust.', tags: ['Strategy', 'Development'] },
  { number: '06', title: 'AI development', copy: 'A practical technical partner for experiments, pilots, and ambitious new product ideas.', tags: ['Prototypes', 'MVPs'] },
]

const steps = [
  ['01', 'Discover', 'Understand your business, goals, and constraints before building anything.'],
  ['02', 'Design', 'Define the solution and create a focused prototype you can see and test.'],
  ['03', 'Build', 'Develop, integrate, test, and refine — two-week sprints with weekly demos.'],
  ['04', 'Launch', 'Deploy the product and help you move it into production. We stay on if you need us.'],
]

const projects = [
  { number: '01', type: 'AI / WhatsApp operations', title: 'ChatConnect AI', copy: 'AI-powered WhatsApp support & automation — knowledge-base responses, lead capture, human handoff, and business management dashboard.', tags: ['React', 'Express', 'PostgreSQL', 'Anthropic'], href: 'https://github.com/Raja468/chatconnect-ai', image: '/chatconnectai.png' },
  { number: '02', type: 'AI / Desktop automation', title: 'DREX AI Assistant', copy: 'A Windows desktop AI assistant with voice input/output, intent parsing, app control, web search, screenshots, and text mode.', tags: ['Python', 'Voice AI', 'Automation'], href: 'https://github.com/Raja468/Drex-AI-Assisstant', image: '/drex.png' },
  { number: '03', type: 'Education / Operations platform', title: 'Iqra School Management System', copy: 'A Flask school management application with admin, teacher, and student roles, attendance, fee tracking, and notices.', tags: ['Flask', 'SQLite', 'Jinja2'], href: 'https://github.com/Raja468/iqra-school-system', image: '/lms.png' },
]

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <article className="project-card">
      <a href={project.href} target="_blank" rel="noreferrer noopener" aria-label={`View ${project.title} on GitHub`}>
        <div className="project-image-wrap"><Image src={project.image} alt={project.title} fill className="project-image" /></div>
        <div className="project-info"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.copy}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-cta"><span>View on GitHub</span><span>↗</span></span></div>
      </a>
    </article>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      <section className="hero section-grid" id="top">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Drexa AI home"><Image src="/logo.png" alt="Drexa AI" width={56} height={56} className="brand-mark" priority /></a>
          <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
          <a className="nav-cta" href="https://wa.me/923715082737" target="_blank" rel="noreferrer noopener">Start a conversation <span>↗</span></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        </nav>
        <div className="hero-content shell">
          <div className="eyebrow"><span className="status-dot" />Independent AI technology studio<span className="eyebrow-line" /></div>
          <div className="hero-grid"><h1>Build what<br /><em>thinks forward.</em></h1><div className="hero-side"><p className="hero-lede">We build AI systems, automation, and digital products that help businesses work smarter and grow faster.</p><div className="hero-actions"><a className="button button-primary" href="https://wa.me/923715082737" target="_blank" rel="noreferrer noopener">Book a Free Consultation <span>↗</span></a><a className="text-link" href="#capabilities">Explore our services <span>↓</span></a></div></div></div>
          <div className="hero-bottom"><span>AI systems / digital products / 2026</span><span className="scroll-note">Scroll to explore <b>↓</b></span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-topline"><span>FIELD / 01</span><span>GENERATIVE SYSTEMS</span></div><div className="mesh"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="art-signal"><span>↗</span>intelligence, in motion</div><div className="art-cursor" /></div>
      </section>

      <section className="intro shell" id="capabilities"><div className="section-kicker">What we do <span>Capabilities</span></div><div className="intro-grid"><h2>Technology should<br /><em>move you forward.</em></h2><p>Not more noise. Not another generic chatbot. We combine product thinking, engineering discipline, and applied AI to create systems that earn their place in the real world.</p></div></section>
      <section className="services shell" aria-label="Services">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p><div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="card-arrow">↗</span></article>)}</section>
      <section className="projects shell" id="projects"><div className="section-kicker">Selected directions <span>Projects / 001—003</span></div><div className="projects-head"><h2>Ideas with<br /><em>somewhere to go.</em></h2><p className="projects-desc">A selection of systems we&apos;ve built across AI, automation, software products, and education technology.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></section>
      <section className="approach section-grid" id="approach"><div className="shell"><div className="section-kicker">A better way to build <span>Our approach</span></div><div className="approach-head"><h2>Small team.<br /><em>Serious output.</em></h2><p>We keep the room small and the thinking sharp. Every engagement is shaped around a clear outcome, not a bloated process.</p></div><div className="steps">{steps.map(([number, title, copy]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
      <section className="positioning shell"><div className="signal-box"><span className="signal-label">Why Drexa</span><div className="signal-copy"><h2>Built around outcomes.<br /><em>Not just code.</em></h2><p>We don&apos;t build technology just because we can. Every system starts with a real business problem. We focus on practical AI, clean architecture, and production-ready engineering — so what we build actually works.</p><div className="why-list"><div className="why-item"><span className="why-number">01</span><div><h3>AI that actually works</h3><p>Practical AI — automation, agents, integrations, and products that people can use. Not demos.</p></div></div><div className="why-item"><span className="why-number">02</span><div><h3>Small team. Direct communication.</h3><p>No layers of account managers. You work directly with the people building your solution.</p></div></div><div className="why-item"><span className="why-number">03</span><div><h3>Built for the long term</h3><p>Clean architecture, secure integrations, and production-ready engineering from day one.</p></div></div></div></div><div className="signal-mark" aria-hidden="true">↗</div></div></section>
      <section className="faq shell" id="faq"><div className="section-kicker">FAQ <span>Common questions</span></div><div className="faq-grid"><div className="faq-item"><h3>Do you work with startups or established businesses?</h3><p>Both. We work with teams that need to validate an idea, automate an existing process, or build a new digital product.</p></div><div className="faq-item"><h3>Can you integrate AI into our existing software?</h3><p>Yes. We can integrate LLMs, AI agents, RAG systems, APIs, automation platforms, and other AI capabilities into existing workflows.</p></div><div className="faq-item"><h3>Do you build custom software?</h3><p>Yes. We build custom web applications, SaaS products, dashboards, and AI-powered platforms.</p></div><div className="faq-item"><h3>How does the consultation work?</h3><p>We&apos;ll discuss your goals, understand the problem, and identify potential solutions. There&apos;s no obligation to continue.</p></div></div></section>
      <section className="contact section-grid" id="contact"><div className="shell contact-inner"><div className="section-kicker">Free consultation <span>Get started</span></div><h2>Have an idea? Let&apos;s turn it into reality.</h2><p>Get a free 30-minute consultation with our team. Whether you need AI automation, a custom web solution, or a smarter digital workflow, we&apos;ll help you find the best path forward.</p><div className="hero-actions"><a className="button button-primary" href="https://wa.me/923715082737" target="_blank" rel="noreferrer noopener">Book a Free Consultation <span>↗</span></a><span className="consult-note">30-minute call · No obligation · Practical recommendations</span></div></div></section>
      <footer className="footer shell"><a className="brand" href="#top" aria-label="Drexa AI home"><Image src="/logo.png" alt="Drexa AI" width={56} height={56} className="brand-mark" /></a><span>Intelligent solutions. Secure innovation.</span><span>© 2026 Drexa AI</span></footer>
    </main>
  )
}
