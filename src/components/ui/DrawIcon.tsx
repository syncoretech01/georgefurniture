"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { animate, stagger, svg, type JSAnimation } from "animejs";
import { REDUCED } from "@/lib/gsap";

/**
 * Renders a lucide icon and "draws" its strokes with anime.js — once when scrolled into view,
 * and again whenever the nearest `[data-draw-hover]` ancestor (or the icon itself) is hovered.
 */
export function DrawIcon({
  icon: Icon,
  size = 32,
  strokeWidth = 1.75,
  className = "",
}: {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    const svgEl = host?.querySelector("svg");
    if (!host || !svgEl || window.matchMedia(REDUCED).matches) return;

    const shapes = svgEl.querySelectorAll<SVGGeometryElement>("path, line, polyline, polygon, rect, circle, ellipse");
    if (!shapes.length) return;

    const drawables = svg.createDrawable(shapes);
    let current: JSAnimation | undefined;

    const play = () => {
      current?.revert();
      current = animate(drawables, {
        draw: ["0 0", "0 1"],
        ease: "inOutQuart",
        duration: 1100,
        delay: stagger(70),
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        play();
      },
      { threshold: 0.6 },
    );
    io.observe(svgEl);

    const hoverTarget = host.closest<HTMLElement>("[data-draw-hover]") ?? host;
    hoverTarget.addEventListener("mouseenter", play);

    return () => {
      io.disconnect();
      hoverTarget.removeEventListener("mouseenter", play);
      current?.revert();
    };
  }, []);

  return (
    <span ref={ref} className={`inline-flex ${className}`} aria-hidden>
      <Icon size={size} strokeWidth={strokeWidth} absoluteStrokeWidth />
    </span>
  );
}
