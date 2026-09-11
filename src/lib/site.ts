/**
 * SINGLE SOURCE OF TRUTH for business details.
 * Change phone / email / hours / area / stats / reviews here — every section reads from this file.
 */

export const site = {
  name: "George's Furniture Assembly & Handyman Services",
  shortName: "George's",
  tagline: "Furniture Assembly · Handyman Services",
  description:
    "Furniture assembly, TV mounting, ceiling fans, kitchen cabinets, painting, power washing, landscaping and Home Depot services — serving Ridgeville, SC and everywhere within 75 miles. Free quotes, upfront pricing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://georgeshandyman.com",

  phone: "843-471-8651",
  phoneHref: "tel:+18434718651",
  email: "floridaboygeorge@gmail.com",

  // TODO(client): confirm hours
  hours: [
    { days: "Mon – Fri", time: "7:00 AM – 7:00 PM" },
    { days: "Saturday", time: "8:00 AM – 5:00 PM" },
    { days: "Sunday", time: "By appointment" },
  ],
  hoursShort: "Mon–Sat · 7am–7pm",

  area: {
    base: "Ridgeville, SC",
    baseCity: "Ridgeville",
    state: "SC",
    radiusMiles: 75,
    // Approximate coordinates for Ridgeville, SC — used in JSON-LD GeoCircle
    lat: 33.0946,
    lng: -80.3134,
    cities: [
      "Summerville",
      "Charleston",
      "North Charleston",
      "Goose Creek",
      "Moncks Corner",
      "Mount Pleasant",
      "Ladson",
      "Hanahan",
      "Walterboro",
      "Orangeburg",
      "St. George",
      "Harleyville",
      "Holly Hill",
      "Bonneau",
      "Cottageville",
      "Johns Island",
    ],
  },

  founder: "George",
  established: 2016, // TODO(client): confirm

  // Trust chips shown in hero + why-us. Keep to claims the business can back up.
  trust: [
    "Free quotes",
    "Upfront pricing",
    "75-mile service radius",
    "Home Depot services",
  ],

  // TODO(client): replace SAMPLE numbers with real ones
  stats: [
    { value: 1200, suffix: "+", label: "Jobs completed" },
    { value: 5, suffix: ".0", label: "Star rating", decimals: 0 },
    { value: 75, suffix: " mi", label: "Service radius" },
    { value: 24, suffix: " hr", label: "Quote turnaround" },
  ],

  reasons: [
    {
      title: "One call does it all",
      body: "Assembly, mounting, painting, pressure washing, yard work — stop juggling contractors. George handles the whole list.",
    },
    {
      title: "Upfront, honest pricing",
      body: "You get a clear quote before any work starts. No surprise line items, no hourly creep.",
    },
    {
      title: "Shows up. On time.",
      body: "You'll get a confirmed window and a heads-up text when George is on the way.",
    },
    {
      title: "Done right the first time",
      body: "Level, square, tight and cleaned up. If something isn't right, George comes back and makes it right.",
    },
    {
      title: "Home Depot friendly",
      body: "Bought it at Home Depot? George will pick it up, deliver it, assemble it and haul the boxes away.",
    },
    {
      title: "Local, not a franchise",
      body: "Based in Ridgeville and serving the Lowcountry. You're talking to the guy who does the work.",
    },
  ],

  // TODO(client): SAMPLE reviews — replace with real customer quotes before launch.
  reviews: [
    {
      name: "Sample review — Summerville",
      service: "Furniture Assembly",
      rating: 5,
      quote:
        "Assembled a full bedroom set and two bookcases in one afternoon. Everything was level, tight and the boxes were gone when he left.",
    },
    {
      name: "Sample review — Goose Creek",
      service: "TV Mounting",
      rating: 5,
      quote:
        "Mounted a 75\" TV over the fireplace with the cables hidden in the wall. Looks like it came with the house.",
    },
    {
      name: "Sample review — Moncks Corner",
      service: "Power Washing",
      rating: 5,
      quote:
        "Driveway, siding and the back deck. Neighbors asked if we'd repainted the house. Fair price and fast.",
    },
    {
      name: "Sample review — Charleston",
      service: "Interior Painting",
      rating: 5,
      quote:
        "Two bedrooms and a hallway, clean lines, zero drips on the trim. Booked him again for the exterior.",
    },
    {
      name: "Sample review — Walterboro",
      service: "Ceiling Fan Installation",
      rating: 5,
      quote:
        "Swapped three old fixtures for ceiling fans. In and out in under two hours, no wobble, no mess.",
    },
  ],

  faqs: [
    {
      q: "How much does it cost?",
      a: "Every job is quoted upfront before work starts. Furniture assembly and TV mounting are usually flat-rate by item; painting, power washing and landscaping are quoted after a quick look at the space. Quotes are always free.",
    },
    {
      q: "How fast can you get here?",
      a: "Most jobs are scheduled within the same week, and smaller ones can often be fit in within a day or two. Call or send the quote form and you'll hear back within 24 hours.",
    },
    {
      q: "What areas do you cover?",
      a: `George is based in Ridgeville, SC and covers everything within about ${75} miles — Summerville, Charleston, North Charleston, Goose Creek, Moncks Corner, Walterboro, Orangeburg and the surrounding Lowcountry.`,
    },
    {
      q: "Do you handle Home Depot purchases?",
      a: "Yes. George can pick up your order from Home Depot, deliver it, assemble or install it, and remove all the packaging. Just have your order number ready.",
    },
    {
      q: "Do I need to have tools or supplies?",
      a: "No. George brings everything needed for assembly, mounting and installation. For painting, he can supply materials or work with paint you've already bought.",
    },
    {
      q: "Can you mount a TV on brick, stone or over a fireplace?",
      a: "Yes — brick, stone, drywall and plaster are all fine. George uses the right anchors for the surface and can hide cables behind the wall where the structure allows.",
    },
    {
      q: "What if something isn't right?",
      a: "Tell George. He'll come back and fix it. The goal is a job you'd recommend to a neighbor.",
    },
  ],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Why George's", href: "#why-us" },
    { label: "Work", href: "#work" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ],

  social: {
    facebook: "", // TODO(client)
    instagram: "", // TODO(client)
    google: "", // TODO(client): Google Business Profile URL
  },

  credit: { label: "Site by Syncore", href: "https://syncoretech.com" },
} as const;

export type Site = typeof site;
