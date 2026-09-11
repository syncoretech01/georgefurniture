"use client";

import { useRef, useState } from "react";
import { Phone, Menu } from "lucide-react";
import { site } from "@/lib/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Compact after 80px; hide on scroll-down past 400px, show on scroll-up.
      ScrollTrigger.create({
        start: 80,
        onToggle: (self) => el.classList.toggle("is-scrolled", self.isActive),
      });
      ScrollTrigger.create({
        start: 400,
        end: "max",
        onUpdate: (self) => {
          el.classList.toggle("is-hidden", self.direction === 1 && self.isActive);
        },
      });

      // Intro
      gsap.from(el, { yPercent: -100, duration: 1, ease: "expo.out", delay: 0.2, clearProps: "transform" });
    },
    { scope: ref },
  );

  return (
    <>
      <header
        ref={ref}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,border-color] duration-500 ease-out-expo [.is-hidden&]:-translate-y-full [.is-scrolled&]:border-b [.is-scrolled&]:border-line [.is-scrolled&]:bg-paper/85 [.is-scrolled&]:shadow-[0_8px_30px_-16px_rgb(21_24_27/0.25)] [.is-scrolled&]:backdrop-blur-md"
      >
        <div className="container-x flex h-(--header-h) items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo group-[.is-scrolled]/header:h-16">
          <Logo priority className="h-11 transition-[height] duration-500 ease-out-expo group-[.is-scrolled]/header:h-9" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-label text-[0.9375rem] font-semibold uppercase tracking-[0.14em] text-graphite/80 transition-colors hover:text-graphite relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-yellow after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 font-label text-base font-semibold tracking-wide text-graphite md:inline-flex hover:text-yellow-deep transition-colors"
            >
              <Phone className="size-4" strokeWidth={2.5} aria-hidden />
              {site.phone}
            </a>
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="inline-flex size-11 items-center justify-center rounded-full bg-graphite text-paper md:hidden"
            >
              <Phone className="size-[18px]" strokeWidth={2.5} aria-hidden />
            </a>
            <ButtonLink href="#quote" size="sm" className="hidden sm:inline-flex md:h-11 md:px-5">
              Free Quote
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-graphite/15 text-graphite lg:hidden"
            >
              <Menu className="size-5" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
