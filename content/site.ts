export const site = {
  brand: "DREXA AI",
  tagline: "Digital products. AI. Automation.",
  email: "hello@drexa.tech",
  copyrightYear: 2026,
  /**
   * Booking URL (brief §7.12) — [OWNER PROVIDES]. The "Book a call" button
   * renders nothing while this is null (no fake links); WhatsApp stays the
   * primary CTA. Drop the Cal.com/Calendly URL here to switch it on.
   */
  bookingUrl: null as string | null,
  whatsapp: { label: "Or message us on WhatsApp", href: "https://wa.me/923715082737" },
} as const;

export const footerColumns = [
  { title: "Explore", links: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] },
  { title: "Social", links: [
    { label: "GitHub", href: "https://github.com/Raja468" },
  ] },
  { title: "Legal", links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] },
] as const;
