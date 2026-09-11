"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Seamless infinite marquee (GSAP). Content is duplicated; the track slides -50%.
 * Speeds up with scroll velocity, eases back to base speed.
 */
export function Marquee({
  children,
  speed = 80, // px per second
  reverse = false,
  className = "",
  itemClassName = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const half = track.scrollWidth / 2;
        const tween = gsap.to(track, {
          xPercent: reverse ? 0 : -50,
          ease: "none",
          duration: half / speed,
          repeat: -1,
          ...(reverse ? { startAt: { xPercent: -50 } } : {}),
        });

        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
            gsap.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true, onComplete: () => {
              gsap.to(tween, { timeScale: 1, duration: 1.2, ease: "power2.out", overwrite: true });
            } });
          },
        });
        return () => st.kill();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-hidden>
      <div data-track className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className={`flex shrink-0 ${itemClassName}`}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
