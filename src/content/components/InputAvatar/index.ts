import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "InputAvatar",
  content: () => import("./InputAvatar.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `const [avatarUrl, setAvatarUrl] = useState("https://picsum.photos/250");

return (
  <InputAvatar
    src={"https://picsum.photos/250"}
    getUploadParams={function getUploadParams() {
      return Promise.resolve({ url: "https://httpbin.org/post" });
    }}
    src={avatarUrl}
    onChange={handleChange}
  />
);

async function handleChange(newAvatar: unknown) {
  if (newAvatar) {
    setAvatarUrl(await newAvatar.src());
  } else {
    setAvatarUrl(undefined);
  }
}`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputavatar--basic", "web"),
    },
  ],
} satisfies ComponentContent;
