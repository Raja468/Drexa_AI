import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = { children: ReactNode; className?: string; as?: "div" | "section" | "header" | "footer" | "nav"; id?: string; style?: React.CSSProperties };
export function Container({ children, className, as: Tag = "div", id, style }: ContainerProps) {
  return <Tag id={id} className={cn("mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12", className)} style={style}>{children}</Tag>;
}
