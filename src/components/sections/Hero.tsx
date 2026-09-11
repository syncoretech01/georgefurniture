"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { Check, Phone, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Per-element intro delay (seconds) — consumed by the CSS keyframes in globals.css. */
const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const headline = ["Assembled.", "Mounted.", "Painted."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // The intro itself is CSS-driven (paints before hydration → good LCP).
  // GSAP handles the scroll-linked parallax only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } as const;
        gsap.to("[data-hero-img]", { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-detail]", { yPercent: -30, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-bg]", { yPercent: 30, ease: "none", scrollTrigger: st });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden pt-[calc(var(--header-h)+1.5rem)] pb-16 md:pt-[calc(var(--header-h)+3rem)] lg:min-h-svh lg:pb-24"
    >
      {/* Giant background wordmark (wrapper centres it; inner element is what animates) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[2vw] flex justify-center">
        <span
          data-hero-bg
          data-css-reveal
          data-text="George's"
          style={d(0.4)}
          className="wordmark-bg select-none whitespace-nowrap font-display text-[26vw] uppercase leading-none tracking-tighter text-graphite/[0.04] lg:text-[20vw]"
        />
      </div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        {/* Copy */}
        <div className="relative z-10">
          <div data-css-reveal style={d(0.15)}>
            <Eyebrow>
              {site.area.base} · {site.area.radiusMiles}-mile radius
            </Eyebrow>
          </div>

          <h1 className="display-xl mt-6 text-graphite">
            {headline.map((word, i) => (
              <span key={word} className="mask-line">
                <span style={d(0.3 + i * 0.09)}>{word}&nbsp;</span>
              </span>
            ))}
            <span className="mask-line">
              <span style={d(0.3 + headline.length * 0.09)} className="hl">
                Done right.
              </span>
            </span>
          </h1>

          <p data-css-reveal style={d(0.55)} className="mt-7 max-w-xl text-lg leading-relaxed text-slate md:text-xl">
            Furniture assembly, TV mounting, ceiling fans, cabinets, painting, power washing and more —
            one call handles the whole list. Serving {site.area.base} and everywhere within{" "}
            {site.area.radiusMiles} miles.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <div data-css-reveal style={d(0.7)}>
              <MagneticButton>
                <ButtonLink href="#quote" size="lg" arrow>
                  Get a Free Quote
                </ButtonLink>
              </MagneticButton>
            </div>
            <div data-css-reveal style={d(0.8)}>
              <MagneticButton strength={0.25}>
                <ButtonLink href={site.phoneHref} size="lg" variant="ghost" icon={<Phone className="size-4" strokeWidth={2.5} aria-hidden />}>
                  {site.phone}
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {site.trust.map((t, i) => (
              <li
                key={t}
                data-css-reveal
                style={d(0.95 + i * 0.07)}
                className="inline-flex items-center gap-2 font-label text-[0.9375rem] font-semibold uppercase tracking-[0.12em] text-graphite/80"
              >
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-yellow text-graphite">
                  <Check className="size-3" strokeWidth={3.5} aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Media */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div
            data-css-wipe
            style={d(0.2)}
            className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-paper-3 sm:aspect-[5/6] lg:aspect-[4/5]"
          >
            <Image
              data-hero-img
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 34rem, 100vw"
              className="scale-[1.18] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/50 via-transparent to-transparent" aria-hidden />
          </div>

          {/* Floating quote badge */}
          <div
            data-css-reveal
            style={d(1)}
            className="absolute -bottom-6 -left-3 -rotate-3 rounded-2xl bg-yellow p-5 text-graphite shadow-yellow sm:-left-6 sm:p-6"
          >
            <p className="eyebrow">Free quote</p>
            <p className="mt-1.5 font-display text-2xl uppercase leading-none sm:text-3xl">Within 24 hrs</p>
            <a href={site.phoneHref} className="mt-3 inline-flex items-center gap-2 font-label text-base font-semibold tracking-wide underline-offset-4 hover:underline">
              <Phone className="size-4" strokeWidth={2.5} aria-hidden />
              {site.phone}
            </a>
          </div>

          {/* Secondary detail image */}
          <div
            data-hero-detail
            data-css-slide
            style={d(1.1)}
            className="absolute -right-4 -top-8 hidden w-40 overflow-hidden rounded-2xl border-4 border-paper shadow-card md:block lg:-right-8 lg:w-48"
          >
            <Image src={images.heroDetail.src} alt={images.heroDetail.alt} width={400} height={300} className="aspect-[4/3] object-cover" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <a
          href="#services"
          data-css-reveal
          style={d(1.4)}
          className="flex flex-col items-center gap-1 font-label text-xs font-semibold uppercase tracking-[0.25em] text-slate"
        >
          Scroll
          <ChevronDown className="size-4 animate-bounce" strokeWidth={2.5} aria-hidden />
        </a>
      </div>
    </section>
  );
}
