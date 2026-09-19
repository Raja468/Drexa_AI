import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { StatNumber } from "@/components/ui/StatNumber";
import { FadeUp } from "@/components/motion/FadeUp";
import { home } from "@/content/home";

/**
 * The process, built as four giant numerals.
 *
 * The ordinals are decorative graphics rather than prose — they're rendered
 * through `StatNumber`, which is aria-hidden by default, and the sequence is
 * conveyed by the document order instead. That's also what makes the muted
 * low-contrast tone legitimate here.
 */
export function Approach() {
  return (
    <Section id="approach" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <SectionHeader
          label={home.approach.label}
          title={<Highlight text={home.approach.title} accent={home.approach.titleAccent} />}
          description={home.approach.description}
        />

        <div className="border-t-2 border-border">
          {home.approach.steps.map((step) => (
            <FadeUp
              key={step.number}
              className="grid gap-4 border-b-2 border-border py-8 md:grid-cols-[260px_1fr] md:gap-12 md:py-12"
            >
              <StatNumber size="md">{step.number}</StatNumber>
              <div>
                <h3 className="font-display text-3xl uppercase tracking-tighter text-foreground md:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[640px] text-lg leading-tight text-muted-foreground md:text-xl">
                  {step.copy}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}