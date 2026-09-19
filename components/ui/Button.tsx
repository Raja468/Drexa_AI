import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Kinetic Typography button.
 *
 * · Uppercase, bold, tight tracking on every variant
 * · 0 radius — sharp corners are structural, not stylistic
 * · Scale 1.05 on hover / 0.95 on press as the tactile feedback
 * · Heights 40 / 56 / 80px, so md and lg clear the 44px touch target
 *
 * One class list is shared by <ButtonLink> and <Button> so an anchor and a
 * real <button> can never drift apart visually.
 */
type Variant = "primary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
};

const BASE =
  "inline-flex select-none items-center justify-center gap-2 rounded-none font-display font-bold uppercase leading-none tracking-tighter transition-all duration-200 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  /* Flat acid-yellow fill. Hover only scales — the colour is the identity. */
  primary: "bg-accent text-accent-foreground",
  /* Legacy alias of `primary`, kept until the page rewrites replace it. */
  white: "bg-accent text-accent-foreground",
  /* Hard inversion: fills off-white, text flips to black instantly.
     `transition-transform` overrides BASE's `transition-all` (same
     tailwind-merge group) so the colour flip is immediate, per the system. */
  outline:
    "border-2 border-border bg-transparent text-foreground transition-transform duration-200 hover:bg-foreground hover:text-background",
  ghost: "bg-transparent text-foreground hover:text-accent",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-xs",
  md: "h-14 px-8 text-sm md:text-base",
  lg: "h-20 px-12 text-base md:text-lg",
};

type VisualProps = { variant?: Variant; size?: Size; className?: string };

function visualClass({ variant = "primary", size = "md", className }: VisualProps) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

function Label({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {withArrow && <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  withArrow = true,
}: ButtonProps & { href: string }) {
  const cls = visualClass({ variant, size, className });
  /* External targets (GitHub repos, WhatsApp) render a plain <a> — a
     next/link around an absolute URL would need an unnecessary client-side
     navigation, and nesting anchors is invalid HTML. */
  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cls}
      >
        <Label withArrow={withArrow}>{children}</Label>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <Label withArrow={withArrow}>{children}</Label>
    </Link>
  );
}

export function Button({
  type = "button",
  onClick,
  disabled,
  variant,
  size,
  className,
  children,
  withArrow = true,
}: ButtonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={visualClass({ variant, size, className })}
    >
      <Label withArrow={withArrow}>{children}</Label>
    </button>
  );
}
