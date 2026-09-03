"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { home } from "@/content/home";

type ParticleNetworkProps = {
  containerRef: React.RefObject<HTMLElement | null>;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function ParticleNetwork({ containerRef }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles: Particle[] = [];
    const cursor = { x: -1000, y: -1000 };
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = width < 768 ? 28 : 60;
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.16;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      cursor.x = event.clientX - bounds.left;
      cursor.y = event.clientY - bounds.top;
    };

    const handlePointerLeave = () => {
      cursor.x = -1000;
      cursor.y = -1000;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        if (!reduceMotion) {
          const dx = particle.x - cursor.x;
          const dy = particle.y - cursor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110 && distance > 0) {
            const force = ((110 - distance) / 110) * 0.018;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          particle.vx = Math.max(-0.32, Math.min(0.32, particle.vx));
          particle.vy = Math.max(-0.32, Math.min(0.32, particle.vy));
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
          if (particle.y < -4) particle.y = height + 4;
          if (particle.y > height + 4) particle.y = -4;
        }
      });

      context.lineWidth = 1;
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const dx = particles[first].x - particles[second].x;
          const dy = particles[first].y - particles[second].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 85) {
            context.strokeStyle = `rgba(93, 202, 165, ${0.15 * (1 - distance / 85)})`;
            context.beginPath();
            context.moveTo(particles[first].x, particles[first].y);
            context.lineTo(particles[second].x, particles[second].y);
            context.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        context.fillStyle = "rgba(93, 202, 165, 0.56)";
        context.beginPath();
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        context.fill();
      });

      if (!reduceMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />;
}

function FocalCore() {
  return (
    <div className="hero-focal-core relative aspect-square w-full max-w-[480px]" role="img" aria-label="DREXA intelligent systems visual">
      <svg viewBox="0 0 500 500" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
        <circle className="hero-core-ring hero-core-ring--outer" cx="250" cy="250" r="174" stroke="#5dcaa5" strokeOpacity=".28" />
        <circle className="hero-core-ring hero-core-ring--inner" cx="250" cy="250" r="128" stroke="#1d9e75" strokeOpacity=".48" strokeDasharray="2 12" />
        <path className="hero-core-cross" d="M88 250H412M250 88V412" stroke="#5dcaa5" strokeOpacity=".22" />
        <path className="hero-core-cross" d="M136 136L364 364M364 136L136 364" stroke="#639922" strokeOpacity=".2" />
        <rect className="hero-core-diamond" x="186" y="186" width="128" height="128" transform="rotate(45 250 250)" fill="#070707" stroke="#5dcaa5" strokeWidth="1.5" />
        <rect x="218" y="218" width="64" height="64" transform="rotate(45 250 250)" fill="#1d9e75" fillOpacity=".16" stroke="#639922" strokeOpacity=".8" />
        <circle cx="250" cy="250" r="5" fill="#5dcaa5" />
      </svg>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { eyebrow, subhead, cta, ctaSecondary } = home.hero;

  return (
    <section ref={heroRef} id="hero" className="relative min-h-[90svh] overflow-hidden border-b border-border pt-12 pb-12 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20">
      <ParticleNetwork containerRef={heroRef} />
      <Container className="relative z-10 flex min-h-[calc(90svh-5rem)] items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div>
            <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 block font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="max-w-[650px] font-display text-[clamp(2.2rem,4.5vw,4.5rem)] font-medium leading-[0.96] tracking-[-0.065em] text-white">
              We build digital products<br />that move businesses<br /><span className="bg-gradient-to-r from-accent to-accent-green bg-clip-text text-transparent">forward.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-5 max-w-[500px] text-[16px] leading-[1.6] text-text-secondary">
              {subhead}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }} className="mt-6 flex flex-wrap items-center gap-6">
              <Link href={cta.href} className="inline-flex h-12 items-center gap-2 rounded-[9px] bg-white px-6 text-[14px] font-semibold text-bg-dark transition-colors hover:bg-accent">
                {cta.label}<ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={ctaSecondary.href} className="inline-flex items-center gap-2 text-[14px] font-medium text-text-secondary transition-colors hover:text-white">
                {ctaSecondary.label}<ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden justify-center lg:flex lg:justify-end">
            <FocalCore />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
