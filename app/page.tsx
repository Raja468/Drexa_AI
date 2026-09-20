import { home } from "@/content/home";
import { MarqueeBand } from "@/components/motion/MarqueeBand";
import { Hero } from "@/components/sections/hero";
import { Capabilities } from "@/components/sections/capabilities";
import { ProofStrip } from "@/components/sections/proof-strip";
import { Work } from "@/components/sections/work";
import { Approach } from "@/components/sections/approach";
import { WhyDrexa } from "@/components/sections/why-drexa";
import { TeamSection } from "@/components/sections/team";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

/**
 * The home page is pure composition.
 *
 * Every section owns its own copy (via `content/home.ts`) and its own styling;
 * this file only decides the running order. The two marquee bands sit between
 * sections on purpose — they're the transitions, and they carry the two
 * rhythms the design system asks for (fast keyword band, slower project band).
 *
 * Both bands are built from real copy. There are no invented metrics or
 * testimonials: this is a live site for a real studio, so fabricated social
 * proof is not an option. When verified numbers or client quotes exist, they
 * drop straight into the same two bands.
 */
export default function Page() {
  const projectTicker = home.work.items.map((project) => `${project.title} · ${project.type}`);

  return (
    <main className="bg-background">
      <Hero />

      {/* §7.3: the accent ticker runs one ~40s linear loop and pauses on
          hover (opt-in on Marquee); reduced motion renders it static. */}
      <MarqueeBand items={home.ticker} loopSeconds={40} pauseOnHover />

      <Capabilities />
      <ProofStrip />
      <Work />

      <MarqueeBand items={projectTicker} speed={40} tone="muted" direction="right" />

      <Approach />
      <WhyDrexa />
      <TeamSection />
      <Faq />
      <Contact />
    </main>
  );
}