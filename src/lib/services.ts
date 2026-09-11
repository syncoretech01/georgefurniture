import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Tv,
  Fan,
  ChefHat,
  PaintRoller,
  Droplets,
  TreePine,
  Truck,
  Wrench,
} from "lucide-react";
import { images } from "./images";

export type ServiceSlug = keyof typeof images.services;

export interface Service {
  slug: ServiceSlug;
  title: string;
  short: string;
  blurb: string;
  bullets: readonly string[];
  icon: LucideIcon;
  image: { src: string; alt: string };
  featured?: boolean;
}

export const services: readonly Service[] = [
  {
    slug: "furniture-assembly",
    title: "Furniture Assembly",
    short: "Assembly",
    blurb:
      "IKEA, Wayfair, Amazon, Home Depot — any flat-pack, any brand. Beds, dressers, desks, wardrobes, cribs and outdoor sets, built square and tight.",
    bullets: ["Any brand, any box", "Wall-anchoring included", "Packaging hauled away"],
    icon: Armchair,
    image: images.services["furniture-assembly"],
    featured: true,
  },
  {
    slug: "tv-mounting",
    title: "TV Mounting",
    short: "TV Mounting",
    blurb:
      "Flush, tilting or full-motion mounts on drywall, brick, stone or over the fireplace. Cables hidden, soundbar hung, everything level.",
    bullets: ["Any size, any wall", "In-wall cable concealment", "Soundbars & shelves"],
    icon: Tv,
    image: images.services["tv-mounting"],
    featured: true,
  },
  {
    slug: "ceiling-fan-installation",
    title: "Ceiling Fan Installation",
    short: "Ceiling Fans",
    blurb:
      "New fans, fan swaps and light-fixture replacements — balanced, wobble-free and wired to the existing box.",
    bullets: ["Fan & fixture swaps", "Remote & wall controls", "Vaulted ceilings OK"],
    icon: Fan,
    image: images.services["ceiling-fan-installation"],
  },
  {
    slug: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    short: "Cabinets",
    blurb:
      "Cabinet assembly and installation, hardware swaps, door adjustments and shelving. Plumb, level and lined up.",
    bullets: ["Assembly & install", "Hardware & soft-close", "Door & drawer alignment"],
    icon: ChefHat,
    image: images.services["kitchen-cabinets"],
  },
  {
    slug: "painting",
    title: "Interior & Exterior Painting",
    short: "Painting",
    blurb:
      "Rooms, trim, doors, ceilings, decks and siding. Prep done properly, lines cut clean, and the furniture back where it was.",
    bullets: ["Walls, trim & ceilings", "Exterior siding & trim", "Drywall patching"],
    icon: PaintRoller,
    image: images.services.painting,
    featured: true,
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    short: "Power Washing",
    blurb:
      "Driveways, siding, decks, fences, patios and walkways. Mildew, pollen and grime gone — curb appeal back.",
    bullets: ["Driveways & walkways", "Siding & soft-wash", "Decks, fences & patios"],
    icon: Droplets,
    image: images.services["power-washing"],
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    short: "Landscaping",
    blurb:
      "Bed cleanups, mulch, planting, shrub trimming, sod and small hardscape. Tidy yards that look cared for.",
    bullets: ["Cleanups & mulch", "Trimming & planting", "Small hardscape"],
    icon: TreePine,
    image: images.services.landscaping,
  },
  {
    slug: "home-depot-services",
    title: "Home Depot Services",
    short: "Home Depot",
    blurb:
      "Bought it at Home Depot? George picks it up, delivers it, installs it and takes the boxes with him. One trip, done.",
    bullets: ["Pickup & delivery", "Assembly & install", "Packaging removal"],
    icon: Truck,
    image: images.services["home-depot-services"],
  },
  {
    slug: "handyman",
    title: "General Handyman",
    short: "Handyman",
    blurb:
      "Shelving, curtain rods, door hardware, drywall repair, caulking, small fixes — the whole honey-do list in one visit.",
    bullets: ["Shelves, rods & mirrors", "Drywall & caulk", "Doors, locks & hardware"],
    icon: Wrench,
    image: images.services.handyman,
  },
] as const;

export const serviceOptions = services.map((s) => ({ value: s.slug, label: s.title }));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
