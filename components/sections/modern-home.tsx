import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { ProjectFrame, type MockName } from '@/components/mockups/MockFrame'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion/FadeUp'
import { Magnetic } from '@/components/motion/Magnetic'
import { ServicesCarousel } from '@/components/sections/services-carousel'
import HeroVisual from '@/components/HeroVisual'

const services = [
  { num: '01', title: 'Website Security', href: '/services/cybersecurity', copy: 'We test your website the way an attacker would, then fix what we find. WordPress, Shopify, Wix, or custom-built. Clear report, plain language, no scare tactics.', tags: ['Pentesting', 'Audit', 'Monitoring'] },
  { num: '02', title: 'AI Visibility', href: '/services/ai-visibility', copy: 'More customers now ask ChatGPT, Claude, and Google AI instead of searching. We check if AI mentions your business, then fix the reasons it does not.', tags: ['ChatGPT', 'Claude', 'Gemini'] },
  { num: '03', title: 'Web Development', href: '/services/web-development', copy: 'Fast, secure, search-ready websites that bring in enquiries, not just look good.', tags: ['Next.js', 'React', 'Tailwind'] },
  { num: '04', title: 'Software and App Development', href: '/services/software-development', copy: 'Custom web apps, internal tools, and mobile apps built to your process.', tags: ['Node.js', 'PostgreSQL', 'Express'] },
  { num: '05', title: 'AI Automation', href: '/services/ai-automation', copy: 'WhatsApp bots, lead capture, document processing, workflow automation.', tags: ['Python', 'Anthropic', 'Node.js'] },
]

type Project = {
  title: string
  copy: string
  tags: string[]
  href: string
  alt: string
  mock?: MockName
  image?: string
}

const projects: Project[] = [
  { title: 'ChatConnect AI', copy: 'WhatsApp support automation with knowledge-base answers, lead capture, and human handoff. Built to integrate directly with existing CRM platforms.', tags: ['React', 'Express', 'PostgreSQL', 'Anthropic'], mock: 'chatconnect', alt: 'ChatConnect AI dashboard with demo data: conversations today, leads captured, and recent conversations', href: '/work/chatconnect-ai' },
  { title: 'Drex AI Assistant', copy: 'Windows desktop AI assistant with voice input and output, app control, and web search. Replaces standard OS search with intelligent workflows.', tags: ['Python', 'Voice AI'], image: '/drex.png', alt: 'Drex AI Assistant interface', href: '/work/drex-ai-assistant' },
  { title: 'Iqra School Management System', copy: 'School management app with admin, teacher, and student roles, attendance, fees, and notices. Built to handle low-bandwidth environments.', tags: ['Flask', 'SQLite'], mock: 'iqra', alt: 'Iqra school dashboard with demo data: enrolment stats, student register, and notices', href: '/work/iqra-school-management' },
]

const process = [
  ['01', 'Discover', 'We learn your business, your goals, and your limits before suggesting anything.'],
  ['02', 'Design', 'We define the solution and show you a clear plan or prototype you can react to.'],
  ['03', 'Build', 'We build in short cycles and show you progress regularly.'],
  ['04', 'Launch & support', 'We deploy, test, hand over everything, and stay available after launch.']
]

const faqs = [
  ['Do you work with startups or established businesses?', 'Both. We work with teams that need to validate an idea, automate an existing process, or build a new digital product.'],
  ['Can you add AI to our existing software?', 'Yes. We can connect AI models, chatbots, and automation to your existing website, CRM, or internal tools through APIs.'],
  ['How much does a project cost?', 'It depends on scope. After the free consultation you receive a fixed-scope quote, so you know the price before work begins.'],
  ['How long does a project take?', 'Simple websites and automations take 1 to 3 weeks. Custom software is usually 4 to 12 weeks, depending on size.'],
  ['Who owns the code after the project?', 'You do. Code, designs, and documentation are handed over at launch.'],
  ['Do you offer support after launch?', 'Yes. We offer optional monthly support for updates, fixes, and monitoring.']
]

