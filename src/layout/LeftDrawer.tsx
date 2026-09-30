import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./LeftDrawer.module.css";

const CLOSE_ANIMATION_MS = 200;

// The navigation on small screens: full screen, sliding in from the left and back out on close. A
// dialog while open: focus stays inside, Escape closes it, and focus goes back to the menu button.
export function LeftDrawer({ children, onClose, header }: { children: ReactNode; onClose: () => void; header: ReactNode }) {
  // In this order: the menu button is remembered before focus moves into the drawer.
  useRefocusOnActivator(true);
  const ref = useFocusTrap<HTMLDivElement>(true);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef(0);

  const handleClose = () => {
    if (closeTimer.current) return;
    setIsClosing(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = window.setTimeout(onClose, reducedMotion ? 0 : CLOSE_ANIMATION_MS);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div
      ref={ref}
      className={`${styles.drawer} ${isClosing ? styles.drawerClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <Box padding="base" direction="row" alignItems="center" gap="small">
        <Button icon="cross" ariaLabel="Close" type="tertiary" variation="subtle" onClick={handleClose} />
        {header}
      </Box>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
