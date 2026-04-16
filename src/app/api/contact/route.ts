import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Příliš mnoho zpráv. Zkuste to později." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const phone = String(body.phone ?? "").trim().slice(0, 50);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  const locale = body.locale === "en" ? "en" : "cs";
  const honeypot = String(body.website ?? "");

  if (honeypot) return NextResponse.json({ ok: true });
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Vyplňte prosím jméno, email a zprávu." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Neplatný email." }, { status: 400 });
  }

  const saved = await prisma.bookingRequest.create({
    data: { name, email, phone, message, locale },
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM ?? "Homeopatie Petra <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO ?? "petra@homeopatie-praha.com";

    try {
      await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Nová objednávka — ${name}`,
        text: [
          `Jméno: ${name}`,
          `Email: ${email}`,
          phone ? `Telefon: ${phone}` : null,
          `Jazyk: ${locale.toUpperCase()}`,
          "",
          "Zpráva:",
          message,
          "",
          `ID záznamu: ${saved.id}`,
        ].filter(Boolean).join("\n"),
      });
    } catch (err) {
      console.error("resend send failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
