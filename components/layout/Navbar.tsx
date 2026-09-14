"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { nav } from "@/content/nav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on page change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      <div
        className={`w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-border/80 bg-bg-dark/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "border-white/[0.06] bg-bg-dark/40 backdrop-blur-md"
        }`}
      >
        <Container className="flex h-[76px] items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <LogoMark />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center md:flex" aria-label="Main Navigation">
            <ul className="flex items-center gap-1 lg:gap-2">
              {nav.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="relative rounded-lg px-3.5 py-2 text-[14px] font-medium text-text-secondary transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={nav.cta.href}
              className="group relative inline-flex h-10 items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.08] px-5 text-[13px] font-semibold text-white shadow-[0_0_15px_-3px_rgba(25,216,210,0.3)] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg-dark hover:shadow-[0_0_24px_rgba(25,216,210,0.6)]"
            >
              <span>{nav.cta.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 top-[76px] z-40 flex flex-col justify-between border-b border-border bg-bg-dark/98 p-6 backdrop-blur-2xl md:hidden"
          >
            <nav className="pt-4">
              <ul className="space-y-4">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-[22px] font-medium tracking-tight text-white transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pb-12 pt-6">
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="hero-neon-pill flex h-12 w-full items-center justify-center gap-2 text-[15px] font-semibold text-white"
              >
                <span>{nav.cta.label}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
