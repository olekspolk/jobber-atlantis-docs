// The page's stylesheets, in the order they apply on the original site: its fonts, the Tailwind
// utilities some guides use, then Atlantis and the site's own.
import "./styles/fonts.css";
import "./styles/tailwind.css";
import "@jobber/design/foundation.css";
import "@jobber/design/dark.mode.css";
import "@jobber/components/styles";
import "./styles/global.css";
import { updateTheme } from "@jobber/components/AtlantisThemeContext";
import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { THEME_STORAGE_KEY } from "./layout/TopNav";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RouteError } from "./pages/RouteError";
import { pageReady } from "./site/pageReady";

// A page's code loads with its first visit; the 404 comes with the site.
const overviewPage = (name: keyof typeof import("./pages/OverviewPages")) =>
  lazy(() => import("./pages/OverviewPages").then((pages) => ({ default: pages[name] })));
const HomePage = overviewPage("HomePage");
const ComponentsPage = overviewPage("ComponentsPage");
const ContentPage = overviewPage("ContentPage");
const DesignPage = overviewPage("DesignPage");
const GuidesPage = overviewPage("GuidesPage");
const HooksPage = overviewPage("HooksPage");
const PackagesPage = overviewPage("PackagesPage");
const PatternsPage = overviewPage("PatternsPage");
const ComponentPage = lazy(() => import("./pages/ComponentPage").then((page) => ({ default: page.ComponentPage })));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage").then((page) => ({ default: page.ChangelogPage })));
const ContentLoader = lazy(() => import("./pages/ContentView").then((page) => ({ default: page.ContentLoader })));
const WelcomeGuidePage = lazy(() => import("./pages/ContentView").then((page) => ({ default: page.WelcomeGuidePage })));
const ComponentNotFound = lazy(() =>
  import("./pages/ComponentNotFound").then((page) => ({ default: page.ComponentNotFound })),
);

// The stored theme, else ?theme=, else light, as the site starts.
const storedTheme = (() => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
})();
const initialTheme = storedTheme || new URLSearchParams(location.search).get("theme");
updateTheme(initialTheme === "dark" ? "dark" : "light");

// A deploy replaces the hashed chunks, so a page opened before it can no longer load a document it
// has not shown yet: reload once to get the new ones. Within 10s of that reload, the error shows.
const RELOADED_AT = "reloaded-for-chunks-at";
window.addEventListener("vite:preloadError", () => {
  try {
    if (Date.now() - Number(sessionStorage.getItem(RELOADED_AT)) < 10_000) return;
    sessionStorage.setItem(RELOADED_AT, String(Date.now()));
  } catch {
    return;
  }
  window.location.reload();
});

// The site's routes: each section's overview page and its pages by name. A page that fails shows
// its error inside the layout, which keeps the navigation.
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <RouteError />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/patterns", element: <PatternsPage /> },
          { path: "/patterns/:name", element: <ContentLoader /> },
          { path: "/components", element: <ComponentsPage /> },
          { path: "/components/:name/:tab?", element: <ComponentPage /> },
          { path: "/content", element: <ContentPage /> },
          { path: "/content/:name", element: <ContentLoader /> },
          { path: "/design", element: <DesignPage /> },
          { path: "/design/:name", element: <ContentLoader /> },
          { path: "/hooks", element: <HooksPage /> },
          { path: "/hooks/:name", element: <ContentLoader /> },
          { path: "/guides", element: <GuidesPage /> },
          { path: "/guides/:name", element: <ContentLoader /> },
          { path: "/packages", element: <PackagesPage /> },
          { path: "/packages/:name", element: <ContentLoader /> },
          { path: "/changelog", element: <ChangelogPage /> },
          { path: "/changelog/:name", element: <ContentLoader /> },
          { path: "/component-not-found", element: <ComponentNotFound /> },
          { path: "/welcome-guide", element: <WelcomeGuidePage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);

// Navigations are transitions: the page stays until the next one's code has loaded.
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />,
);

// A prerendered page (scripts/prerender.mjs) shows its snapshot while the app renders the page out
// of sight. Once the page is ready (10s at most), the app's page takes the snapshot's place in one
// go, with its panes scrolled where the reader had scrolled the snapshot's. A snapshot switched off
// in the page's head (another address, ?minimal=true) goes at once.
const SCROLL_PANES = ["[data-scroll-pane]", "[data-main-scroll]"];

function replacePrerendered(prerendered: HTMLElement) {
  const shown = [...prerendered.children].find((variant) => variant.getClientRects().length > 0);
  const scrolled = SCROLL_PANES.map((pane) => shown?.querySelector(pane)?.scrollTop ?? 0);
  prerendered.remove();
  document.getElementById("prerendered-style")?.remove();
  SCROLL_PANES.forEach((pane, index) => {
    const element = document.querySelector(`#root ${pane}`);
    if (element && scrolled[index]) element.scrollTop = scrolled[index];
  });
}

const prerendered = document.getElementById("prerendered");
if (prerendered && document.documentElement.dataset.prerendered === "off") {
  replacePrerendered(prerendered);
} else if (prerendered) {
  void Promise.race([pageReady, new Promise((done) => setTimeout(done, 10_000))]).then(() =>
    replacePrerendered(prerendered),
  );
}
