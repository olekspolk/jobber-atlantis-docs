import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Page",
  content: () => import("./Page.mdx"),
  notes: () => import("./Page.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `<Page
  title={"Notifications"}
  intro={
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us)."
  }
>
  <Content>
    <Text>Page content here</Text>
  </Content>
</Page>`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-page--basic", "web"),
    },
  ],
} satisfies ComponentContent;
