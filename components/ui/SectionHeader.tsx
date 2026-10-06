import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Kinetic section heading: uppercase, viewport-scaled, tight leading lockup.
 * Size, leading, tracking and weight all come from the `--text-mega` token,
 * so the whole site's heading scale moves from one line in globals.css.
 *
 * `align="center"` is retained for backwards compatibility but is off-system:
 * Kinetic body copy is always left-aligned for readability.
 */
type Props = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
  /** `mega` = viewport-width heading (default). `large` = one step down. */
  size?: "mega" | "large";
};

/* Two heading weights so a long page has hierarchy instead of eleven identical
   mega headings. `mega` stays the default, so the viewport-width signature the
   home page is built on is untouched. */
const SIZES = {
  mega: "text-mega",
  large: "text-3xl md:text-5xl lg:text-6xl",
} as const;

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "left",
  size = "mega",
}: Props) {
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" && "mx-auto text-center", className)}>
      {/* Eyebrow as a rule-and-label lockup. The accent used to colour this
          line on every section, which is what made the accent read as
          decoration; it now belongs to the muted tone with a hairline running
          to the column edge. */}
      {label && (
        <span className="mb-5 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden="true" className="text-dim">
            {"//"}
          </span>
          {label}
          <span aria-hidden="true" className="hidden h-px flex-1 bg-line sm:block" />
        </span>
      )}
      <h2
        className={cn(
          "max-w-[900px] font-display uppercase text-foreground",
          SIZES[size],
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[680px] text-lg leading-[1.45] text-body md:text-xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
