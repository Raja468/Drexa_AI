import type { ReactNode } from "react";

/**
 * Massive numeral used as a graphic shape rather than as text: 6rem–12rem,
 * rendered in the dim text tone so it reads as a layer *behind* the content.
 * Sizes come from the `--text-numeral-*` tokens, so the whole scale is
 * adjustable from globals.css.
 *
 * The default tone used to be `--color-muted` (#27272a) — a *surface* value,
 * not a text one, so any numeral that did not override the colour painted
 * within a few points of the background. `--color-dim` is the darkest tone in
 * the text ramp and still clears 6:1 on the canvas.
 *
 * Decorative by default, which takes it out of the accessibility tree — which
 * is also why the dim tone is legitimate here. For a figure that carries
 * meaning, pass `decorative={false}` and override the colour with `className`
 * (e.g. `text-foreground`).
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
  const sizeClass = SIZES[size];
  const baseClasses = "block font-display tabular-nums text-dim";
  const merged = className ? `${baseClasses} ${sizeClass} ${className}` : `${baseClasses} ${sizeClass}`;
  return (
    <span
      aria-hidden={decorative || undefined}
      className={merged}
    >
      {children}
    </span>
  );
}