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
    <Section id="contact" className="py-16 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <FadeUp>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-accent md:text-sm">
              {home.contact.label}
            </span>
            <h2 className="font-display uppercase text-foreground text-mega">
              <Highlight text={home.contact.title} accent={home.contact.titleAccent} />
            </h2>
            <p className="mt-6 max-w-[560px] text-lg leading-tight text-muted-foreground md:text-xl">
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
                className="group inline-flex items-center gap-2 border-b-2 border-border pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent md:text-sm"
              >
                {home.contact.whatsapp.label}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={`mailto:${home.contact.email}`}
                className="group inline-flex items-center gap-2 border-b-2 border-border pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent md:text-sm"
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
            <div className="border-2 border-border p-6 md:p-10">
              <h3 className="font-display text-2xl uppercase tracking-tighter text-foreground md:text-3xl">
                {home.contact.form.label}
              </h3>
              <p className="mt-3 text-base leading-tight text-muted-foreground md:text-lg">
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