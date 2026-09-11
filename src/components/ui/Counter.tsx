"use client";

import { useEffect, useRef } from "react";
import { animate, utils, type JSAnimation } from "animejs";
import { REDUCED } from "@/lib/gsap";

/** anime.js number counter — renders the final value on the server for SEO, counts up in view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1800,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCED).matches) return;

    const obj = { v: 0 };
    let anim: JSAnimation | undefined;
    el.textContent = fmt(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        anim = animate(obj, {
          v: value,
          duration,
          ease: "outExpo",
          modifier: utils.round(decimals),
          onUpdate: () => {
            el.textContent = fmt(obj.v);
          },
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      anim?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
