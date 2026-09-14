"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      {/* Floating Pill Navbar matching reference design */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 rounded-full p-1.5 pl-2 pr-2 sm:p-2 sm:pl-2.5 sm:pr-2.5 transition-all duration-300 ${
          scrolled
            ? "border border-accent/30 bg-[#070b09]/90 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.8),0_0_24px_-4px_rgba(25,216,210,0.25)] backdrop-blur-2xl"
            : "border border-accent/20 bg-[#090f0c]/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6),0_0_18px_-4px_rgba(25,216,210,0.18)] backdrop-blur-xl"
        } hover:border-accent/40`}
        aria-label="Main Navigation"
      >
        {/* Left Circular Logo Badge */}
        <Link
          href="/"
          className="group relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-bg-surface p-1 shadow-[0_0_14px_-2px_rgba(25,216,210,0.4)] transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-[0_0_22px_rgba(25,216,210,0.7)]"
          aria-label="DREXA AI home"
        >
          <div className="relative h-full w-full rounded-full overflow-hidden">
            <Image
              src="/circular-app-icon-1.png"
              alt="DREXA AI"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
          {/* Subtle neon ring highlight */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-accent/30 group-hover:ring-accent/70 transition-all duration-300" />
        </Link>

        {/* Center Navigation Links (Desktop) with Sliding Pill Hover Effect */}
        <div
          className="hidden items-center gap-1 md:flex px-2"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {nav.links.map((link) => {
            const isHovered = hoveredLink === link.label;
            return (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                className="relative rounded-full px-4 py-2 text-[13.5px] font-medium tracking-tight text-text-secondary transition-colors duration-200 hover:text-white"
              >
                {/* Sliding highlight indicator on hover */}
                {isHovered && (
                  <motion.span
                    layoutId="nav-pill-hover"
                    className="absolute inset-0 rounded-full border border-accent/25 bg-accent/[0.1] shadow-[0_0_12px_rgba(25,216,210,0.2)] backdrop-blur-sm"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA Pill Button matching theme */}
        <div className="flex items-center gap-2">
          <Link
            href={nav.cta.href}
            className="group relative inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-full border border-accent/60 bg-gradient-to-r from-accent/90 via-accent to-mint px-5 sm:px-6 text-[13px] sm:text-[14px] font-semibold text-[#070b09] shadow-[0_0_18px_rgba(25,216,210,0.45)] transition-all duration-300 hover:scale-[1.03] hover:border-accent hover:from-mint hover:to-accent hover:shadow-[0_0_28px_rgba(25,216,210,0.75)] active:scale-[0.98]"
          >
            <span>{nav.cta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-bg-surface/80 text-white transition-all hover:border-accent hover:bg-accent/10 md:hidden"
          >
            {open ? <X className="h-4 w-4 text-accent" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-x-4 top-20 z-40 mx-auto max-w-sm overflow-hidden rounded-3xl border border-accent/30 bg-[#090f0c]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(25,216,210,0.2)] backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col space-y-3">
              {nav.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-medium text-text-secondary transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  <span>{link.label}</span>
                  <span className="text-accent/60">→</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-border pt-5">
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-accent/60 bg-gradient-to-r from-accent to-mint text-[15px] font-semibold text-[#070b09] shadow-[0_0_20px_rgba(25,216,210,0.4)]"
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
