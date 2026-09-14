"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/motion/FadeUp";
import { site } from "@/content/site";

const serviceOptions = [
  "AI Automation",
  "AI Agents",
  "LLM / RAG Pipelines",
  "Custom Software / Web",
  "Cybersecurity Audit",
  "Rapid MVP / R&D",
];

const budgetRanges = ["< $3,000", "$3,000 — $8,000", "$8,000 — $20,000", "$20,000+"];

const contactFaqs = [
  {
    q: "How fast can we kick off a project?",
    a: "We can typically start within 3 to 5 business days after our discovery call and scoping alignment.",
  },
  {
    q: "Who owns the Intellectual Property?",
    a: "You do. 100% of the code, architecture schemas, repositories, and documentation belong to you at launch.",
  },
  {
    q: "Do you offer post-launch maintenance?",
    a: "Yes. We offer continuous support, server monitoring, security updates, and feature iteration retainers.",
  },
  {
    q: "Can you sign an NDA before we share sensitive details?",
    a: "Absolutely. We are happy to execute a mutual NDA before reviewing proprietary workflows and datasets.",
  },
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$3,000 — $8,000");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      services: selectedServices,
      budget: selectedBudget,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
      setSelectedServices([]);
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full min-h-12 rounded-xl border border-border bg-bg-elevated px-4 py-3 text-[15px] text-white placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all";

  return (
    <main className="bg-bg-dark text-white pt-24 pb-28">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <div
          className="pointer-events-none absolute -right-[10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-mint/10 blur-[140px]"
          aria-hidden="true"
        />
        <Container>
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ae6b4]">
              <span className="beacon-pulse h-1.5 w-1.5 rounded-full bg-mint" />
              Initiate Project
            </div>
            <h1 className="max-w-[850px] font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-white">
              Have an idea?{" "}
              <span className="hero-glow-text block">Let&apos;s build it.</span>
            </h1>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-text-secondary md:text-[18px]">
              Tell us about your business goals and technical roadblocks. We will help you turn
              the concept into a clear architectural plan and a working product built for outcomes.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-20 md:py-28 border-b border-border">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20 items-start">
            {/* Left Column: Direct Channels & Guarantees */}
            <FadeUp className="space-y-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                  Direct Lines
                </span>
                <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold text-white tracking-tight">
                  Reach our engineering leads directly.
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-text-secondary">
                  No gatekeepers or sales reps. We review every brief personally and get back to you within 24 hours.
                </p>
              </div>

              {/* Direct Channels Cards */}
              <div className="space-y-4">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-bg-surface p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(25,216,210,0.15)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-bg-dark text-accent">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                        Email Us Directly
                      </div>
                      <div className="text-[16px] font-semibold text-white group-hover:text-accent transition-colors">
                        {site.email}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="https://wa.me/923715082737"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-bg-surface p-5 transition-all hover:border-accent hover:shadow-[0_0_20px_rgba(25,216,210,0.15)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-mint/30 bg-bg-dark text-mint">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                        WhatsApp Message
                      </div>
                      <div className="text-[16px] font-semibold text-white group-hover:text-mint transition-colors">
                        +92 371 5082737
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-mint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Consultation Perks */}
              <div className="rounded-2xl border border-border bg-bg-surface/50 p-6 space-y-3">
                <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  What to expect on our 30-min call:
                </div>
                <ul className="space-y-2 text-[13.5px] text-text-secondary">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                    <span>Technical architecture breakdown of your requested features.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                    <span>Realistic timeline estimates, feasibility risks, and milestones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                    <span>Strict confidentiality and zero sales pressure.</span>
                  </li>
                </ul>
              </div>
            </FadeUp>

            {/* Right Column: Project Brief Form */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl border border-border bg-bg-surface p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                {status === "sent" ? (
                  <div className="rounded-2xl border border-accent/40 bg-accent/5 p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg-dark font-bold text-2xl">
                      ✓
                    </div>
                    <h3 className="font-display text-[24px] font-semibold text-white">
                      Project Brief Received
                    </h3>
                    <p className="text-[15px] text-text-secondary max-w-md mx-auto leading-[1.6]">
                      Thank you for reaching out! Our engineering team will review your requirements and respond within one business day with next steps.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 inline-flex font-mono text-[12px] uppercase tracking-[0.1em] text-accent hover:underline"
                    >
                      ← Submit another brief
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-display text-[22px] font-semibold text-white">
                        Send a Project Brief
                      </h3>
                      <p className="mt-1 text-[14px] text-text-secondary">
                        Fill out the details below so we can prepare before our first call.
                      </p>
                    </div>

                    {/* Name and Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                          Your Name *
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="Jane Doe"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                          Work Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                        Company / Organization
                      </label>
                      <input
                        name="company"
                        placeholder="Company name (optional)"
                        className={inputClass}
                      />
                    </div>

                    {/* Service Selection Badges */}
                    <div>
                      <label className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                        What areas do you need help with?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((svc) => {
                          const active = selectedServices.includes(svc);
                          return (
                            <button
                              key={svc}
                              type="button"
                              onClick={() => toggleService(svc)}
                              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                                active
                                  ? "border border-accent bg-accent text-bg-dark font-semibold shadow-[0_0_12px_rgba(25,216,210,0.4)]"
                                  : "border border-border bg-bg-dark text-text-secondary hover:border-accent/30 hover:text-white"
                              }`}
                            >
                              {active ? `✓ ${svc}` : `+ ${svc}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Estimated Budget */}
                    <div>
                      <label className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                        Target Budget Range
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {budgetRanges.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBudget(b)}
                            className={`rounded-xl px-3 py-2 text-[12px] font-mono transition-all text-center ${
                              selectedBudget === b
                                ? "border border-accent/60 bg-accent/15 text-accent font-semibold"
                                : "border border-border bg-bg-dark text-text-secondary hover:border-border/80"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message / Brief */}
                    <div>
                      <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                        Project Overview *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us what you are trying to build, existing systems, or your core business bottleneck..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="hero-neon-pill flex h-13 w-full items-center justify-center gap-2 text-[15px] font-semibold text-white transition-all disabled:opacity-50"
                    >
                      {status === "sending" ? (
                        <span>Submitting Brief...</span>
                      ) : (
                        <>
                          <span>Submit Project Brief</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-[13px] text-red-400 text-center">
                        Something went wrong while submitting. Please email us directly at {site.email}.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28">
        <Container>
          <FadeUp>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Clarifications
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white tracking-tight">
              Frequently asked questions
            </h2>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {contactFaqs.map((faq) => (
              <FadeUp key={faq.q} className="rounded-2xl border border-border bg-bg-surface p-7">
                <h3 className="font-display text-[17px] font-semibold text-white">
                  {faq.q}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-text-secondary">
                  {faq.a}
                </p>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
