import markdown from "../../generated/docs/Countdown.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Countdown",
  category: "Utilities",
  markdown,
  storybook: "components-utilities-countdown--basic",
  source: "Countdown/Countdown.tsx",
  example: `<Countdown
  granularity={"dhms"}
  showUnits={true}
  date={new Date(new Date().getTime() + 25 * 3600 * 1000).toISOString()}
/>`,
} satisfies ComponentSource;
