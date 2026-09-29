import { updateTheme, useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Icon } from "@jobber/components/Icon";
import { Tooltip } from "@jobber/components/Tooltip";
import styles from "./SiteHeader.module.css";

export const THEME_STORAGE_KEY = "theme";

// Desktop layout of the site's TopNav: centred search + Triton button, theme toggle on the right.
export const SiteHeader = () => {
  const { theme } = useAtlantisTheme();

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
    <nav style={{ display: "flex", alignItems: "center", padding: "12px 16px" }}>
      <Box direction="row" gap="small" alignItems="center" width="grow">
        <Box direction="row" gap="small" justifyContent="center" width="grow" padding={{ left: "extravagant" }}>
          <Box width={200}>
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
  );
};
