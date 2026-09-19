/**
 * Proof strip data (design brief §7.5) — `[OWNER PROVIDES]` territory.
 *
 * HARD RULE (§2 rule 2): nothing renders unless its data is real and listed
 * here. `counters` and `techSlugs` are filled with what is verifiable from
 * this repository today; `testimonials` and `clientLogos` are intentionally
 * empty and their sections render nothing until the owner adds real entries.
 */

export const proof = {
  /**
   * Counters — each value needs a traceable source (the `source` field).
   * Rendered as static numbers; the once-per-view count-up is a Phase 2
   * motion item, so nothing animates yet.
   */
  counters: [
    {
      value: "3",
      label: "AI products shipped",
      // Source: the three internal / R&D builds listed in content/work.ts,
      // each linked to its public repository.
      source: "content/work.ts items",
    },
    {
      value: "30+",
      label: "Technologies across the stack",
      // Source: distinct technologies named across content/work.ts item tags
      // and content/services.ts `tech` arrays (19 in work alone).
      source: "tech fields in content/work.ts + content/services.ts",
    },
    {
      value: "100%",
      label: "IP ownership handover",
      // Source: content/about.ts stats — studio policy, restated on /about.
      source: "content/about.ts stats",
    },
    {
      value: "24h",
      label: "Max reply time to a brief",
      // Source: content/contact.ts directLines.description ("within 24 hours").
      source: "content/contact.ts directLines",
    },
  ],

  /**
   * Tech-stack marquee (§7.5.2) — simple-icons slugs only. Every entry is a
   * technology that appears in the real `tech` fields of content/services.ts
   * or content/work.ts. (OpenAI / Whisper / Pinecone are named in content but
   * simple-icons carries no mark for them, so they are omitted rather than
   * faked with a generic glyph.)
   */
  techSlugs: [
    "react",
    "nextdotjs",
    "typescript",
    "python",
    "nodedotjs",
    "postgresql",
    "redis",
    "docker",
    "tailwindcss",
    "flask",
    "fastapi",
    "pytorch",
    "threedotjs",
    "qdrant",
    "langchain",
    "anthropic",
    "express",
    "sqlite",
    "jinja",
    "chartdotjs",
    "figma",
    "vercel",
    "git",
  ] as const,

  /**
   * §7.5.3 — hidden until at least one real testimonial exists:
   * { name, role, quote, photo? }. Do NOT add placeholder entries.
   */
  testimonials: [] as ReadonlyArray<{
    name: string;
    role: string;
    quote: string;
    photo?: string;
  }>,

  /**
   * §7.5.4 — hidden until real logos exist. No placeholder logos, ever.
   */
  clientLogos: [] as ReadonlyArray<{ name: string; image: string }>,
} as const;
