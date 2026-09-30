import type { ReactNode } from "react";
import styles from "./VisibleWhenFocused.module.css";

// Hidden until something inside it has keyboard focus (the "Skip to Content" button).
export const VisibleWhenFocused = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>{children}</div>
);
