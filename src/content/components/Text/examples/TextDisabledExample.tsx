import React from "react";
import { Checkbox } from "@jobber/components/Checkbox";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function TextDisabledExample() {
  return (
    <Content>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-small)",
          marginBottom: "var(--space-small)",
        }}
      >
        <Checkbox disabled checked={false} />
        <Text variation="disabled">A checkbox option</Text>
      </div>
      <Text>
        You must enable your other settings before you can select this option.
      </Text>
    </Content>
  );
}
