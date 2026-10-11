import { NextResponse } from "next/server";
import { Resend } from "resend";

/* In-memory rate limit (brief §7.12): 5 requests / 10 minutes / IP.
   NOTE: this is per server instance — on serverless platforms each instance
   keeps its own map, which weakens the cap. Swap for a shared store
   (e.g. Upstash Redis) if abuse becomes a concern; the interface below is
   the only thing that would change. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    if (isRateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { name, email, company, projectType, budget, message, website } = body;

    /* Honeypot: a filled field means a bot. Answer "ok" so it learns nothing. */
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Dev mode — log to console
      console.log("[contact] New submission:", {
        name,
        email,
        company,
        projectType,
        budget,
        message,
      });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Drexa AI <noreply@drexa.tech>",
      to: process.env.CONTACT_TO_EMAIL || "hello@drexa.tech",
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        projectType ? `Project type: ${projectType}` : null,
        budget ? `Budget: ${budget}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
