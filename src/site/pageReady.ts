import { useEffect } from "react";

declare global {
  interface Window {
    __pageReady?: boolean;
  }
}

// When the page first opened has its content in place: a prerendered page (scripts/prerender.mjs)
// is replaced by the app's then (src/main.tsx), and the prerender script takes its snapshot. Later
// pages change nothing.
let resolvePageReady = () => {};
export const pageReady = new Promise<void>((resolve) => (resolvePageReady = resolve));

export function markPageReady() {
  window.__pageReady = true;
  resolvePageReady();
}

/** For a page whose content is in place once it has rendered. */
export function usePageReady() {
  useEffect(markPageReady, []);
}
