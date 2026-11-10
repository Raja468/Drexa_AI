import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Breadcrumb, ServiceCta, ServiceFaq } from '@/components/layout/ServicePageBits'

export const metadata: Metadata = {
  title: 'Web Development, Cybersecurity & AI Visibility in Chakwal | Drexa AI',
  description: 'Drexa AI is a Chakwal-based technology studio. Website security, AI visibility, web and software development for businesses in Chakwal and beyond.',
  alternates: { canonical: 'https://drexa.tech/chakwal' },
  openGraph: {
    title: 'Web Development, Cybersecurity & AI Visibility in Chakwal | Drexa AI',
    description: 'Drexa AI is a Chakwal-based technology studio. Website security, AI visibility, web and software development for businesses in Chakwal and beyond.',
    url: 'https://drexa.tech/chakwal',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development, Cybersecurity & AI Visibility in Chakwal | Drexa AI',
    description: 'Drexa AI is a Chakwal-based technology studio. Website security, AI visibility, web and software development for businesses in Chakwal and beyond.',
    images: ['/logo.png'],
  },
}

const helpWith = [
  'Getting a professional website',
  'Being found on Google and Google Maps searches',
  'Securing an existing website',
  'Automating WhatsApp enquiries',
  'School and shop management software',
]

const services = [
  { title: 'Website Security', href: '/services/cybersecurity', copy: 'We test your website the way an attacker would, then fix what we find.' },
  { title: 'AI Visibility', href: '/services/ai-visibility', copy: 'We check if AI mentions your business, then fix the reasons it does not.' },
  { title: 'Web Development', href: '/services/web-development', copy: 'Fast, secure, search-ready websites that bring in enquiries, not just look good.' },
  { title: 'Software and App Development', href: '/services/software-development', copy: 'Custom web apps, internal tools, and mobile apps built to your process.' },
  { title: 'AI Automation', href: '/services/ai-automation', copy: 'WhatsApp bots, lead capture, document processing, workflow automation.' },
]

const faqs: [string, string][] = [
  ['Where is Drexa AI based?', 'Chakwal, Punjab, Pakistan.'],
  ['Do you take projects outside Chakwal?', 'Yes. We take projects from anywhere in Pakistan and from abroad.'],
]

export default function ChakwalPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Chakwal' }]} />
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col border-x border-border lg:flex-row">
          <div className="shrink-0 border-b border-border p-6 md:p-8 lg:w-80 lg:border-b-0 lg:border-r lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              Chakwal
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground md:text-[56px]">
              Web Development, Cybersecurity and AI Visibility in Chakwal
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] font-semibold leading-[1.4] text-[#F2F2EE] md:text-[24px]">
              Drexa AI is a remote-first technology studio based in Chakwal, Punjab, Pakistan. Founder Ahmed Bilal builds and secures websites, develops custom software, and helps businesses appear in Google and AI search results.
            </p>
            <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.6] text-[#A1A1AA]">
              We take on projects for businesses in Chakwal, Islamabad, Rawalpindi, Lahore, Karachi, and abroad. Everything is delivered online, with meetings by video call or WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent-hover">
                Book a free consultation <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-[3px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section number="01" title="For Chakwal businesses we help with">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <ul className="grid gap-3 text-[18px] leading-[1.6] text-[#A1A1AA] md:grid-cols-2 list-disc list-inside marker:text-accent-dark">
            {helpWith.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section number="02" title="Why a local studio">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <p className="max-w-[60ch] text-[20px] leading-[1.6] text-[#F2F2EE]">
            Same time zone, same languages (Urdu, Punjabi, English), same understanding of local customers and payment habits.
          </p>
        </div>
      </Section>

      <Section number="03" title="Services">
        <div className="p-8 py-16 md:p-14 lg:p-24">
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Link key={service.href} href={service.href} className="group rounded-[12px] border border-border p-6 transition-colors hover:border-accent md:p-8">
                <h3 className="text-[20px] font-bold leading-tight group-hover:text-accent-dark">{service.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-[#A1A1AA]">{service.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section number="04" title="FAQ">
        <ServiceFaq items={faqs} />
      </Section>

      <ServiceCta />
    </main>
  )
}
