import React from "react";
import { ContentBlock } from "@jobber/components/ContentBlock";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import type { ContentBlockProps } from "../types";

export function ContentBlockCenteredTextMaxWidthExample(
  props: Partial<ContentBlockProps>,
) {
  return (
    <ContentBlock maxWidth="200px" justify="center" {...props}>
      <Stack>
        <Heading level={2}>Narrow content</Heading>
        <Text>This content and text are centered within a 200px container</Text>
      </Stack>
    </ContentBlock>
  );
}
