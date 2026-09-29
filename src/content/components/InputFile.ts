import markdown from "../../generated/docs/InputFile.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputFile",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputfile--variations-and-sizes",
  source: "InputFile/InputFile.tsx",
  example: `<InputFile />`,
} satisfies ComponentSource;
