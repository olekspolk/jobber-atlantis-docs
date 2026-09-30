import React from "react";
import { Icon } from "@jobber/components/Icon";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function IconSizesExample() {
  return (
    <Content spacing="larger">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-large)",
        }}
      >
        <Icon name="search" size="small" />
        <Content spacing="smallest">
          <Text>Small</Text>
          <Text size="small" variation="subdued">
            When space is severely constrained
          </Text>
        </Content>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-base)",
        }}
      >
        <Icon name="search" />
        <Content spacing="smallest">
          <Text>Base</Text>
          <Text size="small" variation="subdued">
            For most icon usage
          </Text>
        </Content>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
        }}
      >
        <Icon name="search" size="large" />
        <Content spacing="smallest">
          <Text>Large</Text>
          <Text size="small" variation="subdued">
            When the icon is prominently featured in the interface
          </Text>
        </Content>
      </div>
    </Content>
  );
}
