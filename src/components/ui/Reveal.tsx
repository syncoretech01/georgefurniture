"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Scroll-triggered entrance. Content is pre-hidden via CSS only when
 * `html[data-motion="ok"]` is set (JS running + motion allowed), so SSR / no-JS / reduced-motion
 * users always see everything.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  y = 36,
  delay = 0,
  duration = 1,
  start = "top 88%",
  stagger,
  once = true,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
  /** Animate direct children with this stagger instead of the wrapper. */
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger != null ? Array.from(el.children) : el;
        if (stagger != null) gsap.set(el, { autoAlpha: 1 });
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: "expo.out",
            stagger: stagger ?? 0,
            clearProps: "transform",
            scrollTrigger: { trigger: el, start, once, toggleActions: "play none none none" },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(stagger != null ? [el, ...Array.from(el.children)] : el, { autoAlpha: 1 });
      });
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <Tag ref={ref} data-reveal={stagger != null ? "group" : ""} className={className}>
      {children}
    </Tag>
  );
}
