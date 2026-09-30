import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ActionItemGroup",
  content: () => import("./ActionItemGroup.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  mobileProps,
  component: {
    mobileElement: `<ActionItemGroup>
  <Card>
    <ActionItem
      title={"Request #13"}
      icon={"request"}
      onPress={() => alert("request")}
    />
    <ActionItem
      title={"Quote #64"}
      icon={"quote"}
      onPress={() => alert("quote")}
    />
    <ActionItem title={"Job #12"} icon={"job"} onPress={() => alert("job")} />
    <ActionItem
      title={"Invoice #72"}
      icon={"invoice"}
      onPress={() => alert("invoice")}
    >
      <Text>$250.00</Text>
    </ActionItem>
  </Card>
</ActionItemGroup>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-actionitemgroup--basic", "mobile"),
    },
    {
      label: "Mobile GitHub",
      type: "mobile",
      url: "https://github.com/GetJobber/atlantis/blob/master/packages/components-native/src/ActionItem/ActionItemGroup.tsx",
    },
  ],
} satisfies ComponentContent;
