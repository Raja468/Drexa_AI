"use client";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { home } from "@/content/home";
export function WhyUs() { return <section className="border-b border-border py-28 md:py-36"><Container><div className="grid gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-24"><FadeUp><SectionHeader label={home.whyUs.label} title={home.whyUs.title} description={home.whyUs.description} /></FadeUp><div className="border-t border-border">{home.whyUs.principles.map((item) => <FadeUp key={item.number} className="grid grid-cols-[48px_1fr] gap-4 border-b border-border py-6"><span className="font-mono text-[11px] text-accent">{item.number}</span><div><h3 className="font-display text-[19px] tracking-[-.025em] text-white">{item.title}</h3><p className="mt-2 text-[15px] text-text-secondary">{item.description}</p></div></FadeUp>)}</div></div></Container></section>; }
