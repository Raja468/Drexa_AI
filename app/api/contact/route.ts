import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, budget, message } = body;

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
      from: process.env.CONTACT_FROM_EMAIL || "Drexa AI <noreply@drexa.ai>",
      to: process.env.CONTACT_TO_EMAIL || "hello@drexa.ai",
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
