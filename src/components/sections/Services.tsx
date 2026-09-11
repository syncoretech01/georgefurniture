"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { requestQuote } from "@/lib/scroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DrawIcon } from "@/components/ui/DrawIcon";
import { QuoteButton } from "@/components/ui/QuoteButton";

export function Services() {
  return (
    <section id="services" className="section-y relative scroll-mt-20">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What George does"
            title={
              <>
                Every job on your list. <span className="hl">One number</span> to call.
              </>
            }
            lead="From a single bookcase to a whole-house punch list — George brings the tools, does it right, and hauls the boxes away."
          />
          <Reveal className="lg:pb-2">
            <QuoteButton variant="dark" arrow>
              Get a quote for any job
            </QuoteButton>
          </Reveal>
        </div>

        <Reveal stagger={0.08} y={48} start="top 80%" className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <article
              key={s.slug}
              id={`service-${s.slug}`}
              data-draw-hover
              className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-3xl bg-paper-2 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card"
            >
              <button
                type="button"
                onClick={() => requestQuote(s.slug)}
                className="relative aspect-[16/10] w-full overflow-hidden text-left"
                aria-label={`Get a quote for ${s.title}`}
                tabIndex={-1}
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-paper/90 font-label text-sm font-bold text-graphite backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display-md text-graphite">{s.title}</h3>
                  <DrawIcon icon={s.icon} size={34} className="shrink-0 text-yellow-deep" />
                </div>
                <p className="mt-3 text-slate">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 font-label text-[0.9375rem] font-semibold uppercase tracking-[0.08em] text-graphite/80">
                      <span className="hex-mark text-yellow" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    onClick={() => requestQuote(s.slug)}
                    className="group/link inline-flex items-center gap-2 font-label text-base font-semibold uppercase tracking-[0.12em] text-graphite"
                  >
                    <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-yellow after:transition-transform after:duration-300 after:ease-out-expo group-hover/link:after:scale-x-100">
                      Get a quote
                    </span>
                    <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1" strokeWidth={2.5} aria-hidden />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
