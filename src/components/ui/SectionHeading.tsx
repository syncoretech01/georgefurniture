import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Reveal>
        <Eyebrow tone={light ? "light" : "dark"}>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitHeading
        as="h2"
        className={`display-lg mt-5 ${light ? "text-paper" : "text-graphite"}`}
      >
        {title}
      </SplitHeading>
      {lead && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-2xl text-lg md:text-xl ${light ? "text-paper/75" : "text-slate"} ${align === "center" ? "mx-auto" : ""}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
