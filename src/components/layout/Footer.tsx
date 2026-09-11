import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-graphite text-paper">
      <div className="stripes h-3" aria-hidden />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Logo tone="light" className="h-12" />
          <p className="mt-6 text-paper/70">{site.description}</p>
          <div className="mt-8 flex flex-col gap-3 font-label text-lg font-semibold tracking-wide">
            <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-yellow transition-colors">
              <Phone className="size-5 text-yellow" strokeWidth={2.5} aria-hidden />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-paper/80 hover:text-yellow transition-colors break-all">
              <Mail className="size-5 shrink-0 text-yellow" strokeWidth={2.5} aria-hidden />
              {site.email}
            </a>
          </div>
          <ButtonLink href="#quote" arrow className="mt-8">
            Get a Free Quote
          </ButtonLink>
        </div>

        <div>
          <h3 className="eyebrow text-yellow">Services</h3>
          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#service-${s.slug}`} className="text-paper/80 transition-colors hover:text-paper">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-yellow">Service area</h3>
          <p className="mt-5 inline-flex items-start gap-2 text-paper/80">
            <MapPin className="mt-1 size-4 shrink-0 text-yellow" strokeWidth={2.5} aria-hidden />
            <span>
              Based in {site.area.base}
              <br />
              Serving {site.area.radiusMiles} miles in every direction
            </span>
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-paper/60">
            {site.area.cities.slice(0, 10).map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-yellow">Hours</h3>
          <ul className="mt-5 space-y-2.5 text-paper/80">
            {site.hours.map((h) => (
              <li key={h.days} className="flex items-start gap-2">
                <Clock className="mt-1 size-4 shrink-0 text-yellow" strokeWidth={2.5} aria-hidden />
                <span>
                  <span className="block font-semibold text-paper">{h.days}</span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col gap-4 py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {site.credit && (
              <a href={site.credit.href} className="transition-colors hover:text-paper" target="_blank" rel="noopener noreferrer">
                {site.credit.label}
              </a>
            )}
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-yellow" aria-label="Back to top">
              Top <ArrowUp className="size-4" strokeWidth={2.5} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
