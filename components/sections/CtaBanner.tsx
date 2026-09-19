import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The closing call to action on every interior page.
 *
 * A full-bleed acid-yellow section — the hard inversion the system asks for,
 * and the second full-section accent band alongside the home page ticker. The
 * button deliberately overrides its own variant to a black fill: on an accent
 * band the accent button would vanish, so the contrast flips instead.
 *
 * Copy is passed in per page; the structure, scale and contrast live here.
 */
type Props = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export function CtaBanner({ eyebrow, title, description, cta }: Props) {
  return (
    <Section className="border-t-2 border-accent bg-accent py-20 text-accent-foreground md:py-32">
      <Container>
        <FadeUp>
          <span className="block font-mono text-xs uppercase tracking-widest md:text-sm">
            {eyebrow}
          </span>

          <h2 className="mt-6 max-w-[900px] font-display uppercase text-mega">{title}</h2>

          <p className="mt-6 max-w-[640px] text-lg leading-tight text-accent-foreground/80 md:text-xl">
            {description}
          </p>

          <div className="mt-10">
            <ButtonLink
              href={cta.href}
              size="lg"
              className="bg-background text-foreground hover:bg-background"
            >
              {cta.label}
            </ButtonLink>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}