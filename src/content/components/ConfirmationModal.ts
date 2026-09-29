import markdown from "../../generated/docs/ConfirmationModal.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ConfirmationModal",
  category: "Overlays",
  markdown,
  storybook: "components-overlays-confirmationmodal--basic",
  source: "ConfirmationModal/ConfirmationModal.tsx",
  example: `const [open, setOpen] = useState(false);

return (
  <>
    <Button label="Open" onClick={() => setOpen(true)} />
    <ConfirmationModal
      title={"Should we?"}
      message={"Let's do **something**!"}
      open={open}
      confirmLabel="Do it"
      onConfirm={() => alert("✅")}
      onCancel={() => alert("🙅‍♂️")}
      onRequestClose={() => setOpen(false)}
    />
  </>
);`,
} satisfies ComponentSource;
