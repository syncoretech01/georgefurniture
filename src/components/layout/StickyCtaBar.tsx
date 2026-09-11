"use client";

import { useRef } from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Mobile-only bottom bar: appears after the hero, hides while the quote form is on screen. */
export function StickyCtaBar() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const hero = document.getElementById("hero");
      const quote = document.getElementById("quote");
      if (!el || !hero || !quote) return;

      // Evaluate from live geometry on every scroll tick + refresh, so a stale initial
      // measurement (fonts/images still loading) can never leave the bar in the wrong state.
      const sync = () => {
        const vh = window.innerHeight;
        const pastHero = hero.getBoundingClientRect().bottom < vh * 0.7;
        const q = quote.getBoundingClientRect();
        const onForm = q.top < vh * 0.8 && q.bottom > vh * 0.2;
        el.classList.toggle("is-visible", pastHero && !onForm);
      };

      ScrollTrigger.create({ start: 0, end: "max", onUpdate: sync, onRefresh: sync });
      sync();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 bottom-0 z-40 translate-y-full p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-out-expo md:hidden [.is-visible&]:translate-y-0"
    >
      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-line bg-paper/90 p-2 shadow-[0_-8px_40px_-12px_rgb(21_24_27/0.35)] backdrop-blur-md">
        <a
          href={site.phoneHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-graphite font-label text-sm font-semibold uppercase tracking-[0.12em] text-paper"
        >
          <Phone className="size-4" strokeWidth={2.5} aria-hidden />
          Call now
        </a>
        <a
          href="#quote"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-yellow font-label text-sm font-semibold uppercase tracking-[0.12em] text-graphite"
        >
          Free quote
          <ArrowUpRight className="size-4" strokeWidth={2.5} aria-hidden />
        </a>
      </div>
    </div>
  );
}
