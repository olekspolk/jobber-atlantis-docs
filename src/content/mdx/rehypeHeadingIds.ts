// The site's heading ids: every h2 of a document gets "component-view-" + its text, lowercase,
// spaces as dashes, and a data-heading-link attribute (the heading the Design tab makes linkable).
// The whole text, where the site took only the first child's: a heading that starts with a link or
// inline code, such as a changelog's linked version number, then matches its "Jump To" entry.
interface Node {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
}

const textOf = (node: Node): string => node.value ?? node.children?.map(textOf).join("") ?? "";

export function rehypeHeadingIds() {
  const walk = (node: Node) => {
    if (node.type === "element" && node.tagName === "h2") {
      node.properties = {
        ...node.properties,
        id: `component-view-${textOf(node).toLowerCase().replace(/\s+/g, "-")}`,
        dataHeadingLink: "",
      };
    }
    node.children?.forEach(walk);
  };
  return (tree: Node) => walk(tree);
}
