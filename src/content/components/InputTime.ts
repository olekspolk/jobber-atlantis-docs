import markdown from "../../generated/docs/InputTime.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputTime",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputtime--basic",
  source: "InputTime/InputTime.tsx",
  example: `const [time, setTime] = useState(new Date());
return <InputTime value={time} onChange={setTime} />;`,
} satisfies ComponentSource;
