import { Bot, Brain, CircuitBoard, Globe, Shield, Sparkles, Terminal, Wand2, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Highlight } from "@/components/ui/Highlight";
import { StaggerContainer, StaggerItem } from "@/components/motion/FadeUp";
import { home } from "@/content/home";

/**
 * Icons are attached here, by slug, rather than stored in `content/home.ts` —
 * that keeps the content module pure copy (and portable to a CMS).
 */
const ICONS: Record<string, LucideIcon> = {
  "ai-automation": CircuitBoard,
  "ai-agents": Bot,
  "llm-integration": Brain,
  "custom-software": Terminal,
  "web-experiences": Globe,
  "ai-development": Sparkles,
  cybersecurity: Shield,
  creative: Wand2,
};

/**
 * Eight capabilities in a connected hairline grid — now flip cards.
 *
 * Each cell owns its 1px right/bottom hairline (the grid supplies top/left),
 * so dividers belong to the cards and no gray block is ever exposed.
 *
 * Hover turns the cell 180° around its Y axis: the front is the copy face,
 * the back is the capability's image (named after the slug in /public) under
 * a solid scrim with a mono `0X / TITLE` stamp bottom-left. The scrim is a
 * flat tint, not a gradient, to stay inside the anti-pattern rules.
 *
 * The flip is `motion-safe` only: reduced-motion users keep the copy face
 * permanently (the images are decorative). Front-face type deliberately
 * carries no hover colour — it rotates away mid-transition, and a colour
 * flip on a backface-hidden element would flash black-on-black.
 */
export function Capabilities() {
  return (
    <Section id="capabilities" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <SectionHeader
          label={home.capabilities.label}
          title={<Highlight text={home.capabilities.title} accent={home.capabilities.titleAccent} />}
          description={home.capabilities.description}
        />

        <StaggerContainer className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {home.capabilities.items.map((item) => {
            const Icon = ICONS[item.slug] ?? Sparkles;
            return (
              <StaggerItem key={item.slug} className="h-full">
                <div className="group relative h-full min-h-[300px] border-r border-b border-border [perspective:1600px]">
                  <div className="relative h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] motion-safe:group-hover:[transform:rotateY(180deg)]">
                    {/* Front: the copy face. Numbering removed per §3/§7.4 —
                        services are not a sequence; the line icon carries it. */}
                    <div className="flex h-full flex-col justify-between bg-background p-8 md:p-10 [backface-visibility:hidden]">
                      <Icon
                        className="h-7 w-7 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />

                      <div className="mt-8">
                        <h3 className="font-display text-2xl uppercase tracking-tighter text-foreground md:text-3xl lg:text-4xl">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-base leading-tight text-muted-foreground md:text-lg">
                          {item.copy}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border-2 border-border px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back: the image face. */}
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <Image
                        src={`/${item.slug}.jpeg`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-background/55" />
                      <div className="absolute inset-x-0 bottom-0 border-t-2 border-accent p-6 md:p-8">
                        <span className="block font-display text-xl font-bold uppercase tracking-tighter text-foreground md:text-2xl">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
