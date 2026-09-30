import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "SelectPrimitive",
  content: () => import("./SelectPrimitive.mdx"),
  notes: () => import("./SelectPrimitive.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-states", label: "States" },
  ],
  props,
  component: {
    element: `const [value, setValue] = useState<string | null>(null);
return (
  <SelectPrimitive.Root value={value} onValueChange={setValue}>
    <SelectPrimitive.Trigger>
      <SelectPrimitive.Value placeholder="Select an option" />
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner>
        <SelectPrimitive.Popup>
          <SelectPrimitive.List>
            <SelectPrimitive.Item value="apple">
              <SelectPrimitive.ItemText>Apple</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator />
            </SelectPrimitive.Item>
            <SelectPrimitive.Item value="banana">
              <SelectPrimitive.ItemText>Banana</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator />
            </SelectPrimitive.Item>
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);`,
  },
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/story/components-primitives-selectprimitive--basic", "web"),
    },
  ],
} satisfies ComponentContent;
