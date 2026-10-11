import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { home } from "@/content/home";
import { site } from "@/content/site";

/** Two-column closer: oversized statement on the left, oversized form right. */
export function Contact() {
  return (
    <Section id="contact" className="py-20 md:py-32 lg:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <FadeUp>
            {/* Rule-and-label lockup, same as the section headings: one accent
                moment per section (the primary CTA) instead of the accent
                opening every block. */}
            <span className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden="true" className="text-dim">
                {"//"}
              </span>
              {home.contact.label}
              <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
            </span>
            <h2 className="font-display uppercase text-foreground text-mega">
              <Highlight text={home.contact.title} accent={home.contact.titleAccent} />
            </h2>
            <p className="mt-6 max-w-[560px] text-lg leading-[1.55] text-body md:text-xl">
              {home.contact.description}
            </p>

            <div className="mt-10 flex flex-col items-start gap-6">
              {/* §7.12 "Book a call" — renders only once the owner supplies
                  site.bookingUrl (no fake links). WhatsApp stays primary. */}
              {site.bookingUrl && (
                <ButtonLink href={site.bookingUrl} size="lg">
                  Book a call
                </ButtonLink>
              )}

              <ButtonLink href={home.contact.cta.href} size="lg">
                {home.contact.cta.label}
              </ButtonLink>

              <a
                href={home.contact.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 border-b border-line pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground md:text-sm"
              >
                {home.contact.whatsapp.label}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={`mailto:${home.contact.email}`}
                className="group inline-flex items-center gap-2 border-b border-line pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-foreground hover:text-foreground md:text-sm"
              >
                {home.contact.email}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {home.contact.meta}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="border border-line bg-surface-1 p-6 md:p-10">
              <h3 className="font-display text-2xl uppercase tracking-tighter text-foreground md:text-3xl">
                {home.contact.form.label}
              </h3>
              <p className="mt-3 text-base leading-[1.55] text-body md:text-lg">
                {home.contact.form.description}
              </p>
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}