"use client";

import { useEffect, useRef } from "react";
import { X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { ButtonLink } from "@/components/ui/Button";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(el, { autoAlpha: 1 })
        .fromTo(el.querySelector("[data-panel]"), { yPercent: -100 }, { yPercent: 0, duration: 0.8 })
        .from("[data-link]", { yPercent: 120, autoAlpha: 0, duration: 0.7, stagger: 0.06 }, "-=0.45")
        .from("[data-meta]", { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, "-=0.4");
    },
    { scope: ref },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    const lenis = getLenis();
    if (open) {
      t.timeScale(1).play();
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      t.timeScale(1.6).reverse();
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="invisible fixed inset-0 z-[60] opacity-0 lg:hidden"
      onClick={onClose}
    >
      <div
        data-panel
        className="dot-grid absolute inset-0 flex flex-col bg-graphite text-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-x flex h-(--header-h) items-center justify-between">
          <span className="font-display text-xl uppercase tracking-tight text-paper">George&apos;s</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-paper/20"
          >
            <X className="size-5" strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="container-x flex-1 pt-6">
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line-dark">
                <a
                  href={item.href}
                  onClick={onClose}
                  data-link
                  className="group flex items-center justify-between py-4 font-display text-[clamp(2rem,9vw,3.25rem)] uppercase leading-none tracking-tight"
                >
                  <span>
                    <span className="mr-4 font-label text-base tracking-[0.2em] text-yellow">0{i + 1}</span>
                    {item.label}
                  </span>
                  <ArrowUpRight className="size-8 text-yellow opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-x space-y-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
          <div data-meta className="flex flex-col gap-2 font-label text-lg font-semibold tracking-wide">
            <a href={site.phoneHref} className="inline-flex items-center gap-3">
              <Phone className="size-5 text-yellow" strokeWidth={2.5} aria-hidden />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-paper/80">
              <Mail className="size-5 text-yellow" strokeWidth={2.5} aria-hidden />
              {site.email}
            </a>
          </div>
          <div data-meta>
            <ButtonLink href="#quote" size="lg" arrow className="w-full" onClick={onClose}>
              Get a Free Quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
