import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
import { CountUp } from "@/components/motion/CountUp";
import { proof } from "@/content/proof";
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siPython,
  siNodedotjs,
  siPostgresql,
  siRedis,
  siDocker,
  siTailwindcss,
  siFlask,
  siFastapi,
  siPytorch,
  siThreedotjs,
  siQdrant,
  siLangchain,
  siAnthropic,
  siExpress,
  siSqlite,
  siJinja,
  siChartdotjs,
  siFigma,
  siVercel,
  siGit,
  type SimpleIcon,
} from "simple-icons";

/* slug → icon glyph. Only slugs listed in content/proof.ts techSlugs resolve
   here; anything missing from the package is skipped rather than faked. */
const ICONS: Record<string, SimpleIcon> = {
  nextdotjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  python: siPython,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  redis: siRedis,
  docker: siDocker,
  tailwindcss: siTailwindcss,
  flask: siFlask,
  fastapi: siFastapi,
  pytorch: siPytorch,
  threedotjs: siThreedotjs,
  qdrant: siQdrant,
  langchain: siLangchain,
  anthropic: siAnthropic,
  express: siExpress,
  sqlite: siSqlite,
  jinja: siJinja,
  chartdotjs: siChartdotjs,
  figma: siFigma,
  vercel: siVercel,
  git: siGit,
};

function TechItem({ slug }: { slug: string }) {
  const icon = ICONS[slug];
  if (!icon) return null;
  return (
    <span className="group inline-flex items-center gap-3 px-6 md:px-8">
      <svg
        role="img"
        aria-label={icon.title}
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-current text-muted-foreground transition-colors duration-200 group-hover:text-accent md:h-6 md:w-6"
      >
        <path d={icon.path} />
      </svg>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-200 group-hover:text-accent">
        {icon.title}
      </span>
    </span>
  );
}

/**
 * Proof strip (design brief §7.5) — product-based, honest proof only.
 *
 * Counters animate once when ~40% visible (§7.5.1, Phase 2a): CountUp parses
 * the numeric prefix and preserves the suffix ("30+", "100%", "24h"); reduced
 * motion keeps them static. The tech rows reuse the site's
 * existing CSS marquee primitive (already reduced-motion aware) at reading
 * speed. Testimonial and client-logo slots render nothing while their data
 * arrays in content/proof.ts are empty — never placeholders (§2 rule 2).
 */
export function ProofStrip() {
  const half = Math.ceil(proof.techSlugs.length / 2);
  const rowA = proof.techSlugs.slice(0, half);
  const rowB = proof.techSlugs.slice(half);

  return (
    <Section ariaLabel="Proof" className="border-b border-line py-14 md:py-20">
      <Container>
        {/* Proof block. Four large numbers under 2px rules and a small label
            used to occupy a whole section: a throwaway strip between two real
            sections. It now carries its own lockup (label plus the honest
            sourcing note), the numerals are a step larger, and the four sit on
            one hairline grid. Each number keeps its source in `title`. */}
        <div className="grid gap-x-8 gap-y-10 border-t border-line pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-x-16 md:pt-10">
          <div>
            <span className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span aria-hidden="true" className="text-dim">
                {"//"}
              </span>
              {proof.label}
            </span>
            <p className="max-w-[40ch] text-base leading-[1.55] text-body">
              {proof.note}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {proof.counters.map((counter) => (
              <div key={counter.label}>
                <CountUp
                  value={counter.value}
                  title={`Source: ${counter.source}`}
                  className="block font-display font-bold tabular-nums leading-none tracking-tighter text-foreground text-[clamp(2.75rem,5.5vw,4.75rem)]"
                />
                <span className="mt-4 block border-t border-line pt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {counter.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8 md:mt-16">
          <Marquee speed={30} direction="left" itemClassName="py-3">
            {rowA.map((slug) => (
              <TechItem key={slug} slug={slug} />
            ))}
          </Marquee>
          <Marquee speed={30} direction="right" itemClassName="py-3">
            {rowB.map((slug) => (
              <TechItem key={slug} slug={slug} />
            ))}
          </Marquee>
        </div>
      </Container>
    </Section>
  );
}
