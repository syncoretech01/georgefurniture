import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light" | "yellow";
}) {
  const color =
    tone === "light" ? "text-paper/70" : tone === "yellow" ? "text-yellow" : "text-slate";
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${color} ${className}`}>
      <span className="hex-mark text-yellow" aria-hidden />
      {children}
    </span>
  );
}
