"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { AnimeStagger } from "@/components/ui/AnimeStagger";
import { ButtonLink } from "@/components/ui/Button";

export function WhyUs() {
  return (
    <section id="why-us" className="section-y relative scroll-mt-20">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Left: statement + photo (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why George's"
            title={
              <>
                Shows up on time. <span className="hl">Holds up</span> for years.
              </>
            }
            lead="The guy who shows up, and the work that holds up. George has been building, hanging, painting and fixing around the Lowcountry for years — not a call center, not a franchise, one experienced pro who answers his own phone."
          />

          <Reveal className="relative mt-10 overflow-hidden rounded-3xl" y={40}>
            <Image
              src={images.about.src}
              alt={images.about.alt}
              width={1400}
              height={1000}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl bg-paper/90 p-4 backdrop-blur sm:inset-x-5 sm:bottom-5">
              <div>
                <p className="eyebrow">Talk to George</p>
                <p className="mt-1 font-display text-xl uppercase leading-none">{site.phone}</p>
              </div>
              <ButtonLink href={site.phoneHref} size="sm" variant="dark" icon={<Phone className="size-4" strokeWidth={2.5} aria-hidden />}>
                Call
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Right: stats + reasons */}
        <div>
          <AnimeStagger className="grid grid-cols-2 gap-4 md:gap-5" each={90}>
            {site.stats.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-3xl p-6 md:p-8 ${i === 0 ? "bg-yellow text-graphite" : "bg-paper-2 text-graphite"}`}
              >
                <Counter value={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} className="stat-num block" />
                <p className={`mt-3 font-label text-base font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-graphite/80" : "text-slate"}`}>
                  {s.label}
                </p>
              </div>
            ))}
          </AnimeStagger>

          <Reveal stagger={0.08} className="mt-12 divide-y divide-line border-y border-line lg:mt-14">
            {site.reasons.map((r, i) => (
              <div key={r.title} className="grid gap-3 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6 md:py-7">
                <span className="font-display text-lg text-yellow-deep">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight text-graphite md:text-2xl">{r.title}</h3>
                  <p className="mt-2 text-slate">{r.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
