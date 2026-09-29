import markdown from "../../generated/docs/InputAvatar.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputAvatar",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputavatar--basic",
  source: "InputAvatar/InputAvatar.tsx",
  example: `const [avatarUrl, setAvatarUrl] = useState("https://picsum.photos/250");

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
} satisfies ComponentSource;
