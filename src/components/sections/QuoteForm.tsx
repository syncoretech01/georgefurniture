"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Phone, Mail, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { serviceOptions } from "@/lib/services";
import { inquirySchema, type InquiryInput } from "@/lib/validation";
import { submitInquiry } from "@/app/actions/inquiry";
import { PREFILL_EVENT } from "@/lib/scroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl border-2 border-transparent bg-paper-2 px-4 py-3.5 text-graphite placeholder:text-slate-2/70 transition-colors focus:border-yellow focus:bg-paper focus:outline-none aria-[invalid=true]:border-[#c2410c]";
const labelClass = "eyebrow mb-2 block text-slate";

export function QuoteForm() {
  const ref = useRef<HTMLElement>(null);
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: standardSchemaResolver(inquirySchema),
    defaultValues: { service: undefined, email: "", date: "", company: "" },
  });

  // Pre-select a service from a card click or a ?service= deep link.
  useEffect(() => {
    const valid = new Set(serviceOptions.map((o) => o.value));
    const apply = (slug?: string | null) => {
      if (slug && valid.has(slug as (typeof serviceOptions)[number]["value"])) {
        setValue("service", slug as InquiryInput["service"], { shouldValidate: false });
      }
    };
    apply(new URLSearchParams(window.location.search).get("service"));
    const onPrefill = (e: Event) => apply((e as CustomEvent<{ service: string }>).detail?.service);
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [setValue]);

  const { contextSafe } = useGSAP({ scope: ref });

  const onSubmit = handleSubmit((values) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitInquiry(values);
      if (res.ok) {
        setDone(true);
        return;
      }
      setServerError(res.error);
      if (res.fieldErrors) {
        for (const [k, msg] of Object.entries(res.fieldErrors)) {
          if (msg) setError(k as keyof InquiryInput, { message: msg });
        }
      }
    });
  });

  // Success-state entrance
  useEffect(() => {
    if (!done) return;
    const play = contextSafe(() => {
      gsap.fromTo("[data-success] > *", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08 });
    });
    play();
  }, [done, contextSafe]);

  return (
    <section ref={ref} id="quote" className="dot-grid section-y relative scroll-mt-16 overflow-hidden bg-graphite text-paper">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            tone="light"
            eyebrow="Free quote"
            title={
              <>
                Get your <span className="text-yellow">free quote.</span>
              </>
            }
            lead="Tell George what you need done. You'll hear back within 24 hours — usually a lot sooner."
          />

          <Reveal stagger={0.08} className="mt-10 space-y-5">
            <a href={site.phoneHref} className="group flex items-center gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow text-graphite">
                <Phone className="size-5" strokeWidth={2.5} aria-hidden />
              </span>
              <span>
                <span className="eyebrow block text-paper/60">Call or text</span>
                <span className="font-display text-2xl uppercase leading-none text-paper group-hover:text-yellow transition-colors md:text-3xl">{site.phone}</span>
              </span>
            </a>
            <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-paper/20 text-paper">
                <Mail className="size-5" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block text-paper/60">Email</span>
                <span className="block truncate font-label text-lg font-semibold tracking-wide text-paper group-hover:text-yellow transition-colors">{site.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-paper/20 text-paper">
                <Clock className="size-5" strokeWidth={2.5} aria-hidden />
              </span>
              <span>
                <span className="eyebrow block text-paper/60">Hours</span>
                <span className="font-label text-lg font-semibold tracking-wide text-paper">{site.hoursShort}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal y={40} className="rounded-3xl bg-paper p-6 text-graphite shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8 md:p-10">
          {done ? (
            <div data-success className="flex min-h-[28rem] flex-col items-start justify-center">
              <CheckCircle2 className="size-14 text-yellow-deep" strokeWidth={2} aria-hidden />
              <h3 className="display-md mt-6">Got it — George will be in touch.</h3>
              <p className="mt-3 max-w-md text-slate">
                Expect a call or text within 24 hours. Need it faster? Call now and mention you sent the form.
              </p>
              <ButtonLink href={site.phoneHref} className="mt-8" icon={<Phone className="size-4" strokeWidth={2.5} aria-hidden />}>
                {site.phone}
              </ButtonLink>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input id="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} className={inputClass} {...register("name")} />
                <FieldError msg={errors.name?.message} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input id="phone" type="tel" autoComplete="tel" placeholder="(843) 555-0100" aria-invalid={!!errors.phone} className={inputClass} {...register("phone")} />
                <FieldError msg={errors.phone?.message} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email <span className="normal-case tracking-normal text-slate-2">(optional)</span></label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} className={inputClass} {...register("email")} />
                <FieldError msg={errors.email?.message} />
              </div>
              <div>
                <label htmlFor="service" className={labelClass}>Service</label>
                <select id="service" aria-invalid={!!errors.service} className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2315181B%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`} defaultValue="" {...register("service")}>
                  <option value="" disabled>Choose a service</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                  <option value="other">Something else</option>
                </select>
                <FieldError msg={errors.service?.message} />
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>City or ZIP</label>
                <input id="location" autoComplete="postal-code" placeholder="Summerville, 29483…" aria-invalid={!!errors.location} className={inputClass} {...register("location")} />
                <FieldError msg={errors.location?.message} />
              </div>
              <div>
                <label htmlFor="date" className={labelClass}>Preferred date <span className="normal-case tracking-normal text-slate-2">(optional)</span></label>
                <input id="date" type="date" aria-invalid={!!errors.date} className={inputClass} {...register("date")} />
                <FieldError msg={errors.date?.message} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="details" className={labelClass}>What needs doing?</label>
                <textarea id="details" rows={4} placeholder="e.g. Assemble a queen bed frame and two nightstands from Wayfair, mount a 65&quot; TV in the living room…" aria-invalid={!!errors.details} className={`${inputClass} resize-y`} {...register("details")} />
                <FieldError msg={errors.details?.message} />
              </div>

              {/* Honeypot */}
              <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-2">
                  By sending, you agree to be contacted about your request. No spam, ever.
                </p>
                <Button type="submit" size="lg" arrow={!pending} disabled={pending} className="sm:shrink-0" icon={pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : undefined}>
                  {pending ? "Sending…" : "Send my request"}
                </Button>
              </div>
              {serverError && (
                <p role="alert" className="text-sm font-semibold text-[#b42318] sm:col-span-2">{serverError}</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm font-medium text-[#b42318]">{msg}</p>;
}
