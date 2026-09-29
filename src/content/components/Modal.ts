import markdown from "../../generated/docs/Modal.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Modal",
  category: "Deprecated",
  markdown,
  storybook: "components-deprecated-modal--basic",
  source: "Modal/Modal.tsx",
  example: `const [modalOpen, setModalOpen] = useState(false);

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
} satisfies ComponentSource;
