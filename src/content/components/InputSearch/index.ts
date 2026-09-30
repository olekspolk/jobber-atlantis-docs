import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputSearch",
  content: () => import("./InputSearch.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `const [value, setValue] = useState("");
return (
  <InputSearch
    placeholder={"Search"}
    prefix={{ icon: "search" }}
    value={value}
    onChange={(newValue) => setValue(newValue)}
    onDebouncedChange={() => console.log("Debounced value:" + value)}
  />
);`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputsearch--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
