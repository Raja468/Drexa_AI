import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Marquee } from "@/components/motion/Marquee";
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
 * Counters are static by design: the Phase 1 gate adds zero animation, so the
 * once-per-view count-up lands in Phase 2. The tech rows reuse the site's
 * existing CSS marquee primitive (already reduced-motion aware) at reading
 * speed. Testimonial and client-logo slots render nothing while their data
 * arrays in content/proof.ts are empty — never placeholders (§2 rule 2).
 */
export function ProofStrip() {
  const half = Math.ceil(proof.techSlugs.length / 2);
  const rowA = proof.techSlugs.slice(0, half);
  const rowB = proof.techSlugs.slice(half);

  return (
    <Section ariaLabel="Proof" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {proof.counters.map((counter) => (
            <div key={counter.label} className="border-t-2 border-border pt-6">
              <span
                className="block font-display font-bold tabular-nums leading-none tracking-tighter text-foreground text-[clamp(2.5rem,5vw,4.5rem)]"
                title={`Source: ${counter.source}`}
              >
                {counter.value}
              </span>
              <span className="mt-3 block font-mono text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
                {counter.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t-2 border-border pt-10 md:mt-20">
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
