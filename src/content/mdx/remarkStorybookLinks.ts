import site from "../../../site.config.json";

// The site's documents link to its Storybook by path (/storybook/web/?path=…), which the original
// site serves and the replica does not: those links point there.
interface Node {
  type: string;
  url?: string;
  children?: Node[];
}

export function remarkStorybookLinks() {
  const walk = (node: Node) => {
    if ((node.type === "link" || node.type === "definition") && node.url?.startsWith("/storybook/")) {
      node.url = `${site.atlantisUrl}${node.url}`;
    }
    node.children?.forEach(walk);
  };
  return (tree: Node) => walk(tree);
}
