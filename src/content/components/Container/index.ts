import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Container",
  content: () => import("./Container.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<ContentBlock maxWidth="100%">
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
  },
  links: [{ label: "Containers", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@container" }],
} satisfies ComponentContent;
