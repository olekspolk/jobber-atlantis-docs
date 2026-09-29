import { updateTheme, useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Icon } from "@jobber/components/Icon";
import { Tooltip } from "@jobber/components/Tooltip";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";
import { useCallback, useState } from "react";
import { NavDrawer } from "./NavDrawer";
import { Logo } from "./NavMenu";
import styles from "./SiteHeader.module.css";

export const THEME_STORAGE_KEY = "theme";

// The site's TopNav. From the medium breakpoint up: centred search + Triton button, theme toggle on
// the right. Below it the side navigation is hidden, so a menu button and the logo lead, and the
// search button shows only its icon.
export const SiteHeader = () => {
  const { theme } = useAtlantisTheme();
  const { mediumAndUp } = useBreakpoints();
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    updateTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable: the toggle still works for this tab
    }
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: mediumAndUp ? undefined : "space-between",
          padding: "12px 16px",
        }}
      >
        {!mediumAndUp && (
          <Box direction="row" gap="small" alignItems="center">
            <Button icon="menu" ariaLabel="Menu" variation="subtle" type="tertiary" onClick={() => setNavOpen(true)} />
            <Logo />
          </Box>
        )}
        <Box direction="row" gap="small" alignItems="center" width={mediumAndUp ? "grow" : undefined}>
          <Box
            direction="row"
            gap="small"
            justifyContent="center"
            width={mediumAndUp ? "grow" : undefined}
            padding={mediumAndUp ? { left: "extravagant" } : undefined}
          >
            <Box width={mediumAndUp ? 200 : undefined}>
              <button className={styles.searchButton} aria-label="Search" type="button">
                <Icon name="search" />
                <span className={styles.searchButtonText}>Search</span>
                <kbd className={styles.kbd}>/</kbd>
              </button>
            </Box>
            <Tooltip message="Ask Triton">
              <Button icon="sparkles" ariaLabel="triton" variation="subtle" />
            </Tooltip>
          </Box>
          <button
            className={styles.themeToggle}
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            🌒
          </button>
        </Box>
      </nav>
      {navOpen && <NavDrawer onClose={closeNav} />}
    </>
  );
};
