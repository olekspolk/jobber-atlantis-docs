import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "LightBox",
  content: () => import("./LightBox.mdx"),
  notes: () => import("./LightBox.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-download-formats", label: "Download formats" },
  ],
  props,
  component: {
    element: `const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button label="Click me!" onClick={() => setIsOpen(true)} />
    <LightBox
      images={[
        {
          title: "Victoria, BC, Canada",
          url: "https://images.unsplash.com/photo-1597201278257-3687be27d954?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          caption:
            "This was the view of Bushart Gardens in Victoria, BC, Canada in July from a hill.",
        },
        {
          title: "A house",
          url: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
          caption: "House with a garden.",
        },
        {
          url: "https://images.unsplash.com/photo-1532302780319-95689ab9d79a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
      ]}
      open={isOpen}
      onRequestClose={() => setIsOpen(false)}
    />
  </>
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-images-and-icons-lightbox--basic", "web"),
    },
  ],
  previewMaxHeight: 500,
} satisfies ComponentContent;
