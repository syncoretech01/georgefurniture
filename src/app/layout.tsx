import type { Metadata, Viewport } from "next";
import { Archivo_Black, Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/lib/site";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/schema";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.area.base}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "handyman Ridgeville SC",
    "furniture assembly Summerville",
    "TV mounting Charleston",
    "ceiling fan installation",
    "power washing Lowcountry",
    "painter Goose Creek",
    "Home Depot assembly service",
    "landscaping Moncks Corner",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.shortName,
    title: `${site.name} — ${site.area.base}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.area.base}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#15181B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${barlowCondensed.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Runs before first paint: lets CSS pre-hide reveal targets only when JS + motion are OK.
            If hydration never happens (JS error), the timeout un-hides everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.dataset.motion=matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'ok';setTimeout(function(){if(!d.dataset.hydrated)delete d.dataset.motion},4000)})();",
          }}
        />
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
        />
      </body>
    </html>
  );
}
