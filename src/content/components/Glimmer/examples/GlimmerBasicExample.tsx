import React from "react";
import { Glimmer } from "@jobber/components/Glimmer";
import { Text } from "@jobber/components/Text";

export function GlimmerBasicExample() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-small)",
          padding: "var(--space-base)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <Text size="small" variation="subdued">
          On surface
        </Text>
        <Glimmer shape="rectangle" size="base" timing="base" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-small)",
          padding: "var(--space-base)",
          backgroundColor: "var(--color-surface--background",
        }}
      >
        <Text size="small" variation="subdued">
          On surface--background
        </Text>
        <Glimmer shape="rectangle" size="base" timing="base" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-small)",
          padding: "var(--space-base)",
          backgroundColor: "var(--color-surface--background--subtle)",
        }}
      >
        <Text size="small" variation="subdued">
          On surface--background--subtle
        </Text>
        <Glimmer shape="rectangle" size="base" timing="base" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-small)",
          padding: "var(--space-base)",
          backgroundColor: "var(--color-surface--reverse)",
        }}
      >
        <Text size="small" variation="subdued">
          On surface--reverse (toggle reverseTheme prop)
        </Text>
        <Glimmer shape="rectangle" size="base" timing="base" />
      </div>
    </div>
  );
}
