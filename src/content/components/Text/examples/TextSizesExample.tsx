import React from "react";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function TextSizesExample() {
  return (
    <Content>
      <Text size="base">
        Both Trains and Text come in all different kinds of sizes
      </Text>
      <Text size="small">Sometimes they are small</Text>
      <Text size="large">Other times they are large</Text>
    </Content>
  );
}
