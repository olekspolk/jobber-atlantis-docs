import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "BottomSheet",
  content: () => import("./BottomSheet.mdx"),
  notes: () => import("./BottomSheet.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `const bottomSheetRef = useRef<BottomSheetRef>(null);

return (
  <>
    <BottomSheet
      showCancel={true}
      heading={"What would you like to do?"}
      onClose={function onClose() {
        return alert("Overlay Dismissed");
      }}
      ref={bottomSheetRef}
    >
      <BottomSheetOption
        icon="sendMessage"
        iconColor="greyBlue"
        text="Send message"
        onPress={() => alert("send message")}
      />
      <BottomSheetOption
        icon="phone"
        iconColor="greyBlue"
        text="Call a friend"
        onPress={() => alert("Calling a friend")}
      />
      <BottomSheetOption
        destructive={true}
        icon="trash"
        text="Remove"
        onPress={() => alert("Removed")}
      />
    </BottomSheet>
    <Button
      label="Show BottomSheet"
      onPress={() => {
        bottomSheetRef.current?.open();
        alert("will show bottom sheet in mobile");
      }}
    />
  </>
);`,
  },
  links: [
    {
      label: "Storybook",
      url: getStorybookUrl("?path=/story/components-selections-bottomsheet--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
