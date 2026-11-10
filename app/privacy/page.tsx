import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — DREXA AI",
  description: "Privacy policy for drexa.tech.",
  alternates: { canonical: 'https://drexa.tech/privacy' },
  openGraph: {
    title: 'Privacy Policy — DREXA AI',
    description: 'Privacy policy for drexa.tech.',
    url: 'https://drexa.tech/privacy',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DREXA AI',
    description: 'Privacy policy for drexa.tech.',
    images: ['/logo.png'],
  },

};

export default function PrivacyPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        description="Placeholder — the full policy text still needs to be written and reviewed by the owner (see docs/TODO_OWNER.md). This page exists so the footer link resolves to something honest in the meantime."
      />
    </main>
  );
}
