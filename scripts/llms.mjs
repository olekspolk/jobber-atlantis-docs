// The docs for language models (https://llmstxt.org), written by scripts/prerender.mjs from the
// pages it renders: /llms.txt lists every page with a line on each, linking to its Markdown version
// (/components/Button.md, /design/colors.md...), and /llms-full.txt holds all of them. A
// component's Markdown has its Design document, its implementation notes, and each platform's
// example and props.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// The site's overview pages, lists of links as llms.txt is, and the changelog's release notes.
export const SKIPPED_PAGES = new Set(["/", "/components", "/patterns", "/content", "/design", "/hooks", "/guides", "/packages", "/changelog"]);

const SECTIONS = {
  patterns: "Patterns",
  components: "Components",
  content: "Content",
  design: "Design",
  hooks: "Hooks",
  guides: "Guides",
  packages: "Packages",
  changelog: "Changelog",
};

const SUMMARY = `> Atlantis is Jobber's design system, its toolkit for building consumer-grade experiences: React
> components for the web (@jobber/components) and React Native (@jobber/components-native), design
> tokens and icons (@jobber/design), hooks (@jobber/hooks), and guidelines for design, content and
> interaction patterns.`;

// In the page, once it is ready: its title (the tab's) and first paragraph, its document as HTML,
// and on a component's Web or Mobile tab, the example and the props (from the props list: a row
// has the name, marked Required or not, the type and the description). The document keeps each
// example's code, shown, and leaves out the example itself and the site's controls (buttons,
// fields, the editor, frames but a Figma embed's link). Tabs in it show one panel at a time: each
// is read in turn, and follows its label.
export function readDocument(page, siteUrl) {
  return page.evaluate(async (siteUrl) => {
    const main = document.querySelector("#root main");
    if (!main) return null;
    const panel = main.querySelector("custom-elements") ?? main.querySelector('[role="tabpanel"]') ?? main;
    const wait = (ms) => new Promise((done) => setTimeout(done, ms));
    const showCode = async (container) => {
      const buttons = [...container.querySelectorAll("[data-canvas-toolbar] button")].filter((button) => button.textContent.trim() === "Show Code");
      for (const button of buttons) button.click();
      if (buttons.length) await wait(300);
    };
    const panelOf = (tablist) => {
      for (let group = tablist.parentElement; group && group !== panel.parentElement; group = group.parentElement) {
        const tabpanel = [...group.children].find((child) => child.matches('[role="tabpanel"]'));
        if (tabpanel) return tabpanel;
      }
      return null;
    };

    await showCode(panel);
    const tabGroups = [];
    for (const tablist of panel.querySelectorAll('[role="tablist"]')) {
      const tabpanel = panelOf(tablist);
      if (!tabpanel) continue;
      const tabs = [];
      for (const tab of tablist.querySelectorAll('[role="tab"]')) {
        tab.click();
        await wait(100);
        await showCode(tabpanel);
        tabs.push({ label: tab.textContent.trim(), html: tabpanel.innerHTML });
      }
      tablist.dataset.llmsTabs = String(tabGroups.push(tabs) - 1);
    }

    // CodeMirror draws only the lines near the screen: the example's code comes from its editor's
    // state, found from its content element (cmTile in CodeMirror 6.4x, cmView before).
    const content = panel.querySelector(".cm-content");
    const view = content?.cmTile?.root?.view ?? content?.cmView?.rootView?.view;
    const example = view?.state.doc.toString() ?? [...panel.querySelectorAll(".cm-content .cm-line")].map((line) => line.textContent).join("\n");
    const props = [];
    const propsList = panel.querySelector("[data-props-list]");
    if (propsList) {
      const walker = document.createTreeWalker(propsList, NodeFilter.SHOW_ELEMENT);
      for (let element = walker.nextNode(); element; element = walker.nextNode()) {
        if (element.tagName === "H3") props.push({ title: element.textContent.trim(), rows: [] });
        if (element.tagName !== "PRE" || !props.length) continue;
        let cell = element;
        while (cell.parentElement !== propsList && cell.parentElement.children.length < 3) cell = cell.parentElement;
        const [nameCell, typeCell, descriptionCell] = cell.parentElement.children;
        props.at(-1).rows.push({
          name: element.textContent.trim(),
          required: [...nameCell.querySelectorAll("span")].some((span) => span.textContent.trim() === "Required"),
          type: typeCell?.textContent.trim() ?? "",
          description: descriptionCell?.textContent.trim() ?? "",
        });
      }
    }

    const copy = panel.cloneNode(true);
    for (const tablist of copy.querySelectorAll("[data-llms-tabs]")) {
      const tabpanel = panelOf(tablist);
      tabpanel?.replaceChildren(
        ...tabGroups[tablist.dataset.llmsTabs].flatMap(({ label, html }) => {
          const heading = document.createElement("p");
          heading.append(document.createElement("strong"));
          heading.firstChild.textContent = label;
          const template = document.createElement("template");
          template.innerHTML = html;
          return [heading, template.content];
        }),
      );
    }
    for (const toolbar of copy.querySelectorAll("[data-canvas-toolbar]")) {
      for (const child of [...toolbar.parentElement.children]) child.remove();
    }
    for (const frame of copy.querySelectorAll("iframe")) {
      const src = frame.getAttribute("src") ?? "";
      const figma = src.startsWith("https://www.figma.com/embed") ? new URL(src).searchParams.get("url") : null;
      if (!figma) {
        frame.remove();
        continue;
      }
      const link = document.createElement("a");
      link.href = figma;
      link.textContent = "Figma design";
      const paragraph = document.createElement("p");
      paragraph.append(link);
      frame.replaceWith(paragraph);
    }
    // A list's items can be buttons or links around a heading and text (Atlantis's List): their
    // content stays, a link on its heading.
    const BLOCKS = "h1, h2, h3, h4, h5, h6, p, ul, ol, pre, table";
    for (const link of copy.querySelectorAll(`a:has(${BLOCKS})`)) {
      const target = link.querySelector("h1, h2, h3, h4, h5, h6, p");
      if (target) {
        const inner = document.createElement("a");
        inner.setAttribute("href", link.getAttribute("href") ?? "");
        inner.append(...target.childNodes);
        target.append(inner);
      }
      link.replaceWith(...link.childNodes);
    }
    for (const button of copy.querySelectorAll(`button:has(${BLOCKS})`)) button.replaceWith(...button.childNodes);
    // A choice (the pull request title generator's) as the list of its options: value, then label.
    for (const select of copy.querySelectorAll("select")) {
      const list = document.createElement("ul");
      for (const option of select.querySelectorAll("option")) {
        const label = option.textContent.trim();
        const value = option.getAttribute("value") ?? label;
        if (/^-*$/.test(label)) continue;
        const item = document.createElement("li");
        if (value !== label) item.append(Object.assign(document.createElement("code"), { textContent: value }), ": ");
        item.append(label);
        list.append(item);
      }
      select.replaceWith(list);
    }
    for (const element of copy.querySelectorAll(
      "button, input, select, textarea, label, svg, style, script, [data-props-list], .cm-editor, [role=tablist], [aria-hidden=true]",
    )) {
      element.remove();
    }
    const absolute = (url) => {
      try {
        const resolved = new URL(url, location.href);
        return resolved.origin === location.origin ? siteUrl + resolved.pathname + resolved.search + resolved.hash : resolved.href;
      } catch {
        return url;
      }
    };
    for (const link of copy.querySelectorAll("a[href]")) link.setAttribute("href", absolute(link.getAttribute("href")));
    for (const image of copy.querySelectorAll("img[src]")) image.setAttribute("src", absolute(image.getAttribute("src")));

    const firstParagraph = [...copy.querySelectorAll("p")].map((p) => p.textContent.replace(/\s+/g, " ").trim()).find((text) => text.length > 30);
    return {
      title: document.title.replace(/ - Atlantis$/, "").trim() || (main.querySelector("h1")?.textContent.trim() ?? ""),
      description: firstParagraph ?? "",
      html: copy.innerHTML,
      example,
      props,
    };
  }, siteUrl);
}

