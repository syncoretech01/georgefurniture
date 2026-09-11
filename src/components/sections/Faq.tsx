"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useGSAP(() => {}, { scope: ref });

  // Event handler (not render) — safe to touch the DOM directly; tweens are short-lived.
  const toggle = (i: number) => {
    const next = open === i ? null : i;
    const items = ref.current?.querySelectorAll<HTMLElement>("[data-faq]") ?? [];
    items.forEach((item, idx) => {
      const panel = item.querySelector<HTMLElement>("[data-panel]");
      const icon = item.querySelector<HTMLElement>("[data-icon]");
      const isOpen = idx === next;
      gsap.to(panel, { height: isOpen ? "auto" : 0, duration: 0.55, ease: "expo.out", overwrite: true });
      gsap.to(icon, { rotate: isOpen ? 45 : 0, duration: 0.45, ease: "expo.out", overwrite: true });
    });
    setOpen(next);
  };

  return (
    <section ref={ref} id="faq" className="section-y scroll-mt-20 bg-paper-2">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Good to know <span className="hl">before</span> you book.
              </>
            }
            lead="Didn't find your answer? George is a call away."
          />
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.phoneHref} variant="ghost">
              {site.phone}
            </ButtonLink>
            <ButtonLink href="#quote" arrow>
              Ask a question
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal stagger={0.06} y={24} className="divide-y divide-line border-y border-line">
          {site.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-faq>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl uppercase leading-tight text-graphite md:text-2xl">{f.q}</span>
                    <span
                      data-icon
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-graphite/15 text-graphite transition-colors group-hover:border-yellow group-hover:bg-yellow"
                      style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                    >
                      <Plus className="size-5" strokeWidth={2.5} aria-hidden />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  data-panel
                  className="overflow-hidden"
                  style={{ height: isOpen ? "auto" : 0 }}
                >
                  <p className="max-w-2xl pb-7 text-slate">{f.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
