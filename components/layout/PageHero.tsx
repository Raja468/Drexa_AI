import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { FadeUp } from "@/components/motion/FadeUp";

/**
 * The header every interior page opens with.
 *
 * Previously copy-pasted into five pages, each with its own blurred orb, mint
 * pill and glow headline. One component now owns it, so the five pages can't
 * drift apart — and the eyebrow, scale and spacing are fixed by the system
 * rather than re-decided per page.
 */
type Props = {
  eyebrow: string;
  title: string;
  /** Phrase inside `title` that takes the accent colour. */
  accent?: string;
  description: string;
};

export function PageHero({ eyebrow, title, accent, description }: Props) {
  return (
    <section className="border-b-2 border-border pt-36 pb-16 md:pt-44 md:pb-24">
      <Container>
        <FadeUp animateOnMount>
          <span className="mb-6 inline-flex items-center gap-3 border-2 border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent md:text-sm">
            <span aria-hidden="true" className="beacon-pulse h-2 w-2 rounded-full bg-accent" />
            {eyebrow}
          </span>

          <h1 className="max-w-[95vw] font-display uppercase text-foreground text-mega">
            <Highlight text={title} accent={accent} />
          </h1>

          <p className="mt-8 max-w-[720px] text-lg leading-tight text-muted-foreground md:text-2xl">
            {description}
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}