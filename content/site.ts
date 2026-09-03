export const site = {
  brand: "DREXA AI",
  tagline: "Digital products. AI. Automation.",
  email: "hello@drexa.ai",
  copyrightYear: 2026,
} as const;

export const footerColumns = [
  { title: "Explore", links: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] },
] as const;
