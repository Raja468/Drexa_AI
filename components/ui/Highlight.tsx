import type { ReactNode } from "react";

/**
 * Renders `text` with `accent` swapped for an accent-coloured span.
 *
 * Kinetic headings always highlight one phrase inside a longer sentence. Doing
 * that by hand means repeating `<em className="text-accent">` in every section
 * and splitting copy into fragments — which then can't be edited as one string.
 * Keeping the phrase as plain data and locating it at render time avoids both.
 *
 * Returns the plain text unchanged if the phrase isn't found, so a copy edit
 * can never blank out a heading.
 */
type HighlightProps = {
  text: string;
  /** Phrase inside `text` that receives the accent colour. */
  accent?: string;
};

export function Highlight({ text, accent }: HighlightProps): ReactNode {
  if (!accent) return text;

  const index = text.indexOf(accent);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-gradient-accent">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}