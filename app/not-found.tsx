import { Container } from "@/components/ui/Container";
import { StatNumber } from "@/components/ui/StatNumber";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-background">
      <section className="border-b-2 border-border pt-36 pb-20 md:pt-44 md:pb-32">
        <Container>
          <span className="mb-6 inline-block font-mono text-xs uppercase tracking-widest text-accent md:text-sm">
            Error 404
          </span>

          {/* The numeral carries the page — no illustration needed. */}
          <StatNumber size="lg" decorative={false} className="text-accent">
            404
          </StatNumber>

          <h1 className="mt-8 max-w-[95vw] font-display uppercase text-foreground text-mega">
            Page not found.
          </h1>

          <p className="mt-8 max-w-[640px] text-lg leading-tight text-muted-foreground md:text-2xl">
            The page you&apos;re looking for has moved or doesn&apos;t exist.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/" size="lg">
              Back home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Report broken link
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
