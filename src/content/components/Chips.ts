import markdown from "../../generated/docs/Chips.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Chips",
  category: "Selections",
  markdown,
  storybook: "components-selections-chips--basic",
  source: "Chips/Chips.tsx",
  example: `const [selected, setSelected] = useState();

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
} satisfies ComponentSource;
