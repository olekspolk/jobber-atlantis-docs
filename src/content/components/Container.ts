import markdown from "../../generated/docs/Container.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Container",
  category: "Layouts & Structure",
  markdown,
  source: "Container/Container.tsx",
  example: `<ContentBlock maxWidth="100%">
  <Container name="wrapper">
    <Container.Apply className="item">
      <Stack>
        <Heading level={1}>Container</Heading>
        <Text>
          This is an item in a container. Try updating the container name to
          'wrapper-two' to see the same layout + classes in a different
          container.
        </Text>
        <Text>
          The container name is passed as a CSS custom property to the container
          query.
        </Text>
        <Text>
          Feel free to write your own container queries to make fine-grained
          adjustments to layouts, and we will be shipping some override
          containers when they're requested.
        </Text>
      </Stack>
    </Container.Apply>
  </Container>
</ContentBlock>`,
} satisfies ComponentSource;
