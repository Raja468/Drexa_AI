'use client'

import Image from 'next/image'
import { useState } from 'react'

const services = [
  { number: '01', title: 'AI automation', copy: 'Turn repetitive operations into reliable systems that run quietly in the background.', tags: ['Workflows', 'Integrations'] },
  { number: '02', title: 'LLM integration', copy: 'Put the right model in the right place with useful, secure interfaces around it.', tags: ['RAG', 'Evaluation'] },
  { number: '03', title: 'Agentic AI', copy: 'Design capable agents that can reason, use tools, and move work forward with guardrails.', tags: ['Agents', 'Tool use'] },
  { number: '04', title: 'Software products', copy: 'From first prototype to production-grade software, built for the way your team works.', tags: ['Web apps', 'Platforms'] },
  { number: '05', title: 'Web experiences', copy: 'High-signal websites that make complex technology feel clear, credible, and easy to trust.', tags: ['Strategy', 'Development'] },
  { number: '06', title: 'AI development', copy: 'A practical technical partner for experiments, pilots, and ambitious new product ideas.', tags: ['Prototypes', 'MVPs'] },
]

const steps = [
  ['01', 'Map the opportunity', 'We get close to the problem, the people, and the constraints before reaching for a solution.'],
  ['02', 'Build the first signal', 'A focused prototype makes the idea tangible and creates a fast path to learning.'],
  ['03', 'Engineer for reality', 'Once it works, we add the rigor, integrations, and polish needed for real adoption.'],
]

const projects = [
  { number: '01', type: 'AI / WhatsApp operations', title: 'ChatConnect AI', copy: 'An AI-powered WhatsApp customer support platform with knowledge-base answers, lead capture, human handoff, and an owner dashboard.', tags: ['React', 'Express', 'PostgreSQL', 'Anthropic'], href: 'https://github.com/Raja468/chatconnect-ai', image: '/chatconnectai.png' },
  { number: '02', type: 'AI / Desktop automation', title: 'DREX AI Assistant', copy: 'A Windows desktop AI assistant with voice input and output, intent parsing, app control, web search, screenshots, and text mode.', tags: ['Python', 'Voice AI', 'Automation'], href: 'https://github.com/Raja468/Drex-AI-Assisstant', image: '/drex.png' },
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
          <div className="hero-grid"><h1>Build what<br /><em>thinks forward.</em></h1><div className="hero-side"><p className="hero-lede">Drexa AI helps ambitious teams turn intelligent ideas into useful, durable products.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Bring us a problem <span>↗</span></a><a className="text-link" href="#capabilities">Explore capabilities <span>↓</span></a></div></div></div>
          <div className="hero-bottom"><span>AI systems / digital products / 2026</span><span className="scroll-note">Scroll to explore <b>↓</b></span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-topline"><span>FIELD / 01</span><span>GENERATIVE SYSTEMS</span></div><div className="mesh"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="art-signal"><span>↗</span>intelligence, in motion</div><div className="art-cursor" /></div>
      </section>

      <section className="intro shell" id="capabilities"><div className="section-kicker">What we do <span>Capabilities</span></div><div className="intro-grid"><h2>Technology should<br /><em>move you forward.</em></h2><p>Not more noise. Not another generic chatbot. We combine product thinking, engineering discipline, and applied AI to create systems that earn their place in the real world.</p></div></section>
      <section className="services shell" aria-label="Services">{services.map((service) => <article className="service-card" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.copy}</p><div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><span className="card-arrow">↗</span></article>)}</section>
      <section className="projects shell" id="projects"><div className="section-kicker">Selected directions <span>Projects / 001—003</span></div><div className="projects-head"><h2>Ideas with<br /><em>somewhere to go.</em></h2><p className="projects-desc">A selection of systems we&apos;ve built across AI, automation, software products, and education technology.</p></div><div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></section>
      <section className="approach section-grid" id="approach"><div className="shell"><div className="section-kicker">A better way to build <span>Our approach</span></div><div className="approach-head"><h2>Small team.<br /><em>Serious output.</em></h2><p>We keep the room small and the thinking sharp. Every engagement is shaped around a clear outcome, not a bloated process.</p></div><div className="steps">{steps.map(([number, title, copy]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
      <section className="positioning shell"><div className="signal-box"><span className="signal-label">Drexa signal / 001</span><div className="signal-copy"><h2>Early by design.<br /><em>Ready for what&apos;s next.</em></h2><p>We&apos;re opening our first engagements with teams who want to move before the market catches up. No case-study theatre. Just clear thinking, thoughtful craft, and a bias toward making.</p><a className="text-link" href="#contact">Let&apos;s make something useful <span>↗</span></a></div><div className="signal-mark" aria-hidden="true">↗</div></div></section>
      <section className="contact section-grid" id="contact"><div className="shell contact-inner"><div className="section-kicker">Your next move <span>Get in touch</span></div><h2>Have a hard problem?<br /><em>Good.</em></h2><p>Tell us what you&apos;re trying to make, fix, or understand. We&apos;ll tell you honestly if we can help.</p><div className="hero-actions"><a className="button button-primary" href="https://wa.me/923715082737" target="_blank" rel="noreferrer noopener">Start a conversation on WhatsApp <span>↗</span></a><a className="text-link" href="mailto:hello@drexa.tech">hello@drexa.tech <span>↗</span></a></div></div></section>
      <footer className="footer shell"><a className="brand" href="#top" aria-label="Drexa AI home"><Image src="/logo.png" alt="Drexa AI" width={56} height={56} className="brand-mark" /></a><span>Intelligent solutions. Secure innovation.</span><span>© 2026 Drexa AI</span></footer>
    </main>
  )
}
