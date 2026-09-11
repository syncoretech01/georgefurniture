"use client";

import { useRef } from "react";
import Image from "next/image";
import { images } from "@/lib/images";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/ui/QuoteButton";

export function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el, i) => {
          const speed = [10, -8, 6, -12, 8, -6, 12, -10][i % 8];
          gsap.fromTo(
            el,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="work" className="section-y scroll-mt-20 bg-paper-2">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Recent work"
            title={
              <>
                Level. Square. <span className="hl">Cleaned up.</span>
              </>
            }
            lead="A few of the jobs George handles every week around Ridgeville, Summerville and Charleston."
          />
          <Reveal className="lg:pb-2">
            <QuoteButton variant="dark" arrow>
              Start your project
            </QuoteButton>
          </Reveal>
        </div>

        <Reveal
          stagger={0.06}
          y={40}
          start="top 80%"
          className="mt-14 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:mt-20 lg:auto-rows-[240px]"
        >
          {images.gallery.map((g) => (
            <figure
              key={g.src + g.caption}
              className={`group relative overflow-hidden rounded-2xl bg-paper-3 ${"tall" in g && g.tall ? "row-span-2" : ""}`}
            >
              <div data-parallax className="absolute inset-[-12%]">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-graphite/80 to-transparent p-4 pt-10 font-label text-sm font-semibold uppercase tracking-[0.14em] text-paper opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 md:text-[0.9375rem]">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
