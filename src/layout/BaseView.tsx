import { Box } from "@jobber/components/Box";
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

// Same structure and inline styles as the site's BaseView / BaseView.Main / BaseView.Siderail.
export const BaseView = ({ main, siderail }: { main: ReactNode; siderail: ReactNode }) => (
  <div style={{ display: "flex", height: "100dvh" }}>
    <Box width="grow">
      <SiteHeader />
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
        <div style={{ height: "100%", overflowY: "scroll", borderRadius: "inherit" }} data-main-scroll>
          <Box alignItems="center">
            <div
              className="baseView-main"
              style={{
                width: "100%",
                maxWidth: "calc(768px + var(--space-large))",
                padding: "0 var(--space-base)",
                boxSizing: "border-box",
              }}
            >
              {main}
            </div>
          </Box>
        </div>
      </main>
    </Box>
    <aside className="baseView-sideRail">{siderail}</aside>
  </div>
);
