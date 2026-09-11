/**
 * Shared quote-form schema (client + server).
 * Uses `zod/mini` — ~5 KB gzipped on the client versus ~89 KB for classic `zod`.
 */
import * as z from "zod/mini";
import { services } from "./services";

const slugs = services.map((s) => s.slug) as [string, ...string[]];

const trimmed = (max: number) => z.string().check(z.trim(), z.maxLength(max));

export const inquirySchema = z.object({
  name: z.string().check(z.trim(), z.minLength(2, "Please enter your name"), z.maxLength(80)),
  phone: z
    .string()
    .check(
      z.trim(),
      z.minLength(7, "Please enter a phone number"),
      z.maxLength(25),
      z.regex(/^[+()\-.\s\d]+$/, "Enter a valid phone number"),
    ),
  email: z.pipe(trimmed(120), z.union([z.literal(""), z.email("Enter a valid email")])),
  service: z.enum([...slugs, "other"], { error: "Pick a service" }),
  location: z.string().check(z.trim(), z.minLength(2, "City or ZIP helps us schedule"), z.maxLength(80)),
  details: z.string().check(z.trim(), z.minLength(10, "Tell us a little about the job"), z.maxLength(2000)),
  date: z.optional(trimmed(40)),
  // Honeypot — real users never fill this
  company: z.optional(z.string().check(z.maxLength(0))),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export const parseInquiry = (raw: unknown) => z.safeParse(inquirySchema, raw);
