import * as Babel from "@babel/standalone";
import { useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";
import {
  type PropsWithChildren,
  type RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { type ComponentKind, getPlatformForComponentType } from "../site/componentTypes";
import {
  EMPTY_IFRAME_HTML,
  MobileCodeWrapper,
  type PreviewPlatform,
  type PreviewTheme,
  WebCodeWrapper,
  getPreCode,
  skeletonHTML,
} from "./skeleton";

interface AtlantisPreviewContextValue {
  readonly iframe: RefObject<HTMLIFrameElement | null>;
  readonly iframeMobile: RefObject<HTMLIFrameElement | null>;
  readonly updateCode: (code: string, forceUpdate?: boolean) => void;
  readonly code: string;
  readonly error: string;
  /** The example shown: the web component, its supported rewrite, or the mobile one. */
  readonly type: ComponentKind;
  readonly updateType: (type: ComponentKind) => void;
}

const AtlantisPreviewContext = createContext<AtlantisPreviewContextValue>({
  iframe: { current: null },
  iframeMobile: { current: null },
  updateCode: () => undefined,
  code: "",
  error: "",
  type: "web",
  updateType: () => undefined,
});

export const useAtlantisPreview = () => useContext(AtlantisPreviewContext);

const postToFrame = (frame: HTMLIFrameElement, message: object) =>
  frame.contentWindow?.postMessage(message, window.location.origin);

// The module each frame posts once its skeleton has loaded. Updates made meanwhile replace it, so
// an edit made while the skeleton loads is not overwritten by the first module.
const pendingModules = new WeakMap<HTMLIFrameElement, string>();

// Same flow as atlantis.getjobber.com: the first update writes the skeleton and waits for "load",
// later updates only post the new module to the iframe.
const writeCodeToIFrame = (frame: HTMLIFrameElement, theme: PreviewTheme, platform: PreviewPlatform, transpiledCode: string) => {
  const code = platform === "mobile" ? MobileCodeWrapper(transpiledCode) : WebCodeWrapper(transpiledCode);
  if (pendingModules.has(frame)) {
    pendingModules.set(frame, code);
    return;
  }
  const doc = frame.contentDocument;
  if (doc?.documentElement.outerHTML !== EMPTY_IFRAME_HTML) {
    postToFrame(frame, { type: "updateCode", code });
    return;
  }
  pendingModules.set(frame, code);
  frame.addEventListener(
    "load",
    () => {
      const body = frame.contentDocument?.body;
      if (body) {
        frame.style.height = `${body.scrollHeight + 60}px`;
        frame.style.resize = "vertical";
      }
      postToFrame(frame, { type: "updateCode", code: pendingModules.get(frame) });
      pendingModules.delete(frame);
    },
    { once: true },
  );
  doc.open();
  doc.write(skeletonHTML(theme, platform));
  doc.close();
};

export const AtlantisPreviewProvider = ({ children, initialType = "web" }: PropsWithChildren<{ initialType?: ComponentKind }>) => {
  const { theme } = useAtlantisTheme();
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState<ComponentKind>(initialType);
  const lastSignature = useRef("");
  // Read when the code is written rather than captured, so that updateCode never changes: the
  // editor keeps the one it was created with, across the Web and Mobile tabs.
  const currentType = useRef(initialType);
  const currentTheme = useRef(theme);

  const updateType = useCallback((next: ComponentKind) => {
    currentType.current = next;
    setType(next);
  }, []);

  const updateCode = useCallback((codeUp: string, forceUpdate?: boolean) => {
    const type = currentType.current;
    const signature = `${type}:${codeUp}`;
    if (!forceUpdate && signature === lastSignature.current) return;
    lastSignature.current = signature;
    setCode(codeUp);
    try {
      const transpiledCode =
        Babel.transform(`function App(props){${getPreCode(codeUp)}}`, {
          presets: [["env", { modules: false }], "react"],
          plugins: [["transform-typescript", { isTSX: true, allExtensions: false }]],
        }).code ?? "";
      setError("");
      const platform = getPlatformForComponentType(type);
      const frame = platform === "mobile" ? iframeMobile.current : iframe.current;
      if (frame) writeCodeToIFrame(frame, currentTheme.current, platform, transpiledCode);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    currentTheme.current = theme;
    for (const frame of [iframe.current, iframeMobile.current]) {
      if (frame) postToFrame(frame, { type: "updateTheme", theme });
    }
  }, [theme]);

  return (
    <AtlantisPreviewContext.Provider value={{ iframe, iframeMobile, updateCode, code, error, type, updateType }}>
      {children}
    </AtlantisPreviewContext.Provider>
  );
};
