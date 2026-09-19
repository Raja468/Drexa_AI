import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Massive numeral used as a graphic shape rather than as text: 6rem–12rem,
 * rendered in the muted surface tone so it reads as a layer *behind* the
 * content. Sizes come from the `--text-numeral-*` tokens, so the whole scale
 * is adjustable from globals.css.
 *
 * Decorative by default, which takes it out of the accessibility tree — which
 * is also why the low-contrast muted tone is legitimate here. For a figure that
 * carries meaning, pass `decorative={false}` and override the colour with
 * `className` (e.g. `text-foreground` / `text-accent`).
 */
type Size = "sm" | "md" | "lg";

type StatNumberProps = {
  children: ReactNode;
  className?: string;
  size?: Size;
  decorative?: boolean;
};

const SIZES: Record<Size, string> = {
  sm: "text-numeral-sm",
  md: "text-numeral-md",
  lg: "text-numeral-lg",
};

export function StatNumber({ children, className, size = "md", decorative = true }: StatNumberProps) {
  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn("block font-display tabular-nums text-muted", SIZES[size], className)}
    >
      {children}
    </span>
  );
}