import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "white" | "ghost";
type ButtonProps = { variant?: Variant; size?: "md" | "lg"; className?: string; children: ReactNode; withArrow?: boolean };
const styles: Record<Variant, string> = { primary: "bg-white text-bg-dark hover:bg-accent", white: "bg-white text-bg-dark hover:bg-accent", ghost: "text-text-secondary hover:text-white" };
function Inner({ variant = "primary", className, children, withArrow = true }: ButtonProps) { return <span className={cn("inline-flex h-11 items-center gap-2 rounded-[9px] px-5 text-[14px] font-semibold transition-colors duration-200", styles[variant], className)}><span>{children}</span>{withArrow && <ArrowUpRight className="h-4 w-4" />}</span>; }
export function ButtonLink({ href, ...props }: ButtonProps & { href: string }) { return <Link href={href}><Inner {...props} /></Link>; }
export function Button({ type = "button", onClick, ...props }: ButtonProps & { type?: "button" | "submit"; onClick?: () => void }) { return <button type={type} onClick={onClick}><Inner {...props} /></button>; }
