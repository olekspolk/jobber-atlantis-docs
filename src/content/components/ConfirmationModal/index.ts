import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "ConfirmationModal",
  content: () => import("./ConfirmationModal.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `const [open, setOpen] = useState(false);

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
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-overlays-confirmationmodal--basic", "web"),
    },
  ],
} satisfies ComponentContent;
