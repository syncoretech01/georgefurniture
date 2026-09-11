import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/** Horizontal trade-badge logo. `tone="light"` swaps to the paper-on-dark variant. */
export function Logo({
  tone = "dark",
  className = "",
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  const src = tone === "light" ? "/logo/georges-badge-horizontal-light.svg" : "/logo/georges-badge-horizontal.svg";
  return (
    <Link href="/" aria-label={`${site.name} — home`} className={`inline-flex shrink-0 ${className}`}>
      <Image
        src={src}
        alt={site.name}
        width={538}
        height={149}
        priority={priority}
        className="h-full w-auto"
      />
    </Link>
  );
}
