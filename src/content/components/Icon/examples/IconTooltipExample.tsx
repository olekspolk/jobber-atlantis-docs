import React from "react";
import { Icon } from "@jobber/components/Icon";
import { Tooltip } from "@jobber/components/Tooltip";

export function IconTooltipExample() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-large)",
      }}
    >
      <Tooltip message="Search">
        <Icon name="search" />
      </Tooltip>
      <Tooltip message="Support">
        <Icon name="help" />
      </Tooltip>
      <Tooltip message="Settings">
        <Icon name="cog" />
      </Tooltip>
    </div>
  );
}
