import { type ReactNode, Suspense, createContext, lazy, useContext, useState } from "react";

// Triton's drawer loads the first time it opens, then stays, so it can animate closed.
const TritonDrawer = lazy(() => import("./TritonDrawer").then((module) => ({ default: module.TritonDrawer })));

interface Triton {
  readonly tritonOpen: boolean;
  readonly onOpenTriton: () => void;
  readonly onCloseTriton: () => void;
}

const TritonContext = createContext<Triton>({ tritonOpen: false, onOpenTriton: () => {}, onCloseTriton: () => {} });

export const useTritonChat = () => useContext(TritonContext);

export function TritonProvider({ children }: { children: ReactNode }) {
  const [tritonOpen, setTritonOpen] = useState(false);
  return (
    <TritonContext.Provider
      value={{ tritonOpen, onOpenTriton: () => setTritonOpen(true), onCloseTriton: () => setTritonOpen(false) }}
    >
      {children}
    </TritonContext.Provider>
  );
}

export function TritonSideDrawer() {
  const { tritonOpen } = useTritonChat();
  const [loaded, setLoaded] = useState(false);
  if (tritonOpen && !loaded) setLoaded(true);
  return loaded ? (
    <Suspense fallback={null}>
      <TritonDrawer />
    </Suspense>
  ) : null;
}
