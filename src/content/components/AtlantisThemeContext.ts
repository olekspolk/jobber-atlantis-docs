import markdown from "../../generated/docs/AtlantisThemeContext.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "AtlantisThemeContext",
  category: "Themes",
  markdown,
  storybook: "components-themes-atlantisthemecontext--basic",
  source: "AtlantisThemeContext/AtlantisThemeContext.tsx",
  example: `<AtlantisThemeContextProvider>
  <Box background="surface" padding="larger" radius="base" gap="base">
    <div style={{ display: "flex", gap: "8px" }}>
      <InlineLabel color="red">Past due</InlineLabel>
      <InlineLabel color="yellow">Unscheduled</InlineLabel>
      <InlineLabel color="green">Approved</InlineLabel>
      <InlineLabel color="greyBlue">Draft</InlineLabel>
      <InlineLabel color="lightBlue">Sent</InlineLabel>
    </div>
    <Flex gap="base" align="center" direction="row" template={["grow", "grow"]}>
      <Button label="Set dark theme" onClick={() => updateTheme("dark")} />
      <Button label="Set light theme" onClick={() => updateTheme("light")} />
    </Flex>
  </Box>
</AtlantisThemeContextProvider>`,
} satisfies ComponentSource;
