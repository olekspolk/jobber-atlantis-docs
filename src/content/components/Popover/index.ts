import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Popover",
  content: () => import("./Popover.mdx"),
  notes: () => import("./Popover.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `const divRef = useRef<HTMLSpanElement>(null);
const [showPopover, setShowPopover] = useState(undefined);

return (
  <>
    <span ref={divRef}>
      <Button
        label="Toggle Popover"
        onClick={() => setShowPopover(!showPopover)}
      />
    </span>
    <Popover
      attachTo={divRef}
      open={showPopover}
      onRequestClose={() => setShowPopover(false)}
    >
      <Content>Here is your first Popover</Content>
    </Popover>
  </>
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-overlays-popover--basic", "web"),
    },
  ],
} satisfies ComponentContent;
