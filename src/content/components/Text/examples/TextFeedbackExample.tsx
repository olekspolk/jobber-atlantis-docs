import React from "react";
import { Content } from "@jobber/components/Content";
import { Text } from "@jobber/components/Text";

export function TextFeedbackExample() {
  return (
    <Content>
      <Text variation="success">Invoice sent</Text>
      <Text variation="error">Name is required</Text>
      <Text variation="warn">Your message is over 160 characters</Text>
      <Text variation="info">
        Drag to rearrange the order that the fields show up in Jobber
      </Text>
    </Content>
  );
}
