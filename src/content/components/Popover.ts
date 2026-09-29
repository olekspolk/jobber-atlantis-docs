import markdown from "../../generated/docs/Popover.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Popover",
  category: "Overlays",
  markdown,
  storybook: "components-overlays-popover--basic",
  source: "Popover/Popover.tsx",
  example: `const divRef = useRef<HTMLSpanElement>(null);
const [showPopover, setShowPopover] = useState(undefined);

return (
  <>
    <span ref={divRef}>
      <Button
        label="Toggle Popover"
        onClick={() => setShowPopover(!showPopover)}
      />
    </span>
    <Popover
      attachTo={divRef}
      open={showPopover}
      onRequestClose={() => setShowPopover(false)}
    >
      <Content>Here is your first Popover</Content>
    </Popover>
  </>
);`,
} satisfies ComponentSource;
