// Splits the markdown that @jobber/components ships for a component into what the site shows:
// the Design tab (intro, guidelines, accessibility), the Implement tab (configuration, testing,
// developer notes) and the web props tables.
import site from "../../site.config.json";

export interface PropRow {
  readonly id: number;
  readonly key: string;
  readonly required: boolean;
  readonly type: string;
  readonly description: string;
}

export interface PropGroup {
  readonly name: string;
  readonly props: readonly PropRow[];
}

export interface TocEntry {
  readonly id: string;
  readonly label: string;
}

export const headingId = (label: string) =>
  `component-view-${label.toLowerCase().replace(/\s+/g, "-")}`;

// Links in the package docs point at sibling .md files; send them to the live site instead.
const rewriteLinks = (md: string) =>
  md
    .replace(/\]\(\.\.\/product-vocabulary\/product-vocabulary\.md\)/g, `](${site.atlantisUrl}/content/product-vocabulary)`)
    .replace(/\]\(\.\.\/([A-Za-z]+)\/\1\.md\)/g, (_m, name: string) => `](${site.atlantisUrl}/components/${name})`)
    .replace(/\]\((\/[^)\s]+)\)/g, (_m, path: string) => `](${site.atlantisUrl}${path})`);

const unwrapCode = (cell: string) => cell.trim().replace(/^`(.*)`$/, "$1");

// Table cells hold TypeScript types with unescaped pipes inside backticks (`number | string`),
// so split on pipes outside code spans only.
function splitRow(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inCode = false;
  for (const char of line.trim().slice(1, -1)) {
    if (char === "`") inCode = !inCode;
    if (char === "|" && !inCode) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function parseProps(section: string): PropGroup[] {
  const web = section.split(/^### /m).find((part) => part.startsWith("Web")) ?? section;
  return web
    .split(/^#### /m)
    .slice(1)
    .map((block) => {
      const [nameLine, ...rest] = block.split("\n");
      const rows = rest
        .filter((line) => line.startsWith("| `"))
        .map((line, index) => {
          const [key, type, required, , description] = splitRow(line);
          return {
            id: index,
            key: unwrapCode(key),
            required: required === "Yes",
            type: unwrapCode(type),
            description: description ?? "",
          };
        });
      return { name: nameLine.trim(), props: rows };
    });
}

export function parseComponentDocs(raw: string) {
  const md = rewriteLinks(raw).replace(/^# .*\n/, "");
  const at = (heading: string) => md.search(new RegExp(`^## ${heading}\\s*$`, "m"));

  const configuration = at("Configuration");
  const props = at("Props");

  const design = md.slice(0, configuration);
  const implement = md.slice(configuration, props);
  const toc: TocEntry[] = [...design.matchAll(/^## (.+)$/gm)].map((match) => ({
    id: headingId(match[1]),
    label: match[1],
  }));

  return { design, implement, toc, props: parseProps(md.slice(props)) };
}
