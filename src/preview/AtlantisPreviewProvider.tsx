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
import { EMPTY_IFRAME_HTML, type PreviewTheme, WebCodeWrapper, getPreCode, skeletonHTML } from "./skeleton";

interface AtlantisPreviewContextValue {
  readonly iframe: RefObject<HTMLIFrameElement | null>;
  readonly updateCode: (code: string, forceUpdate?: boolean) => void;
  readonly code: string;
  readonly error: string;
}

const AtlantisPreviewContext = createContext<AtlantisPreviewContextValue>({
  iframe: { current: null },
  updateCode: () => undefined,
  code: "",
  error: "",
});

export const useAtlantisPreview = () => useContext(AtlantisPreviewContext);

const postToFrame = (frame: HTMLIFrameElement, message: object) =>
  frame.contentWindow?.postMessage(message, window.location.origin);

// The module each frame posts once its skeleton has loaded. Updates made meanwhile replace it, so
// an edit made while the skeleton loads is not overwritten by the first module.
const pendingModules = new WeakMap<HTMLIFrameElement, string>();

// Same flow as atlantis.getjobber.com: the first update writes the skeleton and waits for "load",
// later updates only post the new module to the iframe.
const writeCodeToIFrame = (frame: HTMLIFrameElement, theme: PreviewTheme, transpiledCode: string) => {
  const code = WebCodeWrapper(transpiledCode);
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
  doc.write(skeletonHTML(theme));
  doc.close();
};

export const AtlantisPreviewProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useAtlantisTheme();
  const iframe = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const lastCode = useRef("");
  // Read when the skeleton is written, so that updateCode never changes: the page reloads its example
  // whenever updateCode changes, and the editor keeps the one it was created with.
  const currentTheme = useRef(theme);

  const updateCode = useCallback((codeUp: string, forceUpdate?: boolean) => {
    if (!forceUpdate && codeUp === lastCode.current) return;
    lastCode.current = codeUp;
    setCode(codeUp);
    try {
      const transpiledCode =
        Babel.transform(`function App(props){${getPreCode(codeUp)}}`, {
          presets: [["env", { modules: false }], "react"],
          plugins: [["transform-typescript", { isTSX: true, allExtensions: false }]],
        }).code ?? "";
      setError("");
      if (iframe.current) writeCodeToIFrame(iframe.current, currentTheme.current, transpiledCode);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  useEffect(() => {
    currentTheme.current = theme;
    if (iframe.current) postToFrame(iframe.current, { type: "updateTheme", theme });
  }, [theme]);

  return (
    <AtlantisPreviewContext.Provider value={{ iframe, updateCode, code, error }}>
      {children}
    </AtlantisPreviewContext.Provider>
  );
};
