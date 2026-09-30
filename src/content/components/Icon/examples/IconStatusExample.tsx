import React from "react";
import { Icon } from "@jobber/components/Icon";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function IconStatusExample() {
  return (
    <Content spacing="larger">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
        }}
      >
        <Icon name="alert" color="critical" />
        <Content spacing="smallest">
          <Text variation="error">Something has gone wrong</Text>
        </Content>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
        }}
      >
        <Icon name="warning" color="warning" />
        <Content spacing="smallest">
          <Text variation="warn">Something could go wrong</Text>
        </Content>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
        }}
      >
        <Icon name="info" color="informative" />
        <Content spacing="smallest">
          <Text variation="info">Something is happening</Text>
        </Content>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
        }}
      >
        <Icon name="checkmark" />
        <Content spacing="smallest">
          <Text variation="success">Something succeeded</Text>
        </Content>
      </div>
    </Content>
  );
}
