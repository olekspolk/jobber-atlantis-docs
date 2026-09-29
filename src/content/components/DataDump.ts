import markdown from "../../generated/docs/DataDump.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "DataDump",
  category: "Utilities",
  markdown,
  storybook: "components-utilities-datadump--basic",
  source: "DataDump/DataDump.tsx",
  example: `<DataDump data={{ name: "Bob" }}></DataDump>`,
} satisfies ComponentSource;
