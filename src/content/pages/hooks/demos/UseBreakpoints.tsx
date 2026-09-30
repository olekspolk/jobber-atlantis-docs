import { Box } from "@jobber/components/Box";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { Stack } from "@jobber/components/Stack";
import { Text } from "@jobber/components/Text";
import { useBreakpoints } from "@jobber/hooks/useBreakpoints";

export function UseBreakpoints() {
  const breakpoints = useBreakpoints();
  return (
    <Box width="100%">
      <Content>
        <Stack gap="small">
          {Object.entries(breakpoints).map(([key, value]) => (
            <Flex template={["shrink", "grow"]} key={key}>
              <Text variation="subdued">{key}</Text>
              <InlineLabel color={value ? "green" : "red"}>{String(value)}</InlineLabel>
            </Flex>
          ))}
        </Stack>
      </Content>
    </Box>
  );
}
