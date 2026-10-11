import { cn } from "@/lib/utils";

type NoiseTextureProps = {
  /** Extra classes — e.g. to drop the z-index below a specific overlay. */
  className?: string;
};

/**
 * Full-viewport feTurbulence grain: the print/poster texture of the Kinetic
 * system. Rendered exactly once, from the root layout.
 *
 * The texture is decorative by definition, so it is removed from the
 * accessibility tree and can never intercept pointer events. The grain itself
 * lives in a data-URI SVG filter, which has no accessible name to expose —
 * hence `aria-hidden` rather than a <title>.
 */
export function NoiseTexture({ className }: NoiseTextureProps) {
  return <div aria-hidden="true" className={cn("noise-overlay", className)} />;
}