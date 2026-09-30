import { Box } from "@jobber/components/Box";
import type { ReactNode } from "react";
import { TopNav } from "./TopNav";

// A page: its main column under the top bar, and a side rail (shown from 1024px up).
export function BaseView({ children }: { children: ReactNode }) {
  return <div style={{ display: "flex", height: "100dvh" }}>{children}</div>;
}

BaseView.Main = function Main({ children, noMaxWidth = false }: { children: ReactNode; noMaxWidth?: boolean }) {
  return (
    <Box width="grow">
      <TopNav />
      <main
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow: "var(--shadow-base)",
          flexGrow: 1,
          borderRadius: "var(--radius-base) var(--radius-base) 0 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Focusable, so a click in the content (or Skip to Content) gives the keyboard this scroller. */}
        <div
          style={{ height: "100%", overflowY: "scroll", borderRadius: "inherit", outline: "transparent" }}
          tabIndex={-1}
          data-main-scroll
        >
          <Box alignItems="center">
            <div
              className="baseView-main"
              style={{
                width: "100%",
                maxWidth: noMaxWidth ? "none" : "calc(768px + var(--space-large))",
                padding: "0 var(--space-base)",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          </Box>
        </div>
      </main>
    </Box>
  );
};

BaseView.Siderail = function Siderail({ children, visible = true }: { children: ReactNode; visible?: boolean }) {
  if (!visible) return null;
  return <aside className="baseView-sideRail">{children}</aside>;
};
