import React from "react";
import { ContentBlock } from "@jobber/components/ContentBlock";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import type { ContentBlockProps } from "../types";

export function ContentBlockBasicCenteringExample(
  props: Partial<ContentBlockProps>,
) {
  return (
    <ContentBlock justify="center" {...props}>
      <Stack>
        <Heading level={1}>Centered content</Heading>
        <Text>This content is horizontally centered</Text>
      </Stack>
    </ContentBlock>
  );
}
