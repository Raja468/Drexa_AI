import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { site, footerColumns } from "@/content/site";

/**
 * Footer (design brief §7.13).
 *
 * · Link columns driven by `footerColumns` in content/site.ts (Explore,
 *   Social, Legal) plus a Contact column.
 * · The giant "DREXA." wordmark is cropped by the bottom edge (~60% visible)
 *   and scales with the viewport. It sits inside the shared Container so it
 *   never bleeds into neighbouring bands, and is rendered as a muted ghost —
 *   the same decorative tone the system uses for massive numerals. It is
 *   aria-hidden: decorative, with the brand already announced by LogoMark.
 * · The §7.13 cursor-following yellow glow over the wordmark is pointer
 *   motion — it lands in Phase 2, not here (Phase 1 gate: zero animation).
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="pt-16 md:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <LogoMark />
            <p className="mt-6 max-w-[280px] text-[15px] text-muted-foreground">{site.tagline}</p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
                {column.title}
              </span>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[14px] text-muted-foreground transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
              Contact
            </span>
            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="block text-[14px] text-muted-foreground transition-colors hover:text-accent"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-[14px] text-muted-foreground transition-colors hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground md:flex-row">
          <span>© {site.copyrightYear} {site.brand}</span>
          <a href="#hero" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>

        {/* Giant wordmark — cropped by the bottom edge, scales on mobile. */}
        <div aria-hidden="true" className="mt-10 select-none overflow-hidden md:mt-14">
          <p className="translate-y-[38%] font-display font-bold uppercase leading-[0.8] tracking-tighter text-muted text-[clamp(5rem,24vw,24rem)]">
            DREXA.
          </p>
        </div>
      </Container>
    </footer>
  );
}
