import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Card",
  content: () => import("./Card.mdx"),
  notes: () => import("./Card.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Card
  header={{
    title: "Get the mobile app",
    action: <Button label="Get It Now" />,
  }}
>
  <Content>
    <Text>
      Stay connected with your team in the field when you put the Jobber app in
      their hands.
    </Text>
  </Content>
</Card>`,
    mobileElement: `<Card header={{ title: "Client" }}>
  <Content childSpacing={"small"}>
    <Content spacing={"none"} childSpacing={"none"}>
      <Text variation={"subdued"}>Address</Text>
      <Text>12345 Fake Street</Text>
    </Content>
    <Content spacing={"none"} childSpacing={"none"}>
      <Text variation={"subdued"}>Phone</Text>
      <Text>555-555-5555</Text>
    </Content>
  </Content>
</Card>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-card--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-card--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
