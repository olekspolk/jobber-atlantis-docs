import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ContentOverlay",
  content: () => import("./ContentOverlay.mdx"),
  notes: () => import("./ContentOverlay.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `const contentOverlayRef = useRef<ContentOverlayRef>(null);

return (
  <View
    style={{
      width: 300,
    }}
  >
    <ContentOverlay
      title={"Overlay Title"}
      onClose={() => {
        return alert("Overlay Dismissed");
      }}
      onOpen={() => {
        return alert("Overlay opened");
      }}
      fullScreen={false}
      ref={contentOverlayRef}
    >
      <Content>
        <Text>I am some text inside the ContentOverlay.</Text>
      </Content>
    </ContentOverlay>
    <View>
      <Button
        label="Open Overlay"
        onPress={() => contentOverlayRef.current?.open?.()}
      />
    </View>
  </View>
);`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-overlays-contentoverlay--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
