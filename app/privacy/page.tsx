import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — DREXA AI",
  description: "Privacy policy for drexa.tech.",
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
