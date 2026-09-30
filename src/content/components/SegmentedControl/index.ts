import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "SegmentedControl",
  content: () => import("./SegmentedControl.mdx"),
  notes: () => import("./SegmentedControl.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `const [activeOption, setActiveOption] = useState("week");
const options = [
  { label: "Week", value: "week" },
  { label: "Months", value: "months" },
  { label: "Year", value: "year" },
];
return (
  <Content>
    <Text>
      Control the state without interacting with the SegmentedControl
      directly. Navigate through the options and reset state via the button.
    </Text>
    <Typography>Current activeOption: {activeOption}</Typography>
    <SegmentedControl
      selectedValue={activeOption}
      onSelectValue={setActiveOption}
      options={[]}
    >
      {options.map((option) => (
        <SegmentedControl.Option key={option.value} value={option.value}>
          {option.label}
        </SegmentedControl.Option>
      ))}
    </SegmentedControl>
    <Button label="Reset to Week" onClick={() => setActiveOption("week")} />
  </Content>
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-segmentedcontrol--controlled", "web"),
    },
  ],
} satisfies ComponentContent;
