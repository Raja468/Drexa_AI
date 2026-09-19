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
};

export function SectionHeader({ label, title, description, className, align = "left" }: Props) {
  return (
    <div className={cn("mb-14 md:mb-20", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <span className="mb-5 block font-mono text-xs uppercase tracking-widest text-accent md:text-sm">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "max-w-[900px] font-display uppercase text-foreground text-mega",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-[640px] text-lg leading-tight text-muted-foreground md:text-xl",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
