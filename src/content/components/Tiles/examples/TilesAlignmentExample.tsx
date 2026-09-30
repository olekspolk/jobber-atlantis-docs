import React from "react";
import { Tiles } from "@jobber/components/Tiles";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function TilesAlignmentExample() {
  return (
    <ContentBlock maxWidth="100%">
      <Box border="base" borderColor="border" padding="small">
        <Tiles gap="small" align="center" minSize="15ch">
          <Card>
            <Box height={150} width={90} padding="base" justifyContent="center">
              <Text>First tile</Text>
            </Box>
          </Card>
          <Card>
            <Box height={50} width={90} padding="base" justifyContent="center">
              <Text>Second tile</Text>
            </Box>
          </Card>
          <Card>
            <Box height={20} width={90} padding="base" justifyContent="center">
              <Text>Third tile</Text>
            </Box>
          </Card>
          <Card>
            <Box height={35} width={90} padding="base" justifyContent="center">
              <Text>Forth tile</Text>
            </Box>
          </Card>
        </Tiles>
      </Box>
    </ContentBlock>
  );
}
