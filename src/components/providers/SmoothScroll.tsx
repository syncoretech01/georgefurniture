"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED } from "@/lib/gsap";
import { setLenis, scrollToHash } from "@/lib/scroll";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
 * Also delegates every in-page anchor click (`a[href^="#"]`) to Lenis with the header offset.
 * Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    // The inline script in layout.tsx set data-motion before paint; confirm hydration so its
    // safety timeout doesn't un-hide reveal targets (see globals.css / Reveal.tsx).
    const reduced = window.matchMedia(REDUCED).matches;
    document.documentElement.dataset.hydrated = "1";
    if (!document.documentElement.dataset.motion) {
      document.documentElement.dataset.motion = reduced ? "reduce" : "ok";
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.getAttribute("href") === "#") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      scrollToHash(a.getAttribute("href")!);
    };
    document.addEventListener("click", onClick);

    if (reduced) {
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      autoRaf: false,
      anchors: false,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Land on the deep-linked section (e.g. /#quote) after layout settles.
    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => scrollToHash(hash, { immediate: true }));
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
