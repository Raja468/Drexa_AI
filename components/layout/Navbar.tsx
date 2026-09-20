"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/motion/Magnetic";
import { waitPreloader } from "@/lib/preloader";
import { nav } from "@/content/nav";
import { cn } from "@/lib/utils";

/**
 * Floating capsule nav. The shape is the reference the user picked; the skin
 * is Kinetic: 2px rules, acid yellow, uppercase display type. The hero
 * eyebrow pill and this bar are the same family — a capsule floating over
 * dark footage.
 *
 * · At rest the capsule carries the full link set. Past ~24px of scroll the
 *   links collapse away and the bar reduces to logo + CTA. The CTA never
 *   moves, so the click target keeps its position.
 * · Hover is a fill inversion: the link becomes a yellow capsule with black
 *   type, echoing the CTA.
 * · The mobile menu stays the full-screen poster overlay — oversized display
 *   links, not a dropdown card.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  /* §7.2 beat 1 (t=0): the nav fades in as the preloader lifts. Reduced
     motion and repeat visits resolve immediately → effectively instant. */
  useEffect(() => {
    let live = true;
    void waitPreloader().then(() => {
      if (live) setReady(true);
    });
    /* Independent failsafe (owner condition): the nav appears after 2s max
       even if the preloader promise never resolves. */
    const failsafe = window.setTimeout(() => {
      if (live) setReady(true);
    }, 2000);
    return () => {
      live = false;
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* One passive listener drives the collapse. Threshold is small on purpose:
     the capsule should feel responsive, not laggy. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: reduce ? 0.01 : 0.9, ease: "easeOut" }}
      className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4"
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "pointer-events-auto relative flex items-center gap-1 rounded-full border-2 border-border bg-background py-1.5 pl-1.5 pr-1.5",
        )}
      >
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-full"
          aria-label="DREXA AI home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full p-1">
            <Image
              src="/circular-app-icon-1.png"
              alt=""
              width={28}
              height={28}
              className="h-8 w-8"
              priority
            />
          </span>
          <span className="hidden font-display text-base font-bold uppercase tracking-tighter text-foreground sm:block">
            Drexa<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Link set: present at rest, collapses into the readout on scroll. */}
        <ul
          className={cn(
            "hidden items-center overflow-hidden transition-all duration-300 md:flex",
            scrolled ? "max-w-0 opacity-0" : "max-w-[560px] opacity-100",
          )}
        >
          {nav.links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2.5 font-display text-sm font-bold uppercase tracking-tight transition-colors duration-200 hover:bg-accent hover:text-background",
                    active ? "text-accent" : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* §5.6: the nav CTA is a magnetic button (fine pointers only). */}
        <Magnetic>
          <Link
            href={nav.cta.href}
            className="hidden h-11 shrink-0 items-center gap-2 rounded-full bg-accent px-5 font-display text-sm font-bold uppercase tracking-tighter text-accent-foreground transition-transform duration-200 hover:scale-105 active:scale-95 md:inline-flex"
          >
            {nav.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Magnetic>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-border text-foreground transition-colors duration-200 hover:border-accent hover:text-accent md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="pointer-events-auto fixed inset-0 top-[88px] z-40 flex flex-col bg-background md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center gap-2 px-6">
            {nav.links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-border py-4"
              >
                <span aria-hidden="true" className="font-mono text-xs tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="font-display text-4xl font-bold uppercase tracking-tighter text-foreground transition-colors duration-200 group-hover:text-accent">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="border-t-2 border-border p-6">
            <Link
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent font-display text-base font-bold uppercase tracking-tighter text-accent-foreground"
            >
              {nav.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
