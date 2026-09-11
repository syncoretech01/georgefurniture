"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { animate, stagger, type JSAnimation } from "animejs";
import { REDUCED } from "@/lib/gsap";

/**
 * anime.js staggered entrance for a group of children (grid tiles, chips).
 * Pre-hidden via [data-reveal] CSS until in view; reduced-motion users see everything at once.
 */
export function AnimeStagger({
  as: Tag = "div",
  children,
  className = "",
  each = 70,
  from = "first",
  y = 28,
  scale = 0.96,
  duration = 900,
  threshold = 0.25,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  each?: number;
  from?: "first" | "last" | "center" | number;
  y?: number;
  scale?: number;
  duration?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.style.opacity = "1";
      el.style.visibility = "visible";
    };
    if (window.matchMedia(REDUCED).matches) {
      show();
      return;
    }

    let anim: JSAnimation | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        anim = animate(Array.from(el.children), {
          opacity: [0, 1],
          translateY: [y, 0],
          scale: [scale, 1],
          duration,
          ease: "outExpo",
          delay: stagger(each, { from }),
        });
        show();
      },
      { threshold },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      anim?.revert();
    };
  }, [each, from, y, scale, duration, threshold]);

  return (
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
