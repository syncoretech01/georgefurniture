import { site } from "./site";
import { services } from "./services";

/** JSON-LD for Google: LocalBusiness subtype + service catalog + 75-mile GeoCircle */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: `+1-${site.phone}`,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logo/georges-badge-icon.svg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.area.baseCity,
      addressRegion: site.area.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.area.lat,
      longitude: site.area.lng,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: site.area.lat,
          longitude: site.area.lng,
        },
        geoRadius: `${Math.round(site.area.radiusMiles * 1609.34)}`,
      },
      ...site.area.cities.map((c) => ({ "@type": "City", name: `${c}, ${site.area.state}` })),
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "17:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Handyman services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: `${site.url}/#quote`,
      name: "Request a free quote",
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
