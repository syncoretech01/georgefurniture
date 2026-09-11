"use server";

import { parseInquiry, type InquiryInput } from "@/lib/validation";
import { getService } from "@/lib/services";

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof InquiryInput, string>> };

/**
 * Handles quote-form submissions.
 *
 * DELIVERY IS NOT WIRED YET — submissions are validated and logged to the server console.
 * To deliver inquiries, fill in ONE of the blocks under "deliver()" below and set the
 * matching variables in .env.local (see .env.example).
 */
export async function submitInquiry(raw: InquiryInput): Promise<InquiryResult> {
  const parsed = parseInquiry(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof InquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof InquiryInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot tripped → pretend success, drop silently.
  if (data.company) return { ok: true };

  const serviceLabel = getService(data.service)?.title ?? "Other / not sure";
  const payload = {
    receivedAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    service: serviceLabel,
    location: data.location,
    preferredDate: data.date || null,
    details: data.details,
  };

  try {
    await deliver(payload);
    return { ok: true };
  } catch (err) {
    console.error("[INQUIRY] delivery failed", err);
    return { ok: false, error: "Something went wrong sending your request. Please call us instead." };
  }
}

type Payload = {
  receivedAt: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  location: string;
  preferredDate: string | null;
  details: string;
};

async function deliver(payload: Payload) {
  // Always log — useful in Vercel/hosting logs even after delivery is added.
  console.info("[INQUIRY]", JSON.stringify(payload, null, 2));

  // --- Option A: Resend -------------------------------------------------------
  // npm i resend
  // if (process.env.RESEND_API_KEY) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: process.env.INQUIRY_FROM_EMAIL!,
  //     to: process.env.INQUIRY_TO_EMAIL!,
  //     replyTo: payload.email ?? undefined,
  //     subject: `New quote request — ${payload.service} — ${payload.name}`,
  //     text: Object.entries(payload).map(([k, v]) => `${k}: ${v ?? "-"}`).join("\n"),
  //   });
  // }

  // --- Option B: Formspree / Web3Forms webhook -------------------------------
  // if (process.env.INQUIRY_WEBHOOK_URL) {
  //   const res = await fetch(process.env.INQUIRY_WEBHOOK_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", Accept: "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  // }
}
