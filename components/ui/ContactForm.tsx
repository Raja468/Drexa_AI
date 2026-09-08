"use client"

import { useState } from "react"

type Status = "idle" | "sending" | "sent" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full min-h-11 rounded-[9px] border border-border bg-bg-elevated px-4 text-[14px] text-white placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"

  if (status === "sent") {
    return (
      <div className="border border-accent/30 bg-accent/5 p-8">
        <h2 className="font-display text-2xl text-white">Brief received.</h2>
        <p className="mt-2 text-text-secondary">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-white">Name</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-white">Email</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[12px] text-white">Budget range (optional)</span>
        <select name="budget" className={inputClass}>
          <option value="">Not sure yet</option>
          <option>Under $5k</option>
          <option>$5k – $15k</option>
          <option>$15k – $50k</option>
          <option>$50k+</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[12px] text-white">Project</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you trying to build or solve?"
          className="w-full rounded-[9px] border border-border bg-bg-elevated px-4 py-3 text-[14px] text-white placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </label>
      {status === "error" && (
        <p className="text-[13px] text-red-400">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-white px-5 text-[14px] font-semibold text-bg-dark transition-colors duration-200 hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send brief"} <span className="text-bg-dark">↗</span>
      </button>
    </form>
  )
}
