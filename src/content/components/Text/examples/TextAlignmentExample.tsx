import React from "react";
import { Text } from "@jobber/components/Text";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function TextAlignmentExample() {
  return (
    <ContentBlock maxWidth="100%">
      <Text align="start">
        Start aligns text to the left in Latin and other LTR scripts
      </Text>
      <Text align="center">Center is always in... the center</Text>
      <Text align="end">
        End aligns text to the right in Latin and other LTR scripts
      </Text>
    </ContentBlock>
  );
}
