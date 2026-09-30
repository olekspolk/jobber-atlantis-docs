import React from "react";
import { ContentBlock } from "@jobber/components/ContentBlock";
import { Stack } from "@jobber/components/Stack";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import type { ContentBlockProps } from "../types";

export function ContentBlockWithGuttersExample(
  props: Partial<ContentBlockProps>,
) {
  return (
    <ContentBlock gutters="largest" {...props}>
      <Stack>
        <Heading level={2}>Spaced content</Heading>
        <Text>This content maintains minimum spacing from container edges</Text>
      </Stack>
    </ContentBlock>
  );
}
