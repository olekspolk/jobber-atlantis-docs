import stylesUrl from "@jobber/components/styles?url";
import darkModeUrl from "@jobber/design/dark.mode.css?url";
import foundationUrl from "@jobber/design/foundation.css?url";
import site from "../../site.config.json";
import editorScope from "../generated/editor-scope.json?raw";
import { overlayFrameGuestScript } from "../overlay-frame";
import { fillTemplate } from "../template";
import codeWrapper from "./codeWrapper.js?raw";
import mobileCodeWrapper from "./mobileCodeWrapper.js?raw";
import skeleton from "./skeleton.html?raw";

export type PreviewTheme = "light" | "dark";
export type PreviewPlatform = "web" | "mobile";

// What the example's imports resolve to: the web components (built from @jobber/components by
// scripts/build-editor-bundle.mjs), or the site's React Native build for mobile examples.
const IMPORTS: Record<PreviewPlatform, Record<string, string>> = {
  web: { "@jobber/components": "/editorBundle.js" },
  mobile: {
    "@jobber/hooks": "/editorMobileBundle.js",
    "@jobber/hooks/useIsMounted": "/editorMobileBundle.js",
    "@jobber/components-native": "/editorMobileBundle.js",
  },
};

// Everything /editorBundle.js exports, listed by scripts/build-editor-bundle.mjs.
const SCOPE = (JSON.parse(editorScope) as string[]).join(", ");

/**
 * The document written into the preview iframe with document.open/write/close: the
 * atlantis.getjobber.com skeleton plus the overlay-frame guest script, which lets menus and
 * popovers extend past the frame.
 */
export const skeletonHTML = (theme: PreviewTheme, platform: PreviewPlatform = "web") =>
  fillTemplate(skeleton, {
    theme,
    type: platform,
    imports: JSON.stringify(IMPORTS[platform]),
    fontsUrl: site.fontsUrl,
    stylesUrl,
    foundationUrl,
    darkModeUrl,
    overlayFrameGuest: overlayFrameGuestScript({ rootSelector: "#root" }),
  });

/** Turns the transpiled `function App(props){...}` into a module that renders it into #root. */
export const WebCodeWrapper = (transpiledCode: string) =>
  fillTemplate(codeWrapper, { scope: SCOPE, app: transpiledCode });

/** The same for a mobile example, inside the providers React Native components need. */
export const MobileCodeWrapper = (transpiledCode: string) => fillTemplate(mobileCodeWrapper, { app: transpiledCode });

export const EMPTY_IFRAME_HTML = "<html><head></head><body></body></html>";
