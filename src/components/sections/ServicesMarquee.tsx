import { services } from "@/lib/services";
import { Marquee } from "@/components/ui/Marquee";

export function ServicesMarquee() {
  return (
    <div className="relative z-10 bg-graphite py-5 text-paper md:py-6">
      <Marquee speed={70}>
        {services.map((s) => (
          <span key={s.slug} className="flex items-center gap-6 pr-6 font-display text-[clamp(1.375rem,2.6vw,2.125rem)] uppercase leading-none tracking-tight md:gap-8 md:pr-8">
            <span>{s.title}</span>
            <span className="hex-mark text-yellow" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
