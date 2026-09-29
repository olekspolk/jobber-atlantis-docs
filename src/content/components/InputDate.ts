import markdown from "../../generated/docs/InputDate.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputDate",
  markdown,
  storybook: "components-forms-and-inputs-inputdate--basic",
  source: "InputDate/InputDate.tsx",
  example: `const [date, setDate] = useState(new Date());
      return <InputDate value={date} onChange={setDate} />;`,
} satisfies ComponentSource;
