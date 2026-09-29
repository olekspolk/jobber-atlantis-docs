import markdown from "../../generated/docs/SegmentedControl.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "SegmentedControl",
  category: "Selections",
  markdown,
  storybook: "components-selections-segmentedcontrol--controlled",
  source: "SegmentedControl/SegmentedControl.tsx",
  example: `const [activeOption, setActiveOption] = useState("week");
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
} satisfies ComponentSource;
