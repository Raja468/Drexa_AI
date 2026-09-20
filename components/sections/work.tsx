import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { StatNumber } from "@/components/ui/StatNumber";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";
import { home } from "@/content/home";

/**
 * Project cards.
 *
 * These deliberately *don't* use the full accent flood used by the capability
 * cards: the cards carry screenshots, and flooding the background with acid
 * yellow behind an image reads as a mistake. The inversion happens on the type
 * instead — border, title and arrow flip to accent while the image lifts and
 * scales. That keeps one colour system applied two ways rather than two systems.
 */
export function Work() {
  return (
    <Section id="projects" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <SectionHeader
          label={home.work.label}
          title={<Highlight text={home.work.title} accent={home.work.titleAccent} />}
          description={home.work.description}
        />

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {home.work.items.map((project) => (
            <StaggerItem key={project.number} className="h-full">
              <article className="group flex h-full flex-col border-2 border-border bg-background transition-colors duration-300 hover:border-accent">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View ${project.title} on GitHub`}
                  /* §5.3: the custom cursor shows its "View" label over the
                     panel (the work-stack restyle itself is Phase 2b). */
                  data-cursor="view"
                  className="flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-border bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    {/* Blend-difference keeps the numeral legible over any
                        screenshot — the sanctioned use of a blend mode in the
                        system is text sitting on imagery. */}
                    <StatNumber
                      size="sm"
                      className="absolute bottom-4 right-4 leading-none text-foreground mix-blend-difference"
                    >
                      {project.number}
                    </StatNumber>
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {project.type}
                      </span>
                      <span className="border-2 border-accent px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-accent">
                        {project.label}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl uppercase tracking-tighter text-foreground transition-colors duration-300 group-hover:text-accent md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-base leading-tight text-muted-foreground md:text-lg">
                      {project.copy}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-2 border-border px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto flex items-center gap-2 pt-8 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-300 group-hover:text-accent">
                      View on GitHub
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </a>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}