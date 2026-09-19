import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/home";

/**
 * Why Drexa — the yellow inverted rhythm breaker (design brief §7.8).
 *
 * Full-bleed acid-yellow background, near-black text (contrast well above the
 * §7.8 7:1 floor). The left column pins on desktop while the three statements
 * scroll past. Statements are NOT numbered: §3 reserves numbered markers for
 * real sequences, and this is a list of claims, not steps.
 *
 * The §7.8 background wipe-in is scroll choreography — it lands in Phase 2,
 * not here (Phase 1 gate: zero animation).
 */
export function WhyDrexa() {
  return (
    <Section
      id="why-drexa"
      ariaLabel="Why Drexa"
      className="border-b-2 border-border bg-accent py-16 text-accent-foreground md:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="mb-5 block font-mono text-xs uppercase tracking-widest md:text-sm">
              {home.why.label}
            </span>
            <h2 className="font-display uppercase text-mega">
              {home.why.title}
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-tight text-accent-foreground/80 md:text-xl">
              {home.why.description}
            </p>
          </div>

          <div>
            {home.why.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`py-8 first:pt-0 md:py-10 ${index > 0 ? "border-t border-accent-foreground/20" : ""}`}
              >
                <h3 className="font-display text-3xl font-bold uppercase tracking-tighter md:text-5xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-[60ch] text-lg leading-tight text-accent-foreground/80 md:text-xl">
                  {pillar.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
