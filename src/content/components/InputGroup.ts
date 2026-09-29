import markdown from "../../generated/docs/InputGroup.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputGroup",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputgroup--basic",
  source: "InputGroup/InputGroup.tsx",
  example: `const startTime = new Date();
startTime.setHours(8, 35, 0, 0);

const endTime = new Date();
endTime.setHours(22, 55, 0, 0);

return (
  <InputGroup flowDirection={"vertical"}>
    <InputTime defaultValue={startTime} />
    <InputTime defaultValue={endTime} />
  </InputGroup>
);`,
} satisfies ComponentSource;
