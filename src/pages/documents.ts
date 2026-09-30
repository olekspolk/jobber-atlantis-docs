import type { MDXContent } from "mdx/types";
import { lazy, useEffect, useMemo } from "react";
import type { LoadMDX } from "../content/types";

// A document, loaded when its page is first opened.
export function useDocument(load: LoadMDX | undefined): MDXContent | null {
  return useMemo(() => (load ? (lazy(load) as unknown as MDXContent) : null), [load]);
}

// Placed after a document inside its Suspense boundary: runs once the loaded document is in the page.
export function DocumentReady({ onReady }: { onReady: () => void }) {
  useEffect(() => onReady(), []);
  return null;
}
