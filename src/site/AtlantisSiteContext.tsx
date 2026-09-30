import { type ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { matchPath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { type ComponentKind, resolveComponentTypeFromRoute } from "./componentTypes";

// The search params the site reads on every page (its router's validateSearch).
export function useSiteSearch() {
  const [params] = useSearchParams();
  const flag = (name: string) => params.get(name)?.toLowerCase() === "true";
  return {
    isLegacy: flag("isLegacy"),
    minimal: flag("minimal"),
    path: params.get("path") ?? undefined,
    theme: params.get("theme") ?? undefined,
  };
}

interface Minimal {
  readonly requested: boolean;
  readonly enabled: boolean;
}

interface AtlantisSite {
  readonly minimal: Minimal;
  /** A page embedded elsewhere (?minimal=true on a component page): no navigation, no side rail. */
  readonly isMinimal: boolean;
  readonly enableMinimal: () => void;
  readonly disableMinimal: () => void;
  readonly isMobileMenuOpen: boolean;
  readonly toggleMobileMenu: () => void;
  /** Closes the small-screen drawer if it is open; links call it at every width. */
  readonly closeMobileMenu: () => void;
  readonly componentTypeFromUrl: ComponentKind | null;
  readonly setComponentTypeInUrl: (type: ComponentKind) => void;
}

const AtlantisSiteContext = createContext<AtlantisSite>({
  minimal: { requested: false, enabled: false },
  isMinimal: false,
  enableMinimal: () => {},
  disableMinimal: () => {},
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
  componentTypeFromUrl: null,
  setComponentTypeInUrl: () => {},
});

export const useAtlantisSite = () => useContext(AtlantisSiteContext);

export function AtlantisSiteProvider({ children, minimal }: { children: ReactNode; minimal: Minimal }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLegacy } = useSiteSearch();
  const componentMatch = matchPath("/components/:name/:tab?", pathname);
  const isComponentPage = pathname.startsWith("/components/");
  const tab = componentMatch?.params.tab?.toLowerCase().trim();

  const componentTypeFromUrl = useMemo(
    () => (isComponentPage ? resolveComponentTypeFromRoute({ tab, isLegacy, allowNullWhenNoTab: true }) : null),
    [isComponentPage, tab, isLegacy],
  );

  const setComponentTypeInUrl = useCallback(
    (type: ComponentKind) => {
      if (!isComponentPage) return;
      const next = new URLSearchParams(searchParams);
      next.set("isLegacy", String(type === "web"));
      navigate({ pathname, search: `?${next}` });
    },
    [isComponentPage, navigate, pathname, searchParams],
  );

  const [minimalState, setMinimalState] = useState(minimal);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const enableMinimal = useCallback(() => setMinimalState((state) => ({ ...state, enabled: true })), []);
  const disableMinimal = useCallback(() => setMinimalState((state) => ({ ...state, enabled: false })), []);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((open) => !open), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <AtlantisSiteContext.Provider
      value={{
        minimal: minimalState,
        isMinimal: minimalState.enabled && minimalState.requested,
        enableMinimal,
        disableMinimal,
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        componentTypeFromUrl,
        setComponentTypeInUrl,
      }}
    >
      {children}
    </AtlantisSiteContext.Provider>
  );
}