const codeSpan = (text) => (text.includes("`") ? `\`\` ${text} \`\`` : `\`${text}\``);

const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "_",
}).use(gfm);
// An underscore inside a word (UNSAFE_className) cannot start emphasis: left unescaped.
turndown.escape = (text) => TurndownService.prototype.escape.call(turndown, text).replace(/(?<=[A-Za-z0-9])\\_(?=[A-Za-z0-9])/g, "_");
// A heading on one line, whatever blocks are in it (MDX puts text on its own line in a <p>, as in
// a <Heading> written over three lines).
turndown.addRule("heading", {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: (content, node) => `\n\n${"#".repeat(Number(node.nodeName.charAt(1)))} ${content.trim().replace(/\s*\n\s*/g, " ")}\n\n`,
});
// "- item" and "1. item", with the item's other lines indented to match.
turndown.addRule("listItem", {
  filter: "li",
  replacement(content, node, options) {
    const parent = node.parentNode;
    const prefix =
      parent.nodeName === "OL"
        ? `${Number(parent.getAttribute("start") || 1) + Array.prototype.indexOf.call(parent.children, node)}. `
        : `${options.bulletListMarker} `;
    const text = content.replace(/^\n+|\n+$/g, "") + (/\n$/.test(content) ? "\n" : "");
    return prefix + text.replace(/\n/g, `\n${" ".repeat(prefix.length)}`) + (node.nextSibling ? "\n" : "");
  },
});
// A <pre> without <code>, as the site shows a color token's name: code, inline when one line long.
turndown.addRule("preformatted", {
  filter: (node) => node.nodeName === "PRE" && !node.querySelector("code"),
  replacement(_content, node) {
    const text = node.textContent.replace(/\n$/, "");
    return text.includes("\n") ? `\n\n\`\`\`\n${text}\n\`\`\`\n\n` : `\n\n${codeSpan(text)}\n\n`;
  },
});
// A table cell on one line, whatever blocks are in it (a token's name, an empty swatch), and its
// pipes escaped: a row of a Markdown table cannot break.
turndown.addRule("tableCell", {
  filter: ["th", "td"],
  replacement(content, node) {
    const first = Array.prototype.indexOf.call(node.parentNode.childNodes, node) === 0;
    return `${first ? "| " : " "}${content.trim().replace(/\s*\n\s*/g, " ").replace(/\|/g, "\\|")} |`;
  },
});

