"use client";

import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-4 ${i < n ? "fill-yellow text-yellow" : "text-line"}`} strokeWidth={0} aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  const scroller = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section id="reviews" className="section-y scroll-mt-20 overflow-hidden">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title={
              <>
                Neighbors who&apos;d <span className="hl">book again.</span>
              </>
            }
            lead="Straight from homeowners around the Lowcountry."
          />
          <Reveal className="flex items-center gap-3 lg:pb-2">
            <div className="mr-3 hidden items-center gap-2 sm:flex">
              <Stars n={5} />
              <span className="font-label text-base font-semibold uppercase tracking-[0.12em] text-slate">5.0 rated</span>
            </div>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous reviews"
              className="inline-flex size-12 items-center justify-center rounded-full border-2 border-graphite/15 text-graphite transition-colors hover:border-graphite hover:bg-graphite hover:text-paper"
            >
              <ArrowLeft className="size-5" strokeWidth={2.5} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next reviews"
              className="inline-flex size-12 items-center justify-center rounded-full border-2 border-graphite/15 text-graphite transition-colors hover:border-graphite hover:bg-graphite hover:text-paper"
            >
              <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden />
            </button>
          </Reveal>
        </div>
      </div>

      <Reveal stagger={0.08} y={40} start="top 85%" className="mt-12 lg:mt-16">
        <ul
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1.125rem,4.5vw,3.5rem)] pb-4 [scroll-padding-inline:clamp(1.125rem,4.5vw,3.5rem)] lg:px-[max(clamp(1.125rem,4.5vw,3.5rem),calc((100vw-84rem)/2+3.5rem))]"
        >
          {site.reviews.map((r) => (
            <li
              key={r.name + r.service}
              className="flex w-[min(85vw,22rem)] shrink-0 snap-start flex-col rounded-3xl bg-paper-2 p-7 md:w-[24rem] md:p-8"
            >
              <Quote className="size-8 text-yellow" strokeWidth={0} fill="currentColor" aria-hidden />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-graphite">“{r.quote}”</blockquote>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-label text-base font-semibold uppercase tracking-[0.1em] text-graphite">{r.name}</p>
                  <p className="mt-1 text-sm text-slate-2">{r.service}</p>
                </div>
                <Stars n={r.rating} />
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