const Button = ({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) => (
  <Link href={href} className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21F48B] ${secondary ? 'border border-white/20 text-[#F2F2EE] hover:-translate-y-0.5 hover:bg-white/5' : 'bg-accent text-accent-foreground hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0'}`}>
    {children}
    <ArrowRight size={16} className="transition group-hover:translate-x-[3px]" />
  </Link>
)

const Section = ({ id, number, title, children, dark = false, noBorderTop = false }: any) => {
  const borderColor = dark ? 'border-[#2A2D33]' : 'border-[#2A2D33]'
  return (
    <section id={id} className={`relative ${noBorderTop ? '' : `border-t ${borderColor}`} ${dark ? 'bg-[#09090B] text-[#F2F2EE]' : 'bg-[#09090B] text-[#F2F2EE]'}`}>
      <div className={`mx-auto flex max-w-[1440px] flex-col border-x ${borderColor} lg:flex-row`}>
        {title && (
          <div className={`lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r ${borderColor} p-6 md:p-8 lg:p-10`}>
            <div className={`sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] ${dark ? 'text-[#A1A1AA]' : 'text-[#A1A1AA]'}`}>
              {number} / {title}
            </div>
          </div>
        )}
        <div className={`flex-1 ${title ? '' : 'w-full'}`}>
          {children}
        </div>
      </div>
    </section>
  )
}

export function ModernHome() {
  return (
    <main className="bg-[#09090B]">
      {/* HERO */}
      <Section noBorderTop dark>
        <div className="grid gap-12 overflow-x-clip px-6 py-14 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:px-16 lg:py-28">
          <div className="relative isolate flex flex-col justify-center pt-8">
            {/* Decorative ghost wordmark — adds depth only, sits behind the copy.
                Purely visual (aria-hidden); no gradient/glow, just a muted tone. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 left-0 -z-10 select-none font-display text-[104px] font-[800] leading-none tracking-[-0.04em] text-[#1E2126] md:text-[190px]"
            >
              Drexa
            </span>

            <FadeUp animateOnMount y={24} duration={0.6}>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#F2F2EE]">
                  Independent AI technology studio
                </span>
              </div>
            </FadeUp>

            <FadeUp animateOnMount delay={0.1} y={32} duration={0.8}>
              <h1 className="mt-6 font-display text-[40px] font-[800] leading-[1.02] tracking-[-0.03em] md:text-[72px]">
                Websites that are secure, found on Google, and <em className="font-serif text-accent-dark italic font-normal">recommended by AI.</em>
              </h1>
            </FadeUp>
            <FadeUp animateOnMount delay={0.2}>
              <p className="mt-8 max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">
                Drexa AI helps businesses protect their websites, show up when customers ask ChatGPT or Google, and build the software they need. Based in Chakwal, Pakistan. Open to projects worldwide. You deal directly with the person doing the work.
              </p>
            </FadeUp>
            <FadeUp animateOnMount delay={0.32}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Magnetic strength={8}><Button href="/contact">Book a free consultation</Button></Magnetic>
                <Magnetic strength={8}><Button href="/work" secondary>See what we have built</Button></Magnetic>
                <Magnetic strength={8}><Button href="/security-score" secondary>Free security score check</Button></Magnetic>
              </div>
              <p className="mt-4 max-w-[60ch] rounded-lg border border-highlight bg-highlight-tint px-4 py-3 text-[14px] leading-[1.6] text-foreground">
                Free tools, no login: <Link href="/security-score" className="font-semibold text-accent underline underline-offset-4">security score 95/100</Link> and <Link href="/seo-check" className="font-semibold text-accent underline underline-offset-4">SEO check 100/100</Link> on our own site — check yours in seconds.
              </p>
            </FadeUp>
            <FadeUp animateOnMount delay={0.44}>
              <div className="mt-8 flex flex-col gap-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#A1A1AA]">
                  Free 30-minute call. No obligation.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#F2F2EE]">3 internal builds shipped</span>
                  <span className="h-3.5 w-px bg-[#2A2D33]" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-x-3 text-[13px] font-medium text-[#8A8D93]">
                    <span>React</span><span>Python</span><span>PostgreSQL</span><span>Anthropic</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>
      </Section>

      <div className="border-t border-[#2A2D33]">
         <div className="mx-auto max-w-[1440px] border-x border-[#2A2D33] p-4 text-center font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
            Independent studio / Remote-first / Open to projects worldwide
         </div>
      </div>

      {/* TRUST STRIP */}
      <section className="border-t border-[#2A2D33] bg-[#141416]">
        <StaggerContainer className="mx-auto grid max-w-[1440px] border-x border-[#2A2D33] md:grid-cols-4 md:divide-x md:divide-[#2A2D33]">
          {[
            ['DIRECT COMMUNICATION', 'No account managers'],
            ['YOU OWN EVERYTHING', 'Code, designs, documentation'],
            ['FIXED SCOPE', 'Agreed before work starts'],
            ['SECURITY BUILT IN', 'Not added at the end']
          ].map(([label, text]) => (
            <StaggerItem key={label} className="group p-6 md:p-8 transition-colors duration-300 hover:bg-[#141416]">
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#F2F2EE] transition-colors duration-300 group-hover:text-accent-dark-dark">{label}</p>
              <p className="mt-2 text-[15px] text-[#A1A1AA]">{text}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 01 SERVICES - full-width, centred, wide cards */}
      <section className="relative border-t border-[#2A2D33] bg-[#09090B] text-[#F2F2EE]">
        <div className="mx-auto max-w-[1280px] border-x border-[#2A2D33]">
          <div className="border-b border-[#2A2D33] px-6 py-12 text-center md:px-10 md:py-16 lg:px-12 lg:py-20">
            <FadeUp>
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">01 / Services</p>
              <h2 className="mt-4 font-display text-[28px] font-bold tracking-[-0.02em] md:text-[44px]">
                Five services. <em className="font-serif font-normal italic text-accent-dark">One team.</em>
              </h2>
            </FadeUp>
          </div>
          <ServicesCarousel services={services} />
        </div>
      </section>

      {/* FREE TOOLS STRIP */}
      <section className="border-t border-[#2A2D33] bg-[#141416]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 border-x border-[#2A2D33] p-8 md:flex-row md:items-center md:justify-between md:p-10 lg:p-12">
          <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#F2F2EE]">
            Check your website in seconds. No login. Security score and SEO check. Both run on our own site first.
          </p>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link href="/security-score" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
              Free security score check <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
            <Link href="/seo-check" className="group inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/5">
              Free SEO check <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 02 PROCESS */}
      <Section number="02" title="Process" dark>
         <div className="p-8 py-20 md:p-14 lg:p-20">
           <StaggerContainer className="grid md:grid-cols-4 md:divide-x md:divide-[#2A2D33] relative">
             {/* Thin line with dots */}
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#2A2D33] hidden md:block">
               <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-[#2A2D33]" />
               <div className="absolute -top-1 left-[25%] h-2 w-2 rounded-full bg-[#2A2D33]" />
               <div className="absolute -top-1 left-[50%] h-2 w-2 rounded-full bg-[#2A2D33]" />
               <div className="absolute -top-1 left-[75%] h-2 w-2 rounded-full bg-[#2A2D33]" />
               <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-[#2A2D33]" />
             </div>
             
             {process.map(([num, title, copy]) => (
               <StaggerItem key={num} className="group pt-8 pb-8 md:px-8 md:pt-12 md:pb-0 first:md:pl-0 last:md:pr-0">
                 <p className="font-display text-[64px] font-[800] leading-none text-[#2A2D33] transition-colors duration-300 group-hover:text-accent-dark-dark">{num}</p>
                 <h3 className="mt-6 text-[24px] font-bold tracking-tight text-[#F2F2EE] transition-colors duration-300 group-hover:text-accent-dark-dark">{title}</h3>
                 <p className="mt-4 text-[16px] leading-[1.6] text-[#A1A1AA]">{copy}</p>
               </StaggerItem>
             ))}
           </StaggerContainer>
         </div>
      </Section>

      {/* 03 INTERNAL BUILDS SECTION */}
      <Section number="03" title="Internal builds" dark>
         <div className="flex flex-col">
           <div className="border-b border-[#2A2D33] px-8 pt-12 md:px-12 md:pt-16 lg:px-16 lg:pt-20">
             <FadeUp>
               <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">
                 What we have <em className="font-serif font-normal italic text-accent-dark">built.</em>
               </h2>
               <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-[#A1A1AA]">
                 Our own products and R&D builds, not client work. Client projects will be added as they are completed, with permission.
               </p>
             </FadeUp>
           </div>
           {projects.map((project, i) => (
             <FadeUp key={project.href} delay={i * 0.08}>
             <div className={`group flex flex-col gap-10 p-8 py-20 md:p-14 lg:p-16 lg:flex-row lg:items-center ${i > 0 ? 'border-t border-[#2A2D33]' : ''} ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
               <div className="flex-1 min-w-0">
                 <div className="w-full max-w-[800px] overflow-hidden rounded-[12px]">
                   <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                     <ProjectFrame mock={project.mock} image={project.image} alt={project.alt} />
                   </div>
                 </div>
               </div>
               <div className="lg:w-[360px] shrink-0">
                 <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">Internal build</p>
                 <h3 className="mt-4 font-display text-[32px] font-bold tracking-tight transition-colors duration-300 group-hover:text-accent-dark-dark">{project.title}</h3>
                 <p className="mt-4 text-[18px] leading-[1.6] text-[#A1A1AA]">{project.copy}</p>
                 <div className="mt-6 flex flex-wrap gap-2">
                   {project.tags.map(tag => (
                     <span key={tag} className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#A1A1AA]">[{tag}]</span>
                   ))}
                 </div>
                 <div className="mt-8 flex items-center gap-6">
                   <Link href={project.href} className="group inline-flex items-center gap-2 font-semibold text-accent-dark hover:text-accent-dark-hover decoration-2 underline-offset-4 hover:underline">
                     Read case study <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
                   </Link>
                 </div>
               </div>
             </div>
             </FadeUp>
           ))}
         </div>
      </Section>

      {/* 04 APPROACH (WHY DREXA) */}
      <Section number="04" title="Approach" dark>
         <div className="flex flex-col lg:flex-row">
           <div className="p-8 py-20 md:p-14 lg:p-24 lg:w-[50%] border-b lg:border-b-0 lg:border-r border-[#2A2D33] flex items-center">
             <FadeUp>
             <p className="font-display text-[28px] md:text-[44px] font-bold leading-[1.1] tracking-[-0.02em] text-[#F2F2EE]">
               We build the system, then we stay to make sure it works.
             </p>
             </FadeUp>
           </div>
           <div className="flex flex-col lg:w-[50%] divide-y divide-[#2A2D33]">
             {[
               ['Practical AI', 'We build automation and agents that do real jobs. If AI is not the right answer for your problem, we will say so.'],
               ['Small team, direct access', 'You talk to the person doing the work. Questions get answered fast.'],
               ['Built to last', 'Clean code, secure setup, and documentation, so you are never locked in.']
             ].map(([title, copy], idx) => (
               <FadeUp key={title} delay={idx * 0.08} className="group p-8 md:p-14 lg:p-16 transition-colors duration-300 hover:bg-[#141416]">
                 <h3 className="text-[20px] font-bold text-[#F2F2EE]">{title}</h3>
                 <p className="mt-3 text-[18px] leading-[1.6] text-[#A1A1AA]">{copy}</p>
               </FadeUp>
             ))}
           </div>
         </div>
      </Section>

      {/* 05 FOUNDER */}
      <Section number="05" title="Founder" dark>
         <div className="p-8 py-20 md:p-14 lg:p-24 flex flex-col justify-center max-w-[800px]">
           <FadeUp>
           <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">
             Hi, I&apos;m <em className="font-serif font-normal italic text-accent-dark">Ahmed Bilal.</em>
           </h2>
           </FadeUp>
           <FadeUp delay={0.12}>
           <p className="mt-6 text-[20px] leading-[1.6] text-[#A1A1AA]">
             I am the founder of Drexa AI. I am a software developer and Computer Science student with hands-on experience in web development, AI automation, and cybersecurity. I started Drexa to help businesses use technology in practical ways, without confusing jargon or inflated promises.
           </p>
           </FadeUp>
           <FadeUp delay={0.24}>
           <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">
             Founder, Drexa AI
           </p>
           </FadeUp>
         </div>
      </Section>

      {/* TOOLS STRIP */}
      <section className="border-t border-[#2A2D33] bg-[#141416]">
        <div className="mx-auto flex flex-col md:flex-row md:items-center justify-between max-w-[1440px] border-x border-[#2A2D33] p-6 md:px-10">
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA] mb-4 md:mb-0 shrink-0 mr-8">Tools we build with</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[15px] font-semibold text-[#8A8D93] uppercase tracking-wider">
            <span className="transition-colors hover:text-white">Python</span>
            <span className="transition-colors hover:text-white">Next.js</span>
            <span className="transition-colors hover:text-white">React</span>
            <span className="transition-colors hover:text-white">Node.js</span>
            <span className="transition-colors hover:text-white">PostgreSQL</span>
            <span className="transition-colors hover:text-white">Flask</span>
            <span className="transition-colors hover:text-white">Anthropic</span>
          </div>
        </div>
      </section>

      {/* 06 FAQ */}
      <Section number="06" title="FAQ" dark>
         <div className="flex flex-col">
           {faqs.map(([q, a], i) => (
             <FadeUp key={q} delay={i * 0.04}>
             <details key={q} className={`group ${i > 0 ? 'border-t border-[#2A2D33]' : ''}`}>
               <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-8 md:px-14 lg:px-20 text-[20px] font-semibold transition-colors hover:bg-[#141416] [&::-webkit-details-marker]:hidden">
                 {q}
                 <Plus size={24} className="shrink-0 text-accent-dark transition-transform duration-300 group-open:rotate-45" />
               </summary>
               <div className="px-8 pb-10 md:px-14 lg:px-20 pt-2">
                 <p className="max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">{a}</p>
               </div>
             </details>
             </FadeUp>
           ))}
         </div>
      </Section>
      {/* CTA */}
      <section className="bg-[#09090B] text-[#F2F2EE] border-t border-[#2A2D33]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-x border-[#2A2D33] p-8 py-20 md:p-14 lg:flex-row lg:items-center lg:justify-between lg:p-20">
          <FadeUp>
          <div>
            <h2 className="font-display text-[28px] md:text-[44px] font-bold tracking-[-0.02em]">Have a project in mind?</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-[#A1A1AA]">
              Book a free 30-minute consultation. We will listen, ask questions, and tell you honestly what we would build and what it would cost. No obligation.
            </p>
          </div>
          </FadeUp>
          <FadeUp delay={0.15} className="shrink-0">
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21F48B] hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0">
              Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </Link>
            <a href="https://wa.me/923715082737" className="group inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 px-6 text-sm font-semibold text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21F48B] hover:-translate-y-0.5 hover:border-white hover:bg-[#141416]/5 active:translate-y-0">
              Message on WhatsApp <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
            </a>
          </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}
