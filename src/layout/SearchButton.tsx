import { Box } from "@jobber/components/Box";
import { Icon } from "@jobber/components/Icon";
import { Typography } from "@jobber/components/Typography";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { Suspense, lazy, useState } from "react";
import styles from "./SearchButton.module.css";

// The search dialog loads the first time it opens (or the button is pointed at or focused), then
// stays, so it can animate closed.
const loadSearchBox = () => import("./SearchBox");
const SearchBox = lazy(() => loadSearchBox().then((module) => ({ default: module.SearchBox })));

const isTextInput = (event: KeyboardEvent) =>
  (event.target instanceof HTMLDivElement && event.target.getAttribute("contenteditable") === "true") ||
  event.target instanceof HTMLInputElement ||
  event.target instanceof HTMLTextAreaElement;

// The top bar's search button, also opened with "/".
export const SearchButton = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const openSearch = () => {
    setLoaded(true);
    setOpen(true);
  };

  useOnKeyDown((event: KeyboardEvent) => {
    if (isTextInput(event)) return;
    event.preventDefault();
    openSearch();
  }, "/");

  return (
    <Box>
      <button
        type="button"
        onClick={openSearch}
        onPointerEnter={loadSearchBox}
        onFocus={loadSearchBox}
        className={styles.searchButton}
        aria-label="Search"
      >
        <Icon name="search" color="greyBlue" />
        <span className={styles.searchButtonText}>
          <Typography size="base" textColor="textSecondary">
            Search
          </Typography>
        </span>
        <div className={styles.searchKeyIndicator}>/</div>
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <SearchBox open={open} setOpen={setOpen} />
        </Suspense>
      )}
    </Box>
  );
};
