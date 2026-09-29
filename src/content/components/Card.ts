import markdown from "../../generated/docs/Card.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Card",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-card--basic",
  source: "Card/Card.tsx",
  example: `<Card
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
} satisfies ComponentSource;
