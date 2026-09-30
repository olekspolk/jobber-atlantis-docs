// The side navigation's tree, built from the page lists as the site builds it.
import {
  type ContentListItem,
  changelogList,
  componentList,
  componentSections,
  contentList,
  designList,
  guidesList,
  hooksList,
  packagesList,
  patternsList,
} from "./lists";

export interface NavRoute {
  readonly path?: string;
  readonly handle: string;
  readonly inNav?: boolean;
  readonly children?: readonly NavRoute[];
}

const mapListToNavItems = (list: readonly ContentListItem[]): NavRoute[] =>
  list.map((item) => ({ path: item.to, handle: item.title, inNav: true }));

// Components are grouped by section; a component can be listed in more than one.
const generateComponentSidebar = (): NavRoute[] =>
  componentSections.flatMap((section) => {
    const children = componentList
      .filter((component) => component.sections?.includes(section))
      .map((component) => ({ path: component.to, handle: component.title, inNav: true }));
    return children.length > 0 ? [{ handle: section, children }] : [];
  });

export const routes: readonly NavRoute[] = [
  { path: "/", handle: "Home" },
  { path: "/patterns", handle: "Patterns", children: mapListToNavItems(patternsList) },
  { path: "/components", handle: "Components", children: generateComponentSidebar() },
  { path: "/content", handle: "Content", children: mapListToNavItems(contentList) },
  { path: "/design", handle: "Design", children: mapListToNavItems(designList) },
  { path: "/hooks", handle: "Hooks", children: mapListToNavItems(hooksList) },
  { path: "/guides", handle: "Guides", children: mapListToNavItems(guidesList) },
  { path: "/packages", handle: "Packages", children: mapListToNavItems(packagesList) },
  { path: "/changelog", handle: "Changelog", children: mapListToNavItems(changelogList) },
];
