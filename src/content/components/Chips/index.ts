import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Chips",
  content: () => import("./Chips.mdx"),
  notes: () => import("./Chips.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
  ],
  props,
  component: {
    element: `const [selected, setSelected] = useState();

return (
  <Content>
    <Text>
      You are <u>{selected ? selected : "_______"}</u>
    </Text>
    <Chips selected={selected} onChange={setSelected} type="singleselect">
      <Chip label="Amazing" value="Amazing" />
      <Chip label="Wonderful" value="Wonderful" />
      <Chip label="Brilliant" value="Brilliant" />
      <Chip label="Magnificent" value="Magnificent" />
    </Chips>
  </Content>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-chips--basic", "web"),
    },
  ],
} satisfies ComponentContent;
