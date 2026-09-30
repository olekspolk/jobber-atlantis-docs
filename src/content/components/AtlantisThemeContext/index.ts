import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "AtlantisThemeContext",
  content: () => import("./AtlantisThemeContext.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  mobileProps,
  component: {
    element: `<AtlantisThemeContextProvider>
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
    mobileElement: `const { theme, effectiveTheme, tokens, setTheme } = useAtlantisTheme();

return (
  <AtlantisThemeContextProvider dangerouslyOverrideTheme={effectiveTheme}>
    <View
      style={{
        backgroundColor: tokens["color-surface"],
        borderRadius: tokens["radius-base"],
        width: "100%",
      }}
    >
      <Content>
        <Text>Selected Theme: {theme}</Text>
        <Text>Effective Theme: {effectiveTheme}</Text>
        <Button label="Set system theme" onPress={() => setTheme("system")} />
        <Button label="Set dark theme" onPress={() => setTheme("dark")} />
        <Button label="Set light theme" onPress={() => setTheme("light")} />
      </Content>
    </View>
  </AtlantisThemeContextProvider>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-themes-atlantisthemecontext--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-themes-atlantisthemecontext--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
