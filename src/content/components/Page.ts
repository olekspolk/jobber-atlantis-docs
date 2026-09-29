import markdown from "../../generated/docs/Page.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Page",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-page--basic",
  source: "Page/Page.tsx",
  example: `<Page
  title={"Notifications"}
  intro={
    "Improve job completion rates, stop chasing payments, and boost your customer service by automatically communicating with your clients at key points before, during, and after a job. Read more about Notifications by visiting our [Help Center](https://help.getjobber.com/hc/en-us)."
  }
>
  <Content>
    <Text>Page content here</Text>
  </Content>
</Page>`,
} satisfies ComponentSource;
