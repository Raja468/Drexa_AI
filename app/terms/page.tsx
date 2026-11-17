import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service — DREXA AI",
  description: "Terms of service for drexa.tech.",
  alternates: { canonical: 'https://drexa.tech/terms' },
  openGraph: {
    title: 'Terms of Service — DREXA AI',
    description: 'Terms of service for drexa.tech.',
    url: 'https://drexa.tech/terms',
    siteName: 'Drexa AI',
    type: 'website',
    images: [{ url: '/logo.png', width: 1672, height: 941, alt: 'Drexa AI — Build smarter. Run safer.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — DREXA AI',
    description: 'Terms of service for drexa.tech.',
    images: ['/logo.png'],
  },

};

export default function TermsPage() {
  return (
    <main className="bg-background text-foreground pt-24 pb-28">
      <PageHero
        eyebrow="Legal"
        title="Terms of service."
        description="The terms for using drexa.tech, our free tools, and ChatConnect AI. Last updated 17 November 2026."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-[720px]">
            <p className="text-[18px] leading-[1.7] text-muted-foreground">
              These terms govern your use of drexa.tech, our free tools, and
              our ChatConnect AI WhatsApp service. By using them, you agree to
              these terms. If you do not agree, please do not use them.
              Questions about these terms:{" "}
              <a
                href="mailto:hello@drexa.tech"
                className="text-foreground underline decoration-accent underline-offset-4"
              >
                hello@drexa.tech
              </a>
              , WhatsApp +92 371 5082737.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              1. Who we are
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Drexa AI is a remote-first development studio based in Chakwal,
              Pakistan (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We build websites,
              software and mobile apps, AI automation, and security audits for
              clients everywhere. We work remotely and have no physical office
              — you can reach us by email or WhatsApp. &ldquo;You&rdquo; means
              anyone who uses this website, our tools, or our services.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              2. Services
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              We offer web and software development, AI automation, security
              audits, and AI visibility — helping businesses get found on
              Google and recommended by AI assistants. Every project starts
              with a free call and a fixed quote. A project begins once you
              agree to the quote. The quote covers the scope we agree together;
              if the scope changes, we will agree a revised quote before
              continuing.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              3. Website and free tools
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Our Website Security Score and SEO Check tools are free and
              report-only. You enter a domain name, we check that site&rsquo;s
              publicly visible information, and we show you a score. No login
              is needed, and the tools never access private parts of a site.
              Scores can change as a site changes, so a result reflects the
              moment you ran the check.
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Results are guidance based on public checks at that moment — not
              a guarantee that a site is secure or that it will rank. A score
              is not a substitute for a full security audit, which looks
              deeper than public checks can.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              4. ChatConnect AI
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              ChatConnect AI answers WhatsApp messages for a business using
              that business&rsquo;s knowledge base. If you use it, you agree
              to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-muted-foreground">
              <li>not send spam or unsolicited bulk messages;</li>
              <li>not use it for illegal content, harassment, hate, or deception;</li>
              <li>only connect a WhatsApp number you own or are authorised to use;</li>
              <li>follow Meta&rsquo;s WhatsApp policies for business messaging.</li>
            </ul>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Messages and conversation history are kept for 90 days, then
              deleted — see our{" "}
              <a
                href="/privacy"
                className="text-foreground underline decoration-accent underline-offset-4"
              >
                privacy policy
              </a>
              . The business is responsible for keeping its own knowledge base
              — FAQs, business hours, and other information — accurate and up
              to date. Replies are generated automatically and may occasionally be
              wrong, so the business is responsible for checking the replies
              sent to its customers. The service is provided as-is. We may
              suspend or stop the service for an account that breaks these
              rules.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              5. Quotes, payment, delivery
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Every project gets a fixed quote after a free call. Work starts
              after you agree to the quote. Payment terms — amount, schedule,
              and method — are as stated in the quote. Any delivery dates in a
              quote are estimates; if something slips, we will tell you
              promptly.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              6. Intellectual property
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Once you have paid in full, you own the deliverables built for
              you — your website, software, or reports. We keep ownership of
              our own tools, templates, libraries, and pre-existing code, and
              of anything we built before your project; you may use them as
              part of your deliverable. Our name, logo, and site content
              remain ours — please do not reuse them without asking.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              7. Liability
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              Our services are provided as-is. Security audit findings
              describe the state of a site at the time of the audit — new
              issues can appear later, and a clean audit is not a guarantee
              against future attacks. To the extent the law allows, our
              liability for any claim about a service is limited to the fees
              you paid for that service. We are not liable for losses caused
              by third-party services outside our control, such as hosting
              providers, Meta, or AI providers. Nothing in these terms limits
              liability that cannot be limited by law.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              8. Changes to these terms
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              We may update these terms from time to time. The latest version
              is always on this page, with the date shown above. Continued use
              of the site or services after a change means you accept the new
              terms.
            </p>

            <h2 className="mt-14 font-display text-2xl uppercase text-foreground">
              9. Governing law
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-muted-foreground">
              These terms are governed by the laws of Pakistan.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
