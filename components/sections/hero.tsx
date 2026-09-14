"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import HeroScene from "@/components/three/HeroScene";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92svh] w-full overflow-hidden border-b border-border bg-bg-dark pt-28 pb-20 md:pt-36 md:pb-28 lg:min-h-[95svh] lg:pt-40 lg:pb-32"
    >
      {/* 3D Interactive Three.js Neural Constellation Background & Right Orb */}
      <HeroScene className="z-0" />

      {/* Atmospheric Cosmic Glow Highlights */}
      <div
        className="pointer-events-none absolute -right-[15%] top-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[140px] md:h-[700px] md:w-[700px] md:bg-cyan-500/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-[350px] w-[350px] rounded-full bg-purple-600/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-teal-500/8 blur-[130px]"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <Container className="relative z-10 flex min-h-[calc(92svh-12rem)] flex-col justify-center">
        <div className="max-w-[720px]">
          {/* Eyebrow / Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-mint/20 bg-mint/[0.05] px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="beacon-pulse h-2 w-2 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#9ae6b4]">
              INDEPENDENT AI TECHNOLOGY STUDIO
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.75rem,7vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white"
          >
            <span className="block">Build what</span>
            <span className="hero-glow-text block pb-1">thinks forward.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="mt-6 max-w-[560px] text-[17px] leading-[1.65] text-text-secondary md:text-[19px]"
          >
            We build AI systems, automation, and digital products that help
            businesses work smarter and grow faster.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {/* Primary Glowing Pill CTA matching screenshot */}
            <Link
              href="/contact"
              className="hero-neon-pill group h-[52px] px-8 text-[15px] font-semibold tracking-[-0.01em] text-white backdrop-blur-md"
            >
              <span className="flex items-center gap-2.5">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            {/* Secondary CTA */}
            <a
              href="#capabilities"
              className="hero-scroll-cue group inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-text-secondary transition-colors duration-200 hover:text-accent"
            >
              <span>EXPLORE OUR SERVICES</span>
              <span className="text-accent transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
