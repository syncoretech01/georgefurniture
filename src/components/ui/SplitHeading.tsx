"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, MOTION_OK, REDUCED } from "@/lib/gsap";

/**
 * Line-masked headline reveal (GSAP SplitText). Re-splits on resize; waits for fonts.
 * `trigger=false` plays immediately on mount (hero); otherwise plays on scroll into view.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  trigger = true,
  stagger = 0.09,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: boolean;
  stagger?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia(REDUCED).matches) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }

    let split: SplitText | undefined;
    let cancelled = false;
    const ctx = gsap.context(() => {});
    const mm = gsap.matchMedia();

    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm.add(MOTION_OK, () => {
        ctx.add(() => {
          split = SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "line",
            wordsClass: "word",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                rotate: 2,
                transformOrigin: "0% 100%",
                duration: 1.2,
                ease: "expo.out",
                stagger,
                delay,
                scrollTrigger: trigger
                  ? { trigger: el, start: "top 88%", once: true }
                  : undefined,
              }),
          });
          gsap.set(el, { autoAlpha: 1 });
        });
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
      mm.revert();
    };
  }, [delay, trigger, stagger]);

  return (
    <Tag ref={ref} id={id} data-reveal="" className={`split-mask ${className}`}>
      {children}
    </Tag>
  );
}
