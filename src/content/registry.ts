// The documented components: one module per component in ./components, each with the docs markdown
// @jobber/components ships for it (copied by scripts/copy-docs.mjs) and the example the site loads.
import site from "../../site.config.json";
import { parseComponentDocs } from "./parseDocs";

// The site's navigation groups components by these categories, in this order.
export const CATEGORIES = [
  "Actions",
  "Forms & Inputs",
  "Images & Icons",
  "Layouts & Structure",
  "Lists & Tables",
  "Navigation",
  "Overlays",
  "Private",
  "Selections",
  "Status & Feedback",
  "Text & Typography",
  "Deprecated",
  "Primitives",
  "Themes",
  "Utilities",
] as const;

export interface ComponentSource {
  readonly name: string;
  readonly category: (typeof CATEGORIES)[number];
  readonly markdown: string;
  /** Story id behind the site's "Web Storybook" link, when the site has one. */
  readonly storybook?: string;
  /** Source path under packages/components/src, behind the site's "Web GitHub" link. */
  readonly source: string;
  /** The example the site loads into the editor. */
  readonly example: string;
  /** Largest height the preview may grow to while the example shows an overlay, in px. */
  readonly previewMaxHeight?: number;
}

const modules = import.meta.glob<{ default: ComponentSource }>("./components/*.ts", { eager: true });

export const COMPONENTS = Object.values(modules)
  .map(({ default: component }) => ({
    ...component,
    path: `/components/${component.name}`,
    docs: parseComponentDocs(component.markdown, component.name),
    links: [
      ...(component.storybook
        ? [{ label: "Web Storybook", url: `${site.storybookUrl}?path=/story/${component.storybook}` }]
        : []),
      { label: "Web GitHub", url: `${site.componentsSourceUrl}/${component.source}` },
    ],
  }))
  .sort(
    (a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.name.localeCompare(b.name),
  );

export type ComponentDocs = (typeof COMPONENTS)[number];

// The navigation's groups: the categories that have components, in the site's order.
export const COMPONENT_GROUPS = CATEGORIES.map((category) => ({
  category,
  components: COMPONENTS.filter((component) => component.category === category),
})).filter((group) => group.components.length > 0);

export const findComponent = (name: string | undefined) => COMPONENTS.find((component) => component.name === name);
