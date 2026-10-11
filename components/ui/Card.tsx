import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Kinetic card: 2px border, 0 radius, flat background, no shadow. Depth in
 * this system comes from colour layering, never from elevation.
 *
 * `interactive` adds the signature hard inversion — the card floods with
 * accent and every child flips to black. Children opt in with the exported
 * Card* helpers, which coordinate through the `group-hover` state.
 */
type Padding = "md" | "lg" | "xl";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: Padding;
  /** Sticky cards need a per-index offset — see the Why Drexa stack. */
  style?: CSSProperties;
};

const PADDING: Record<Padding, string> = {
  md: "p-8",
  lg: "p-8 md:p-10",
  xl: "p-8 md:p-12",
};

export function Card({ children, className, interactive = false, padding = "lg", style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative rounded-none border-2 border-border bg-background",
        PADDING[padding],
        interactive && "group transition-colors duration-300 hover:border-accent hover:bg-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}

type SlotProps = { children: ReactNode; className?: string };

export function CardLabel({ children, className }: SlotProps) {
  return (
    <span
      className={cn(
        "block font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground md:text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CardTitle({ children, className }: SlotProps) {
  return (
    <h3
      className={cn(
        "font-display text-2xl uppercase tracking-tighter text-foreground transition-colors duration-300 group-hover:text-accent-foreground md:text-3xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: SlotProps) {
  return (
    <p
      className={cn(
        "mt-4 text-lg leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-accent-foreground/80 md:text-xl",
        className,
      )}
    >
      {children}
    </p>
  );
}