import stylesUrl from "@jobber/components/styles?url";
import darkModeUrl from "@jobber/design/dark.mode.css?url";
import foundationUrl from "@jobber/design/foundation.css?url";
import { parser } from "@lezer/javascript";
import site from "../../site.config.json";
import editorScope from "../generated/editor-scope.json?raw";
import { overlayFrameGuestScript } from "../overlay-frame";
import { fillTemplate } from "../template";
import codeWrapper from "./codeWrapper.js?raw";
import skeleton from "./skeleton.html?raw";

export type PreviewTheme = "light" | "dark";

// Everything /editorBundle.js exports, listed by scripts/build-editor-bundle.mjs.
const SCOPE = (JSON.parse(editorScope) as string[]).join(", ");

/**
 * The document written into the preview iframe with document.open/write/close: the
 * atlantis.getjobber.com skeleton plus the overlay-frame guest script, which lets menus and
 * popovers extend past the frame.
 */
export const skeletonHTML = (theme: PreviewTheme) =>
  fillTemplate(skeleton, {
    theme,
    fontsUrl: site.fontsUrl,
    stylesUrl,
    foundationUrl,
    darkModeUrl,
    overlayFrameGuest: overlayFrameGuestScript({ rootSelector: "#root" }),
  });

/** Turns the transpiled `function App(props){...}` into a module that renders it into #root. */
export const WebCodeWrapper = (transpiledCode: string) =>
  fillTemplate(codeWrapper, { scope: SCOPE, app: transpiledCode });

/** Parser for example code, shared with the editor. */
export const exampleParser = parser.configure({ dialect: "jsx ts" });

const NESTED_BODIES = new Set(["FunctionDeclaration", "ClassDeclaration"]);

/**
 * Example code may be a bare expression or a component body with its own `return`: one at statement
 * level, not inside an expression or a declared function (a callback's `return` does not count).
 */
export const getPreCode = (codeUp: string) => {
  let hasOwnReturn = false;
  exampleParser.parse(codeUp).iterate({
    enter: (node) => {
      if (hasOwnReturn || node.type.is("Expression") || NESTED_BODIES.has(node.name)) return false;
      if (node.name === "ReturnStatement") hasOwnReturn = true;
    },
  });
  return hasOwnReturn ? codeUp : `return (${codeUp.trim()})`;
};

export const EMPTY_IFRAME_HTML = "<html><head></head><body></body></html>";
