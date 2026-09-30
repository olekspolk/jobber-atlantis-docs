import { updateTheme, useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Tooltip } from "@jobber/components/Tooltip";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";
import { Link } from "react-router-dom";
import { useAtlantisSite } from "../site/AtlantisSiteContext";
import { JobberLogo } from "./JobberLogo";
import { SearchButton } from "./SearchButton";
import { useTritonChat } from "./Triton";

export const THEME_STORAGE_KEY = "theme";

const ToggleThemeButton = () => {
  const { theme } = useAtlantisTheme();
  const isDark = theme === "dark";
  return (
    <Button
      variation="subtle"
      label={isDark ? "☀️" : "🌒"}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        updateTheme(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          // storage unavailable: the toggle still works for this tab
        }
      }}
    />
  );
};

// The site's top bar. From the medium breakpoint up: centred search and Triton, theme toggle on the
// right. Below it the side navigation is hidden, so a menu button and the logo lead.
export const TopNav = () => {
  const { onOpenTriton } = useTritonChat();
  const { mediumAndUp } = useBreakpoints();
  const { toggleMobileMenu, isMinimal } = useAtlantisSite();
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMinimal ? "flex-end" : mediumAndUp ? "" : "space-between",
        padding: "12px 16px",
      }}
    >
      {!mediumAndUp && !isMinimal && (
        <Box direction="row" gap="small" alignItems="center" justifyContent="center">
          <Button ariaLabel="Menu" type="tertiary" variation="subtle" size="base" onClick={toggleMobileMenu} icon="menu" />
          <Box padding={{ top: "smaller" }}>
            <Link to="/" aria-label="Atlantis">
              <JobberLogo />
            </Link>
          </Box>
        </Box>
      )}
      <Box direction="row" gap="small" alignItems="center" width={isMinimal ? "shrink" : mediumAndUp ? "grow" : "shrink"}>
        <Box
          direction="row"
          gap="small"
          justifyContent="center"
          width={mediumAndUp ? "grow" : "auto"}
          padding={mediumAndUp ? { left: "extravagant" } : {}}
        >
          {!isMinimal && (
            <Box width={mediumAndUp ? 200 : "auto"}>
              <SearchButton />
            </Box>
          )}
          <Tooltip message="Ask Triton">
            <Button onClick={onOpenTriton} icon="sparkles" ariaLabel="triton" variation="subtle" />
          </Tooltip>
        </Box>
        <ToggleThemeButton />
      </Box>
    </nav>
  );
};
