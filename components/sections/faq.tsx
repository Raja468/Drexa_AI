"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { home } from "@/content/home";

/**
 * FAQ accordion.
 *
 * Questions stay in sentence case at a large size rather than uppercase: a
 * full question shouted in caps is hostile to read, and the system's own rule
 * keeps content (as opposed to display type) in normal case. The poster feel
 * comes from the ordinals, the 2px rules and the size instead.
 *
 * Accessibility: real buttons, so Enter/Space work for free; `aria-expanded`
 * announces state; the panel is a labelled region and is unmounted when
 * collapsed, so its text leaves the accessibility tree with it.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" className="border-b-2 border-border py-16 md:py-32">
      <Container>
        <SectionHeader
          label={home.faq.label}
          title={home.faq.title}
          description={home.faq.description}
        />

        <div className="border-t-2 border-border">
          {home.faq.items.map((item, index) => {
            const isOpen = open === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={item.q} className="border-b-2 border-border">
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="group flex min-h-[88px] w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-accent md:text-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-xl tracking-tighter transition-colors duration-200 md:text-3xl ${
                          isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent md:h-6 md:w-6" aria-hidden="true" />
                    ) : (
                      <Plus
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent md:h-6 md:w-6"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { type: "spring", stiffness: 300, damping: 32 }
                      }
                      className="overflow-hidden"
                    >
                      <p className="max-w-[760px] pb-8 text-lg leading-tight text-muted-foreground md:pl-[3.25rem] md:text-xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}