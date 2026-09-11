"use client";

import { useRef } from "react";
import { MessageSquareText, CalendarCheck, Hammer } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DrawIcon } from "@/components/ui/DrawIcon";
import { ButtonLink } from "@/components/ui/Button";

const steps = [
  {
    icon: MessageSquareText,
    title: "Tell George the job",
    body: "Call, text or send the quote form. A photo or two and a rough description is all it takes for a clear price.",
  },
  {
    icon: CalendarCheck,
    title: "Pick a time that works",
    body: "You'll get a confirmed arrival window — most jobs within the same week — and a heads-up text on the day.",
  },
  {
    icon: Hammer,
    title: "It gets done. Properly.",
    body: "George shows up with the tools, does the work level and square, cleans up, and takes the packaging with him.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Progress line draws as the steps scroll through the viewport
        gsap.fromTo(
          "[data-progress]",
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="dot-grid section-y relative overflow-hidden bg-graphite text-paper">
      <div className="container-x">
        <SectionHeading
          tone="light"
          eyebrow="How it works"
          title={
            <>
              Three steps. <span className="text-yellow">Zero hassle.</span>
            </>
          }
          lead="No estimates that take a week, no waiting around. Here's how a job with George goes."
        />

        <div data-steps className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-24">
          {/* Track (horizontal on md+, vertical on mobile) */}
          <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-paper/15 md:left-0 md:top-8 md:h-px md:w-full">
            <div data-progress className="h-full w-full origin-top bg-yellow md:origin-left" />
          </div>

          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12} className="relative pl-16 md:pl-0 md:pt-20" as="article">
              <div data-draw-hover className="group">
                <div className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full border-2 border-yellow bg-graphite font-display text-lg text-yellow md:top-2">
                  {i + 1}
                </div>
                <DrawIcon icon={s.icon} size={40} strokeWidth={1.5} className="text-yellow" />
                <h3 className="display-md mt-5 text-paper">{s.title}</h3>
                <p className="mt-3 max-w-sm text-paper/70">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-line-dark bg-graphite-2 p-7 sm:flex-row sm:items-center sm:justify-between md:p-9 lg:mt-24">
          <div>
            <p className="eyebrow text-yellow">Ready when you are</p>
            <p className="mt-2 font-display text-2xl uppercase leading-none text-paper md:text-3xl">
              Call {site.phone} or send the form
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref} variant="ghost-light">
              Call now
            </ButtonLink>
            <ButtonLink href="#quote" arrow>
              Free quote
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
