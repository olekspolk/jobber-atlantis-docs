import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Modal",
  content: () => import("./Modal.mdx"),
  notes: () => import("./Modal.notes.mdx"),
  toc: [
    { id: "component-view-scrolling", label: "Scrolling" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `const [modalOpen, setModalOpen] = useState(false);

return (
  <>
    <Modal
      title={"We've updated Jobber"}
      open={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <Content>
        <Text>It&apos;s harder, better, faster, and stronger! 🤖</Text>
      </Content>
    </Modal>
    <Button label="Open Modal" onClick={() => setModalOpen(true)} />
  </>
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-deprecated-modal--basic", "web"),
    },
  ],
} satisfies ComponentContent;
