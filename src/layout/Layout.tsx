import { AtlantisThemeContextProvider } from "@jobber/components/AtlantisThemeContext";
import { Outlet } from "react-router-dom";
import { DesktopNav } from "./NavMenu";
import { THEME_STORAGE_KEY } from "./SiteHeader";

export const Layout = () => (
  <AtlantisThemeContextProvider storageKey={THEME_STORAGE_KEY}>
    <div style={{ display: "flex", background: "var(--color-surface--background)" }}>
      <DesktopNav />
      <div style={{ overflow: "auto", width: "100%", height: "100dvh" }}>
        <Outlet />
      </div>
    </div>
  </AtlantisThemeContextProvider>
);
