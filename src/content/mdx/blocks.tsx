// The Storybook-style blocks the site's documents use: a live example with its code (Canvas), a
// code sample (Source), a Figma embed, and Meta/Story, which only matter to Storybook.
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Card } from "@jobber/components/Card";
import { Children, type ReactElement, type ReactNode, isValidElement, useEffect, useMemo, useState } from "react";
import reactElementToJsxString from "react-element-to-jsx-string";
import { highlightAll } from "./prism";

// A component's name for its JSX: a function's own name, as on the site (bundler suffixes such as
// Text$1 dropped). A forwardRef or memo component is an object, named by its displayName or by the
// function it wraps (InputText's is InputTextInternal).
function getComponentName(type: unknown): string {
  const clean = (name: string) => name.replace(/[\d$]+/g, "");
  if (typeof type === "function") return clean(type.name || "Anonymous");
  const wrapper = type as { displayName?: string; render?: { name?: string }; type?: unknown } | null;
  if (wrapper?.displayName) return clean(wrapper.displayName);
  if (wrapper?.render?.name) return clean(wrapper.render.name).replace(/Internal$/, "");
  if (wrapper?.type) return getComponentName(wrapper.type);
  return "Anonymous";
}

// An example given as elements, written out as JSX. (The site prints a lone component with props
// as its function's source, Atlantis's own internals in its unminified bundle; examples that are
// components of their own pass their source as `code` instead.)
function getCodeSnippet(child: ReactNode) {
  if (!isValidElement(child)) return "";
  return reactElementToJsxString(child, {
    displayName: (element) => {
      const type = (element as ReactElement | undefined)?.type;
      return typeof type === "string" ? type : getComponentName(type);
    },
    // A function prop is written as the library's placeholder, which the minified build would
    // print minified.
    functionValue: () => "function noRefCheck() {}",
  });
}

// Source handed in (an example file): without its exports and blank lines.
const normalizeProvidedCode = (source: string) =>
  source
    .replace(/^export\s+(const|function)\s/gm, "$1 ")
    .replace(/^\s*\n/gm, "")
    .trim();

export const Canvas = ({ children, code: providedCode }: { children?: ReactNode; code?: string }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const code = useMemo(() => {
    if (providedCode) return normalizeProvidedCode(providedCode);
    return Children.toArray(children).map(getCodeSnippet).filter(Boolean).join("\n\n");
  }, [children, providedCode]);

  useEffect(() => {
    highlightAll();
  }, [codeVisible, code]);

  return (
    <Card>
      <Box padding="largest" direction="column" alignItems="start">
        {children}
        <div style={{ position: "absolute", bottom: "0", right: "0" }}>
          <Button
            type="tertiary"
            size="small"
            variation="subtle"
            label={codeVisible ? "Hide Code" : "Show Code"}
            onClick={() => setCodeVisible(!codeVisible)}
          />
        </div>
      </Box>
      {codeVisible && (
        <pre>
          <code className="language-javascript">{code}</code>
        </pre>
      )}
    </Card>
  );
};

export const Meta = (_props: { title?: string }) => null;

export const Story = ({ children }: { children?: ReactNode | (() => ReactNode) }) =>
  typeof children === "function" ? children() : children;

export const Source = ({ code }: { code: string }) => (
  <pre>
    <code className="language-tsx">{code}</code>
  </pre>
);

// Loaded as it nears the viewport: Figma's embed is heavy, and sets its cookies once it loads.
export const Figma = ({ url }: { url: string }) => (
  <iframe
    width="800"
    height="450"
    title="Figma design"
    loading="lazy"
    src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`}
    allowFullScreen
  />
);
