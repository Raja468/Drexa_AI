import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Shared section wrapper — the Section 5.2 isolation rules from the design
 * brief: every section owns a stacking context (`relative` + `isolate`) and
 * clips its own effects (`overflow-clip`), so no scroll effect or absolutely
 * positioned decoration from one section can visually overlap the next.
 *
 * It deliberately carries NO default padding: sections keep their own rhythm
 * classes (`py-16 md:py-32` etc.) so adopting it never moves existing layout.
 * `Container` remains the horizontal system inside it.
 */
type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
};

export function Section({ children, className, id, ariaLabel }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn("relative isolate overflow-clip", className)}>
      {children}
    </section>
  );
}
