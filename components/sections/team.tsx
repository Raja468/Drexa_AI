import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { teamPage } from "@/content/team";

/**
 * Team / founder section (design brief §7.9) — founder-led layout because the
 * studio is currently one person plus collaborators. No portrait photo has
 * been provided yet, so the slot renders a large monogram (never a stock
 * photo); a real `/public/team/*.webp` drops in via content/team.ts with no
 * code change. Certifications render nothing until real, verifiable ones are
 * supplied. DRAFT copy comes from content/team.ts and needs owner approval.
 *
 * Static by design: the Phase 1 gate adds zero animation.
 */
export function TeamSection() {
  const { founder } = teamPage;

  return (
    <Section id="team" ariaLabel="Our team" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-20">
          {/* Portrait slot. Monogram placeholder until the owner supplies a
              real photo — the brief forbids stock imagery here. */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border-2 border-border bg-muted lg:max-w-none">
            {founder.portrait ? (
              <Image
                src={founder.portrait}
                alt={`Portrait of ${founder.name}`}
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center font-display font-bold leading-none tracking-tighter text-foreground/15 text-numeral-lg"
              >
                {founder.monogram}
              </span>
            )}
          </div>

          <div>
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-accent md:text-sm">
              Our team
            </span>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              {founder.name}
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-accent md:text-sm">
              {founder.role}
            </p>

            {/* DRAFT COPY — see content/team.ts for the owner-approval flag. */}
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-muted-foreground">
              {founder.story.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={founder.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 border-b-2 border-border pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                GitHub
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={`mailto:${founder.links.email}`}
                className="group inline-flex items-center gap-2 border-b-2 border-border pb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {founder.links.email}
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        {/* How we work — three short factual statements (DRAFT COPY). */}
        <div className="mt-16 border-t-2 border-border pt-10 md:mt-20">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
            How we work
          </span>
          <ul className="mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
            {founder.howWeWork.map((fact) => (
              <li key={fact} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                <span aria-hidden="true" className="mt-0.5 font-mono text-accent">
                  ▸
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
