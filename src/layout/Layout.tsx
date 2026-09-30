import { AtlantisThemeContextProvider } from "@jobber/components/AtlantisThemeContext";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AtlantisSiteProvider, useSiteSearch } from "../site/AtlantisSiteContext";
import { hooksList } from "../site/lists";
import { scrollToHash } from "../site/scrollToHash";
import { NavMenu } from "./NavMenu";
import { PageShell } from "./PageShell";
import { THEME_STORAGE_KEY } from "./TopNav";
import { TritonProvider, TritonSideDrawer } from "./Triton";

// Old Storybook links to a hook (?path=hooks-usebool--docs) open its page.
function useHookRedirect() {
  const { path } = useSiteSearch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!path?.includes("hooks")) return;
    const name = /hooks-(.*)--docs/.exec(path)?.[1];
    const match = hooksList.find((hook) => name === hook.title.toLowerCase());
    if (match) navigate(match.to);
  }, [navigate, path]);
}

// A link to a heading (#component-view-...) scrolls to it, again each time it is followed. When the
// page's document is still loading, the document scrolls there once it shows (DocumentReady).
function useHashScroll() {
  const { hash, key } = useLocation();
  useEffect(() => {
    scrollToHash(hash);
  }, [hash, key]);
}

export const Layout = () => {
  const scrollPane = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { minimal } = useSiteSearch();

  useEffect(() => {
    scrollPane.current?.scrollTo({ top: 0 });
  }, [pathname]);
  useHookRedirect();
  useHashScroll();

  return (
    <AtlantisThemeContextProvider storageKey={THEME_STORAGE_KEY}>
      <AtlantisSiteProvider minimal={{ requested: minimal, enabled: false }}>
        <TritonProvider>
          <div style={{ display: "flex", background: "var(--color-surface--background)" }}>
            <NavMenu mainContentRef={scrollPane} />
            <div
              style={{ overflow: "auto", width: "100%", height: "100dvh", outline: "transparent" }}
              ref={scrollPane}
              tabIndex={0}
            >
              {/* A page whose code is still loading (on its first visit) shows its top bar meanwhile. */}
              <Suspense fallback={<PageShell />}>
                <Outlet />
              </Suspense>
            </div>
            <TritonSideDrawer />
          </div>
        </TritonProvider>
      </AtlantisSiteProvider>
    </AtlantisThemeContextProvider>
  );
};
