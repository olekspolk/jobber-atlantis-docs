import markdown from "../../generated/docs/Dialog.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Dialog",
  category: "Overlays",
  markdown,
  storybook: "components-overlays-dialog--basic",
  source: "Dialog/Dialog.tsx",
  example: `return (
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
} satisfies ComponentSource;
