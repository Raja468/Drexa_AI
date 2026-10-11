import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service — DREXA AI",
  description: "Terms of service for drexa.tech.",
};

export default function TermsPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      <PageHero
        eyebrow="Legal"
        title="Terms of service."
        description="Placeholder — the full terms still need to be written and reviewed by the owner (see docs/TODO_OWNER.md). This page exists so the footer link resolves to something honest in the meantime."
      />
    </main>
  );
}
