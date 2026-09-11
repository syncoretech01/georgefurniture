"use client";

import type Lenis from "lenis";

/** Module-level handle so any component can drive smooth scrolling without context. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

const headerOffset = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const px = parseFloat(v) * 16 || 80;
  return -(px - 1);
};

/** Scroll to an in-page anchor (`#services`) with Lenis if active, native otherwise. */
export function scrollToHash(hash: string, opts: { immediate?: boolean } = {}) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  // Sections declare `scroll-margin-top`; Lenis honours it itself, so only fall back to the
  // header height when an element has none.
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (instance) {
    instance.scrollTo(el, { offset: margin ? 0 : headerOffset(), duration: 1.4, immediate: opts.immediate });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - (margin || -headerOffset());
    window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
  }
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

/** Broadcast a service pre-selection to the quote form, then scroll to it. */
export const PREFILL_EVENT = "georges:prefill-service";
export function requestQuote(service?: string) {
  if (service) {
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { service } }));
  }
  scrollToHash("#quote");
}
