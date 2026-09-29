import "@jobber/design/foundation.css";
import "@jobber/design/dark.mode.css";
import "@jobber/components/styles";
import "./styles/global.css";
import { updateTheme } from "@jobber/components/AtlantisThemeContext";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { COMPONENTS } from "./content/registry";
import { THEME_STORAGE_KEY } from "./layout/SiteHeader";
import { ComponentPage } from "./pages/ComponentPage";

const storedTheme = (() => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
})();
updateTheme(storedTheme === "dark" ? "dark" : "light");

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/components/:name/:tab?", element: <ComponentPage /> },
      { path: "*", element: <Navigate to={COMPONENTS[0].path} replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
