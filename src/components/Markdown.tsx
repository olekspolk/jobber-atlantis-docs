import { Banner } from "@jobber/components/Banner";
import { Children, type ReactNode, isValidElement } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { headingId } from "../content/parseDocs";

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((child) =>
      typeof child === "string"
        ? child
        : isValidElement<{ children?: ReactNode }>(child)
          ? textOf(child.props.children)
          : "",
    )
    .join("");

// "> **NOTICE:** …" in the package docs is a notice Banner on the site; drop the label, keep the <p>.
const stripNoticeLabel = (children: ReactNode): ReactNode =>
  Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    const [first, second, ...rest] = Children.toArray(child.props.children);
    if (isValidElement(first) && /^NOTICE:?$/.test(textOf(first).trim())) {
      return <p>{[typeof second === "string" ? second.replace(/^\s+/, "") : second, ...rest]}</p>;
    }
    return child;
  });

const components: Components = {
  h2: ({ children }) => <h2 id={headingId(textOf(children))}>{children}</h2>,
  blockquote: ({ children }) => {
    const isNotice = /^\s*NOTICE/.test(textOf(children));
    if (!isNotice) return <blockquote>{children}</blockquote>;
    return (
      <div className="mdx-banner">
        <Banner type="notice" dismissible={false}>
          {stripNoticeLabel(Children.toArray(children).filter((c) => isValidElement(c)))}
        </Banner>
      </div>
    );
  },
  // A table wider than the column (on a phone) scrolls sideways by itself, not the whole page.
  table: ({ children }) => (
    <div className="docs-mdx-table">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ),
};

export const Markdown = ({ source }: { source: string }) => (
  <div className="docs-mdx">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  </div>
);
