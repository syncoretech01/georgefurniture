"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, createScope, type Scope } from "animejs";
import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { REDUCED } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimeStagger } from "@/components/ui/AnimeStagger";
import { ButtonLink } from "@/components/ui/Button";

/** Approximate offsets from Ridgeville in miles (x = east, y = south), plotted on the radius map. */
const plotted = [
  { name: "Summerville", dx: 8, dy: 5, anchor: "start", ly: -8 },
  { name: "Goose Creek", dx: 16, dy: 8, anchor: "start", ly: 14 },
  { name: "Charleston", dx: 22, dy: 22, anchor: "start" },
  { name: "Moncks Corner", dx: 17, dy: -7, anchor: "start" },
  { name: "St. George", dx: -15, dy: -6, anchor: "end" },
  { name: "Walterboro", dx: -20.5, dy: 13, anchor: "end" },
  { name: "Orangeburg", dx: -31, dy: -27, anchor: "end" },
  { name: "Kingstree", dx: 28, dy: -39.5, anchor: "start" },
  { name: "Georgetown", dx: 59, dy: -19.5, anchor: "end" },
  { name: "Sumter", dx: -1.6, dy: -57, anchor: "middle" },
  { name: "Beaufort", dx: -20.6, dy: 45.8, anchor: "end" },
  { name: "Hilton Head", dx: -25, dy: 60.6, anchor: "end" },
] as const;

const C = 300;
const R = 270; // 75 miles
const PX_PER_MILE = R / site.area.radiusMiles;

export function ServiceArea() {
  const ref = useRef<HTMLDivElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia(REDUCED).matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        scope.current = createScope({ root }).add(() => {
          animate("[data-ring]", {
            scale: [0.2, 1],
            opacity: [0, 1],
            duration: 1400,
            ease: "outExpo",
            delay: stagger(140),
          });
          animate("[data-city]", {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 700,
            ease: "outBack(2)",
            delay: stagger(60, { start: 500 }),
          });
          animate("[data-label]", {
            opacity: [0, 1],
            translateY: [4, 0],
            duration: 500,
            ease: "outQuad",
            delay: stagger(60, { start: 700 }),
          });
          animate("[data-pulse]", {
            scale: [1, 2.6],
            opacity: [0.55, 0],
            duration: 2600,
            ease: "outCubic",
            loop: true,
            delay: stagger(900),
          });
        });
      },
      { threshold: 0.35 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      scope.current?.revert();
    };
  }, []);

  return (
    <section className="section-y relative overflow-hidden bg-graphite text-paper">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            tone="light"
            eyebrow="Service area"
            title={
              <>
                {site.area.base} and <span className="text-yellow">{site.area.radiusMiles} miles</span> in every direction.
              </>
            }
            lead="Summerville, Charleston, Goose Creek, Moncks Corner, Walterboro, Orangeburg — if you're in the Lowcountry, George can get to you."
          />

          <AnimeStagger as="ul" className="mt-10 flex flex-wrap gap-2.5" each={45} y={12}>
            {site.area.cities.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-dark bg-graphite-2 px-3.5 py-2 font-label text-[0.9375rem] font-semibold uppercase tracking-[0.1em] text-paper/85"
              >
                <MapPin className="size-3.5 text-yellow" strokeWidth={2.5} aria-hidden />
                {c}
              </li>
            ))}
          </AnimeStagger>

          <Reveal className="mt-10">
            <p className="text-paper/70">
              Not sure if you&apos;re in range? <a href={site.phoneHref} className="font-semibold text-yellow underline-offset-4 hover:underline">Call {site.phone}</a> — if George can get there, he will.
            </p>
            <ButtonLink href="#quote" arrow className="mt-6">
              Check availability
            </ButtonLink>
          </Reveal>
        </div>

        {/* Radius map */}
        <div ref={ref} className="relative mx-auto w-full max-w-[34rem]">
          <svg viewBox="0 0 600 600" className="h-auto w-full" role="img" aria-label={`Map showing a ${site.area.radiusMiles}-mile service radius around ${site.area.base}`}>
            <defs>
              <radialGradient id="areaFill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F9B21D" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#F9B21D" stopOpacity="0.02" />
              </radialGradient>
            </defs>

            {[R, (R * 50) / 75, (R * 25) / 75].map((r, i) => (
              <g key={r} data-ring style={{ transformOrigin: `${C}px ${C}px` }}>
                <circle cx={C} cy={C} r={r} fill={i === 0 ? "url(#areaFill)" : "none"} stroke="#F9B21D" strokeOpacity={i === 0 ? 0.7 : 0.25} strokeWidth={i === 0 ? 2 : 1} strokeDasharray={i === 0 ? undefined : "4 8"} />
                <text x={C + r - 6} y={C - 8} textAnchor="end" className="fill-paper/50 font-label text-[13px] font-semibold uppercase tracking-[0.15em]">
                  {[75, 50, 25][i]} mi
                </text>
              </g>
            ))}

            {plotted.map((p) => {
              const x = C + p.dx * PX_PER_MILE;
              const y = C + p.dy * PX_PER_MILE;
              const lx = p.anchor === "start" ? x + 10 : p.anchor === "end" ? x - 10 : x;
              const ly = "ly" in p ? y + p.ly : p.anchor === "middle" ? y - 12 : y + 4;
              return (
                <g key={p.name}>
                  <circle data-city cx={x} cy={y} r={4.5} className="fill-paper" style={{ transformOrigin: `${x}px ${y}px` }} />
                  <text data-label x={lx} y={ly} textAnchor={p.anchor} className="fill-paper/80 font-label text-[14px] font-semibold uppercase tracking-[0.1em]">
                    {p.name}
                  </text>
                </g>
              );
            })}

            {/* Base marker */}
            <g style={{ transformOrigin: `${C}px ${C}px` }}>
              {[0, 1].map((i) => (
                <circle key={i} data-pulse cx={C} cy={C} r={16} fill="#F9B21D" style={{ transformOrigin: `${C}px ${C}px` }} />
              ))}
              <polygon
                points={`${C},${C - 18} ${C + 15.6},${C - 9} ${C + 15.6},${C + 9} ${C},${C + 18} ${C - 15.6},${C + 9} ${C - 15.6},${C - 9}`}
                fill="#F9B21D"
                stroke="#15181B"
                strokeWidth="3"
              />
              <text x={C} y={C + 6} textAnchor="middle" className="fill-graphite font-display text-[17px]">
                G
              </text>
              <text x={C} y={C - 28} textAnchor="middle" className="fill-yellow font-label text-[15px] font-bold uppercase tracking-[0.18em]">
                {site.area.baseCity}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
