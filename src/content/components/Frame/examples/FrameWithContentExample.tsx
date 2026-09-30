import React from "react";
import { Frame } from "@jobber/components/Frame";
import { Box } from "@jobber/components/Box";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

export function FrameWithContentExample() {
  return (
    <Frame>
      <Box padding="base">
        <Heading level={2}>It Works for Content As Well</Heading>
        <Text>Everything is centered and cropped to fit the aspect ratio.</Text>
      </Box>
    </Frame>
  );
}
