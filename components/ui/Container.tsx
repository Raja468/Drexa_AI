import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  id?: string;
  style?: React.CSSProperties;
  /**
   * Pushes content to the viewport edges (`max-w-[95vw]`, no padding) instead
   * of the 1360px content column. For full-bleed marquees and mega headings;
   * normal sections keep the contained default so nothing nests containers.
   */
  bleed?: boolean;
};

export function Container({ children, className, as: Tag = "div", id, style, bleed = false }: ContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "mx-auto w-full",
        bleed ? "max-w-[95vw]" : "max-w-[1360px] px-5 sm:px-8 lg:px-12",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
