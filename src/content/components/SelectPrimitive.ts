import markdown from "../../generated/docs/SelectPrimitive.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "SelectPrimitive",
  category: "Primitives",
  markdown,
  storybook: "components-primitives-selectprimitive--basic",
  source: "primitives/SelectPrimitive/SelectPrimitive.tsx",
  example: `const [value, setValue] = useState<string | null>(null);
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
} satisfies ComponentSource;