const toMarkdown = (html) =>
  turndown
    .turndown(html)
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

// Headings one level down (## becomes ###), fenced code left as it is.
function nest(markdown) {
  let fenced = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^(```|~~~)/.test(line)) fenced = !fenced;
      return !fenced && /^#{1,5} /.test(line) ? `#${line}` : line;
    })
    .join("\n");
}

// A document's opening sentence, for its line in llms.txt.
function summary(text) {
  const sentence = /^.*?[.!?](?=\s|$)/.exec(text)?.[0] ?? text;
  return sentence.length > 200 ? `${sentence.slice(0, 197).trimEnd()}...` : sentence;
}

function propsMarkdown(lists) {
  return lists
    .map(({ title, rows }) => {
      const items = rows.map(({ name, required, type, description }) => {
        const details = [type && codeSpan(type.replace(/\s+/g, " ")), required && "required"].filter(Boolean).join(", ");
        const text = description.replace(/\s+/g, " ").trim();
        return `- ${codeSpan(name)}${details ? ` (${details})` : ""}${text ? `: ${text}` : ""}`;
      });
      return `#### ${title.replace(/ properties$/, "")}\n\n${items.join("\n")}`;
    })
    .join("\n\n");
}

function platformMarkdown(label, tab) {
  if (!tab) return "";
  const parts = [];
  if (tab.example.trim()) parts.push(`### Example\n\n\`\`\`tsx\n${tab.example.trim()}\n\`\`\``);
  if (tab.props.length) parts.push(`### Props\n\n${propsMarkdown(tab.props)}`);
  return parts.length ? `## ${label}\n\n${parts.join("\n\n")}` : "";
}

// Writes each document's Markdown, /llms.txt and /llms-full.txt, and returns how many documents
// there are. `documents` maps each page read, in the navigation's order, to what readDocument
// returned for it; a component's Web, Mobile and Implement tabs join its own document.
export function writeLlms(dist, siteUrl, documents) {
  const entries = [];
  for (const [path, document] of documents) {
    const [, section, name, tab] = path.split("/");
    if (!document || SKIPPED_PAGES.has(path) || (section === "components" && tab)) continue;
    let markdown = toMarkdown(document.html);
    if (!markdown.startsWith("# ")) markdown = `# ${document.title}\n\n${markdown}`;
    if (section === "components") {
      const implement = documents.get(`${path}/implement`);
      markdown = [
        markdown,
        implement && `## Implementation\n\n${nest(toMarkdown(implement.html))}`,
        platformMarkdown("Web", documents.get(`${path}/web`)),
        platformMarkdown("Mobile", documents.get(`${path}/mobile`)),
      ]
        .filter(Boolean)
        .join("\n\n");
    }
    const file = `${path}.md`;
    mkdirSync(dirname(join(dist, file)), { recursive: true });
    writeFileSync(join(dist, file), `${markdown}\n`);
    entries.push({
      section: SECTIONS[section] ?? "Other",
      title: document.title || name,
      page: `${siteUrl}${path}`,
      url: `${siteUrl}${file}`,
      description: summary(document.description),
      markdown,
    });
  }

  const sections = [...new Set(entries.map((entry) => entry.section))];
  const index = [
    "# Atlantis",
    SUMMARY,
    `These are the docs of ${siteUrl}, a replica of Atlantis's own site, https://atlantis.getjobber.com. Each page below links to its Markdown; a component's has its design guidance, its implementation notes, and the example and props for web and mobile. Every page in one file: [llms-full.txt](${siteUrl}/llms-full.txt).`,
    ...sections.map(
      (section) =>
        `## ${section}\n\n${entries
          .filter((entry) => entry.section === section)
          .map((entry) => `- [${entry.title}](${entry.url})${entry.description ? `: ${entry.description}` : ""}`)
          .join("\n")}`,
    ),
  ].join("\n\n");
  writeFileSync(join(dist, "llms.txt"), `${index}\n`);
  // Each document with its page's address under its title.
  const full = entries.map(({ markdown, page }) => markdown.replace(/^(# .*)\n/, `$1\n\nSource: ${page}\n`));
  writeFileSync(join(dist, "llms-full.txt"), `# Atlantis\n\n${SUMMARY}\n\n---\n\n${full.join("\n\n---\n\n")}\n`);
  return entries.length;
}
