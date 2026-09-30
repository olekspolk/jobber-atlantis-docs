import "@jobber/design/foundation.css";
import "@jobber/design/dark.mode.css";
import "@jobber/components/styles";
import "./styles/global.css";
import { updateTheme } from "@jobber/components/AtlantisThemeContext";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { THEME_STORAGE_KEY } from "./layout/TopNav";
import { ChangelogPage } from "./pages/ChangelogPage";
import { ComponentNotFound } from "./pages/ComponentNotFound";
import { ComponentPage } from "./pages/ComponentPage";
import { ContentLoader, WelcomeGuidePage } from "./pages/ContentView";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RouteError } from "./pages/RouteError";
import {
  ComponentsPage,
  ContentPage,
  DesignPage,
  GuidesPage,
  HomePage,
  HooksPage,
  PackagesPage,
  PatternsPage,
} from "./pages/OverviewPages";

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

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
