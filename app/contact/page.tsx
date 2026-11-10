import type { Metadata } from 'next'
import { ContactForm } from '@/components/ui/ContactForm'
import { Mail, MessageSquare, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Drexa AI | Free 30-Minute Consultation',
  description: 'Book a free consultation with Drexa AI. Tell us about your AI, web, software, or security project. We reply within one business day.',
  alternates: { canonical: 'https://drexa.tech/contact' },
  openGraph: {
    title: 'Contact Drexa AI | Free 30-Minute Consultation',
    description: 'Book a free consultation with Drexa AI. Tell us about your AI, web, software, or security project. We reply within one business day.',
    url: 'https://drexa.tech/contact',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Drexa AI | Free 30-Minute Consultation',
    description: 'Book a free consultation with Drexa AI. Tell us about your AI, web, software, or security project. We reply within one business day.',
    images: ['/logo.png'],
  },

}

export default function ContactPage() {
  return (
    <main className="bg-[#141416] pt-[88px]">
      <section className="relative border-b border-border bg-[#141416]">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-10">
            <div className="sticky top-28 font-mono text-[13px] uppercase tracking-[0.06em] text-[#A1A1AA]">
              Contact
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 py-20 md:p-14 lg:p-24">
            <h1 className="font-display text-[40px] md:text-[56px] font-[800] leading-[1.02] tracking-[-0.03em] text-foreground">
              Let's talk about your project
            </h1>
            <p className="mt-6 max-w-[60ch] text-[20px] md:text-[24px] font-semibold leading-[1.4] text-[#F2F2EE]">
              Book a free 30-minute call, or send a short brief. We reply within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#141416] border-b border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col lg:flex-row border-x border-border">
          <div className="flex-1 border-b lg:border-b-0 lg:border-r border-border p-8 py-16 md:p-14 lg:p-24">
            <ContactForm submitLabel="Send message" />
          </div>
          <div className="lg:w-[500px] shrink-0 p-8 py-16 md:p-14 lg:p-24 bg-[#141416]">
            <div className="space-y-10">
              <div>
                <h2 className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">Direct lines</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-accent-dark" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href="mailto:hello@drexa.tech" className="mt-1 block text-[#A1A1AA] hover:text-accent-dark transition-colors">hello@drexa.tech</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-accent-dark" />
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <a href="https://wa.me/923715082737" target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-border bg-[#141416] px-4 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent-dark">
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent-dark" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="mt-1 text-[#A1A1AA]">Based in Chakwal, Pakistan.<br/>Open to projects worldwide.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-accent-dark" />
                    <div>
                      <p className="font-semibold text-foreground">Hours</p>
                      <p className="mt-1 text-[#A1A1AA]">Monday to Saturday<br/>9:00 AM - 6:00 PM (PKT)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-10">
                <h2 className="font-mono text-[13px] uppercase tracking-[0.06em] text-accent-dark">What happens next</h2>
                <ol className="mt-6 space-y-4 text-[16px] leading-[1.6] text-[#A1A1AA] list-decimal list-inside marker:font-semibold marker:text-foreground">
                  <li>We read your message.</li>
                  <li>We reply within one business day.</li>
                  <li>We schedule a free call.</li>
                  <li>You get a clear plan and quote.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}