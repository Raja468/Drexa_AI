import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { contactPage } from "@/content/contact";

/* Icons are attached here, by kind, rather than stored in content/contact.ts. */
const CHANNEL_ICONS = {
  email: Mail,
  whatsapp: MessageSquare,
} as const;

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      {/* Hero — copy lives in content/contact.ts */}
      <PageHero
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        accent={contactPage.hero.accent}
        description={contactPage.hero.description}
      />
      {/* Direct lines + form */}
      <section className="border-b-2 border-border py-14 md:py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20 items-start">
            {/* Left column — channels and guarantees */}
            <FadeUp className="space-y-10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {contactPage.directLines.label}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tighter text-foreground md:text-4xl">
                  {contactPage.directLines.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {contactPage.directLines.description}
                </p>
              </div>

              <div className="space-y-4">
                {contactPage.directLines.channels.map((channel) => {
                  const Icon = CHANNEL_ICONS[channel.kind];
                  return (
                    <a
                      key={channel.kind}
                      href={channel.href}
                      target={channel.kind === "whatsapp" ? "_blank" : undefined}
                      rel={channel.kind === "whatsapp" ? "noreferrer noopener" : undefined}
                      className="group flex items-center justify-between border-2 border-border p-5 transition-colors duration-300 hover:border-accent"
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-border text-accent transition-colors duration-300 group-hover:border-accent">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                            {channel.caption}
                          </span>
                          <span className="block text-base font-bold text-foreground transition-colors duration-200 group-hover:text-accent">
                            {channel.value}
                          </span>
                        </span>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              {/* What to expect */}
              <div className="border-2 border-border p-6">
                <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-accent">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  {contactPage.expectations.label}
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {contactPage.expectations.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Right column — the shared form primitive */}
            <FadeUp delay={0.1}>
              <ContactForm
                services={contactPage.form.serviceOptions}
                budgets={contactPage.form.budgetRanges}
                showCompany
                submitLabel={contactPage.form.submitLabel}
              />
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* FAQ — hairline grid: gap-px over a border-colored container */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeUp>
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {contactPage.faqs.label}
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tighter text-foreground md:text-6xl">
              {contactPage.faqs.title}
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 grid gap-px border-2 border-border bg-border md:grid-cols-2">
              {contactPage.faqs.items.map((faq) => (
                <div key={faq.q} className="bg-background p-7">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}