# George's Furniture Assembly & Handyman Services — Website

Single-page marketing site built with **Next.js 16 / React 19 / TypeScript / Tailwind CSS v4**, animated with **GSAP** (ScrollTrigger + SplitText), **Lenis** smooth scrolling and **anime.js v4**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
npm run lint
```

Requires Node 20.9+.

## Where to change things

Everything a client would want to edit lives in **two files** — no component edits needed.

| What | File |
|---|---|
| Phone, email, hours, service area & cities, trust chips, stats, reasons, reviews, FAQs, nav | [`src/lib/site.ts`](src/lib/site.ts) |
| The nine services (titles, blurbs, bullets, icons) | [`src/lib/services.ts`](src/lib/services.ts) |
| Photos (hero, gallery, per-service) | [`src/lib/images.ts`](src/lib/images.ts) |
| Brand colours, fonts, type scale | [`src/app/globals.css`](src/app/globals.css) (`@theme` block) |
| Logo files | [`public/logo/`](public/logo/) |

Search the code for `TODO(client)` to find every placeholder that should be confirmed before launch:

- **Hours** — currently `Mon–Fri 7–7, Sat 8–5, Sun by appointment`.
- **Stats** ("1,200+ jobs", "5.0 rating", etc.) — sample numbers.
- **Reviews** — sample quotes, clearly labelled *"Sample review — …"*. Replace with real customer quotes.
- **Social / Google Business Profile links** — empty.
- **Photos** — Unsplash stock. Swap the URLs in `images.ts` for real job photos (any URL or `/public` path works; keep similar aspect ratios).
- **Site URL** — set `NEXT_PUBLIC_SITE_URL` in `.env.local` for correct canonical / Open Graph / sitemap URLs.

## Quote form delivery (not wired yet)

The form is fully built and validated (client + server). Submissions are currently **logged to the server console** as `[INQUIRY] {...}` and nothing is emailed.

To deliver inquiries, open [`src/app/actions/inquiry.ts`](src/app/actions/inquiry.ts) → `deliver()` and uncomment **one** option:

- **Option A – Resend** (`npm i resend`, set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`)
- **Option B – Formspree / Web3Forms** webhook (set `INQUIRY_WEBHOOK_URL`)

See [`.env.example`](.env.example). A honeypot field (`company`) silently drops bot submissions.

Deep links pre-select a service: `/?service=tv-mounting#quote` (slugs are in `services.ts`).

## Structure

```
src/app/            layout (fonts, metadata, JSON-LD), page, globals.css, OG image, sitemap, robots
src/app/actions/    submitInquiry server action
src/lib/            site config, services, images, validation (zod), JSON-LD schema, gsap setup, scroll helpers
src/components/
  providers/        SmoothScroll — Lenis driven by GSAP's ticker; anchor-link handling
  layout/           Header (shrinks / hides on scroll), MobileNav, Footer, StickyCtaBar (mobile)
  sections/         Hero → ServicesMarquee → Services → Process → WhyUs → Gallery → Testimonials → ServiceArea → Faq → QuoteForm
  ui/               Button, MagneticButton, Reveal, SplitHeading, Counter, DrawIcon, AnimeStagger, Marquee, …
```

### Animation notes

- **GSAP**: scroll reveals (`Reveal`), line-masked headlines (`SplitHeading`), hero intro + parallax, marquee, header behaviour, FAQ accordion, process progress line, gallery parallax, magnetic buttons.
- **anime.js**: stat counters (`Counter`), stroke-drawn service icons (`DrawIcon`), staggered grids/chips (`AnimeStagger`), service-area map rings.
- **Lenis**: smooth scrolling synced to GSAP's ticker; disabled automatically for `prefers-reduced-motion`.
- Reveal targets are pre-hidden by CSS only after an inline script confirms JS + motion are OK (`html[data-motion="ok"]`), with a 4 s safety fallback — so no-JS and reduced-motion visitors always see all content.

## SEO

- `HomeAndConstructionBusiness` + `FAQPage` JSON-LD with a 75-mile `GeoCircle` service area and a service catalogue.
- Generated Open Graph image (`/opengraph-image`), `sitemap.xml`, `robots.txt`, favicon from the badge icon.
