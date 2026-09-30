import { Button } from "@jobber/components/Button";
import type { ComponentPropsWithoutRef } from "react";
import { useLocation } from "react-router-dom";
import { copyToClipboard } from "./copyToClipboard";
import styles from "./LinkableHeading.module.css";

// A Design tab's section heading, with a button that copies the link to it.
export const LinkableHeading = ({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) => {
  const isLinkable = props.id?.startsWith("component-view-");
  const { pathname } = useLocation();
  const copyLink = () =>
    copyToClipboard(
      `${window.location.origin}${pathname}#${props.id ?? ""}`,
      "Copied link to clipboard",
      "Unable to copy link",
    );
  return (
    <h2 {...props} className={[isLinkable ? styles.linkableHeading : "", className ?? ""].join(" ").trim() || undefined}>
      {children}
      {isLinkable && (
        <Button
          icon="copy"
          ariaLabel="Copy"
          size="small"
          type="tertiary"
          variation="subtle"
          UNSAFE_className={{ container: styles.copyButton }}
          onClick={copyLink}
        />
      )}
    </h2>
  );
};
