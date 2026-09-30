import React from "react";
import { Tiles } from "@jobber/components/Tiles";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function TilesGapExample() {
  return (
    <ContentBlock maxWidth="100%">
      <Tiles gap="largest">
        <Box>
          <Card>
            <Box padding="base">
              <Text>First tile</Text>
            </Box>
          </Card>
        </Box>
        <Box>
          <Card>
            <Box padding="base">
              <Text>Second tile</Text>
            </Box>
          </Card>
        </Box>
      </Tiles>
    </ContentBlock>
  );
}
