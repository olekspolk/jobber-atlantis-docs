import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Dialog",
  content: () => import("./Dialog.mdx"),
  notes: () => import("./Dialog.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behavior", label: "Behavior" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-content-guidelines", label: "Content Guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `return (
  <Dialog size="base">
    <Dialog.Trigger>
      <Button label="Open Dialog" />
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Close />
      </Dialog.Header>
      <Dialog.Body>
        <Text>Body content goes here.</Text>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Actions
          primary={<Dialog.Close render={<Button label="Save" />} />}
          secondary={
            <Dialog.Close
              render={<Button label="Cancel" variation="subtle" />}
            />
          }
        />
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-overlays-dialog--basic", "web"),
    },
  ],
} satisfies ComponentContent;
