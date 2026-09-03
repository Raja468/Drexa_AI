import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32 md:py-40">
      <Container>
        <div className="max-w-xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent">
            404
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[0.95] tracking-tight text-white">
            Page not found.
          </h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-text-secondary">
            The page you&apos;re looking for has moved or doesn&apos;t exist.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/" variant="primary" size="md">
              Back home
            </ButtonLink>
            <Link
              href="/contact"
              className="text-[13px] font-medium text-text-secondary hover:text-white transition-colors"
            >
              Report broken link ↗
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
