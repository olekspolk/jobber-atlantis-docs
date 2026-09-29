import { Button } from "@jobber/components/Button";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useEffect } from "react";
import { Logo, NavMenu } from "./NavMenu";
import styles from "./NavDrawer.module.css";

// The site's navigation on small screens: the side navigation, full screen over the page. It closes
// on its close button, on Escape and once a link is followed.
export const NavDrawer = ({ onClose }: { onClose: () => void }) => {
  // In this order: the menu button is remembered before focus moves into the drawer.
  useRefocusOnActivator(true);
  const ref = useFocusTrap<HTMLDivElement>(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.drawer} role="dialog" aria-modal="true" aria-label="Navigation">
      <div className={styles.header}>
        <Button icon="cross" ariaLabel="Close" variation="subtle" type="tertiary" onClick={onClose} />
        <Logo />
      </div>
      <div className={styles.content}>
        <NavMenu onNavigate={onClose} />
      </div>
    </div>
  );
};
