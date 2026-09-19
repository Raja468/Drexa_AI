/**
 * Contact page copy — the single source of truth for /contact.
 * Extracted verbatim from app/contact/page.tsx in Phase 0 (brief §12):
 * the page must render byte-identical output, so the strings here are the
 * page's live copy, not the older draft copy that used to live in this slot.
 */
export const contactPage = {
  hero: {
    eyebrow: "Initiate project",
    title: "Have an idea? Let's build it.",
    accent: "Let's build it.",
    description:
      "Tell us about your business goals and technical roadblocks. We will help you turn the concept into a clear architectural plan and a working product built for outcomes.",
  },

  directLines: {
    label: "Direct lines",
    title: "Reach our engineers directly.",
    description:
      "No gatekeepers or sales reps. We review every brief personally and get back to you within 24 hours.",
    channels: [
      {
        kind: "email" as const,
        caption: "Email us directly",
        value: "hello@drexa.tech",
        href: "mailto:hello@drexa.tech",
      },
      {
        kind: "whatsapp" as const,
        caption: "WhatsApp message",
        value: "+92 371 5082737",
        href: "https://wa.me/923715082737",
      },
    ],
  },

  expectations: {
    label: "What to expect on our 30-min call",
    items: [
      "Technical architecture breakdown of your requested features.",
      "Realistic timeline estimates, feasibility risks, and milestones.",
      "Strict confidentiality and zero sales pressure.",
    ],
  },

  form: {
    serviceOptions: [
      "AI Automation",
      "AI Agents",
      "LLM / RAG Pipelines",
      "Custom Software / Web",
      "Cybersecurity Audit",
      "Rapid MVP / R&D",
    ],
    budgetRanges: ["< $3,000", "$3,000 — $8,000", "$8,000 — $20,000", "$20,000+"],
    submitLabel: "Submit project brief",
  },

  faqs: {
    label: "Clarifications",
    title: "Frequently asked",
    items: [
      {
        q: "How fast can we kick off a project?",
        a: "We can typically start within 3 to 5 business days after our discovery call and scoping alignment.",
      },
      {
        q: "Who owns the Intellectual Property?",
        a: "You do. 100% of the code, architecture schemas, repositories, and documentation belong to you at launch.",
      },
      {
        q: "Do you offer post-launch maintenance?",
        a: "Yes. We offer continuous support, server monitoring, security updates, and feature iteration retainers.",
      },
      {
        q: "Can you sign an NDA before we share sensitive details?",
        a: "Absolutely. We are happy to execute a mutual NDA before reviewing proprietary workflows and datasets.",
      },
    ],
  },
} as const;
