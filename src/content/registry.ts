// The documented components: one module per component in ./components, each with the docs markdown
// @jobber/components ships for it (copied by scripts/copy-docs.mjs) and the example the site loads.
import site from "../../site.config.json";
import { parseComponentDocs } from "./parseDocs";

export interface ComponentSource {
  readonly name: string;
  readonly markdown: string;
  /** Story id behind the site's "Web Storybook" link. */
  readonly storybook: string;
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
      { label: "Web Storybook", url: `${site.storybookUrl}?path=/story/${component.storybook}` },
      { label: "Web GitHub", url: `${site.componentsSourceUrl}/${component.source}` },
    ],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export type ComponentDocs = (typeof COMPONENTS)[number];

export const findComponent = (name: string | undefined) => COMPONENTS.find((component) => component.name === name);
