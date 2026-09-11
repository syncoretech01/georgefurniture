/**
 * Unsplash stock photography. Every ID below was verified to resolve (HTTP 200) on
 * 2026-09-11. Swap for real job photos by replacing the URLs (keep aspect ratios similar).
 */
const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const images = {
  hero: {
    src: u("1621905251189-08b45d6a269e", 1800),
    alt: "Tradesman in work gloves installing a fixture on an interior wall",
  },
  heroDetail: {
    src: u("1504148455328-c376907d081c", 900),
    alt: "Cordless drill resting on a workbench",
  },
  about: {
    src: u("1595814432314-90095f342694", 1400),
    alt: "Two people painting the walls of a bright room",
  },
  services: {
    "furniture-assembly": {
      src: u("1586023492125-27b2c045efd7", 1000),
      alt: "Freshly assembled yellow armchair in a bright living room",
    },
    "tv-mounting": {
      src: u("1567690187548-f07b1d7bf5a9", 1000),
      alt: "Flat-screen TV mounted flush on a white wall above a console",
    },
    "ceiling-fan-installation": {
      src: u("1604014237800-1c9102c219da", 1000),
      alt: "Open-plan living space with a ceiling fan on a vaulted ceiling",
    },
    "kitchen-cabinets": {
      src: u("1484154218962-a197022b5858", 1000),
      alt: "Modern white kitchen cabinets with pendant lighting",
    },
    painting: {
      src: u("1562259949-e8e7689d7828", 1000),
      alt: "Paint roller applying a fresh coat of blue paint to a wall",
    },
    "power-washing": {
      src: u("1605276374104-dee2a0ed3cd6", 1000),
      alt: "Brick home with a clean driveway and tidy front lawn",
    },
    landscaping: {
      src: u("1585320806297-9794b3e4eeae", 1000),
      alt: "Manicured garden path lined with hedges and flowers",
    },
    "home-depot-services": {
      src: u("1530124566582-a618bc2615dc", 1000),
      alt: "Wall of hand tools organised in a workshop",
    },
    handyman: {
      src: u("1589939705384-5185137a7f0f", 1000),
      alt: "Contractor measuring and cutting lumber on a job site",
    },
  },
  gallery: [
    { src: u("1586023492125-27b2c045efd7", 1200), alt: "Assembled yellow armchair in a living room", caption: "Furniture assembly", tall: true },
    { src: u("1567690187548-f07b1d7bf5a9", 1200), alt: "Wall-mounted TV above a media console", caption: "TV mounting" },
    { src: u("1484154218962-a197022b5858", 1200), alt: "White kitchen with new cabinets", caption: "Kitchen cabinets" },
    { src: u("1595814432314-90095f342694", 1200), alt: "Room being painted", caption: "Interior painting", tall: true },
    { src: u("1585320806297-9794b3e4eeae", 1200), alt: "Landscaped garden path", caption: "Landscaping" },
    { src: u("1570129477492-45c003edd2be", 1200), alt: "White farmhouse with a wraparound porch", caption: "Exterior painting & power washing" },
  ],
} as const;
