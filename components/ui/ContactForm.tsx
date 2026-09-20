"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/Button"

type Status = "idle" | "sending" | "sent" | "error"

/**
 * Oversized underline fields: ~96px tall, no fill, no radius — the border does
 * the work the box used to do, and focus turns the underline accent.
 *
 * Two deliberate calls:
 * · Typed values stay `normal-case` while labels and placeholders are
 *   uppercase. An email address rendered in caps reads as a mistake to the
 *   person typing it, and the system's own rule keeps content (as opposed to
 *   display type) in normal case. The email placeholder additionally renders
 *   normal case (brief §2 rule 8 — see FIELD_EMAIL below).
 * · The placeholder is `muted-foreground/80`, not the system's `muted`
 *   (#27272A). At 1.9:1 on the background that tone is effectively invisible as
 *   *text*; it stays legitimate for the decorative numerals, not for an
 *   instruction the user has to read.
 *
 * Validation (brief §7.12): zod schema via a hand-rolled react-hook-form
 * resolver — @hookform/resolvers is outside the brief's allowed-dependency
 * list, so the ~10-line adapter below stands in for it. Inline errors use the
 * `--color-danger` token; the honeypot field is visually hidden and, when
 * filled, the submit pretends success without contacting the API. Server-side
 * rate limiting lives in /api/contact.
 *
 * No `focus:outline-none`: the global :focus-visible rule is left in place so
 * keyboard users get a real indicator rather than a colour change alone.
 */
const FIELD =
  "min-h-24 w-full border-b-2 border-border bg-transparent px-0 py-4 font-display text-2xl font-bold tracking-tighter text-foreground transition-colors duration-200 placeholder:font-bold placeholder:uppercase placeholder:text-muted-foreground/80 focus:border-accent md:text-3xl"

/* Email field exception (design brief §2 rule 8): the placeholder renders in
   normal case and semibold (D7) — uppercase + bold at 24–30px clipped
   "YOU@COMPANY.COM" to "YOU@COMPANY.C" — and one step *smaller* than the
   field type: in the half-width grid column the hint still clipped at
   desktop sizes, so it now runs 20/24px instead of 24/30px. Typed values are
   unaffected — `placeholder:*` styles the hint only. */
const FIELD_EMAIL = FIELD.replace(
  "placeholder:font-bold placeholder:uppercase",
  "placeholder:font-semibold placeholder:text-xl md:placeholder:text-2xl",
)

const LABEL = "mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"

const ERROR = "mt-2 block font-mono text-xs tracking-wide text-danger"

const formSchema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.email("That email address doesn't look right."),
  company: z.string().optional(),
  /* Honeypot: humans never see or fill this. Not schema-validated on purpose —
     a filled honeypot must still reach onSubmit, which fakes success. */
  website: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "A sentence or two about the project helps us reply usefully."),
})

type FormValues = z.infer<typeof formSchema>

/* Minimal react-hook-form resolver backed by the zod schema (keeps
   @hookform/resolvers out of the dependency list, per brief §2). */
const zodResolver = (schema: typeof formSchema) => async (values: Record<string, unknown>) => {
  const parsed = schema.safeParse(values)
  if (parsed.success) return { values: parsed.data, errors: {} }
  const errors: Record<string, { type: string; message: string }> = {}
  for (const issue of parsed.error.issues) {
    const key = issue.path[0]
    if (typeof key === "string" && !errors[key]) errors[key] = { type: issue.code, message: issue.message }
  }
  return { values: {}, errors }
}

export function ContactForm({
  services,
  budgets,
  showCompany = false,
  submitLabel = "Send brief",
}: {
  /** When provided, renders chip toggles and submits them as `projectType`. */
  services?: readonly string[];
  /** When provided, renders budget chips and submits the pick as `budget`
      (instead of the default <select> with its own ranges). */
  budgets?: readonly string[];
  showCompany?: boolean;
  submitLabel?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle")
  const [selected, setSelected] = useState<string[]>([])
  const [budget, setBudget] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", website: "", budget: "", message: "" },
  })

  function toggle(service: string) {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  const onSubmit = handleSubmit(async (values) => {
    /* Honeypot filled → almost certainly a bot. Pretend success, send nothing. */
    if (values.website) {
      setStatus("sent")
      return
    }
    setStatus("sending")
    const data: Record<string, string> = {
      name: values.name,
      email: values.email,
      message: values.message,
    }
    if (showCompany && values.company) data.company = values.company
    if (services && selected.length > 0) data.projectType = selected.join(", ")
    if (budgets && budget) data.budget = budget
    else if (!budgets && values.budget) data.budget = values.budget
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed")
      setStatus("sent")
      reset()
      setSelected([])
      setBudget(null)
    } catch {
      setStatus("error")
    }
  })

  if (status === "sent") {
    return (
      <div className="mt-8 border-2 border-accent bg-accent p-8 text-accent-foreground">
        <p className="font-display text-3xl uppercase tracking-tighter md:text-4xl">
          Brief received.
        </p>
        <p className="mt-3 text-lg font-medium leading-tight">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 space-y-8">
      {/* Honeypot — visually hidden, ignored by keyboard and screen readers. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL}>Name</span>
          <input
            {...register("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
            placeholder="Your name"
            className={FIELD}
          />
          {errors.name && (
            <span id="name-error" className={ERROR}>
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className={LABEL}>Email</span>
          <input
            {...register("email")}
            type="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
            placeholder="you@company.com"
            className={FIELD_EMAIL}
          />
          {errors.email && (
            <span id="email-error" className={ERROR}>
              {errors.email.message}
            </span>
          )}
        </label>
        {showCompany && (
          <label className="block sm:col-span-2">
            <span className={LABEL}>Company (optional)</span>
            <input {...register("company")} placeholder="Company name" className={FIELD} />
          </label>
        )}
      </div>

      {services && services.length > 0 && (
        <fieldset>
          <legend className={LABEL}>What do you need?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {services.map((service) => {
              const active = selected.includes(service)
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggle(service)}
                  aria-pressed={active}
                  className={`border-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {service}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      {budgets && budgets.length > 0 ? (
        <fieldset>
          <legend className={LABEL}>Target budget range</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {budgets.map((range) => {
              const active = budget === range
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => setBudget(active ? null : range)}
                  aria-pressed={active}
                  className={`border-2 px-3 py-2 text-center font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent text-accent-foreground font-bold"
                      : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              )
            })}
          </div>
        </fieldset>
      ) : (
        <label className="block">
          <span className={LABEL}>Budget range (optional)</span>
          <select {...register("budget")} className={FIELD}>
            <option value="">Not sure yet</option>
            <option>Under $5k</option>
            <option>$5k – $15k</option>
            <option>$15k – $50k</option>
            <option>$50k+</option>
          </select>
        </label>
      )}

      <label className="block">
        <span className={LABEL}>Project</span>
        <textarea
          {...register("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
          rows={3}
          placeholder="What are you trying to build or solve?"
          className={`${FIELD} min-h-[11rem] resize-y`}
        />
        {errors.message && (
          <span id="message-error" className={ERROR}>
            {errors.message.message}
          </span>
        )}
      </label>

      {status === "error" && (
        <p role="alert" className={ERROR}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : submitLabel}
      </Button>
    </form>
  )
}
