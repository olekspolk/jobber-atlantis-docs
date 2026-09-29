import { indentWithTab } from "@codemirror/commands";
import { LRLanguage, LanguageSupport, syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { useEffect, useRef } from "react";
import { CopyCodeButton } from "../components/CopyCodeButton";
import { useAtlantisPreview } from "./AtlantisPreviewProvider";
import { atlantisPreviewCodeTheme, atlantisPreviewHighlightStyle } from "./editorTheme";
import { exampleParser } from "./skeleton";

const previewCodeLanguage = LRLanguage.define({
  name: "typescript",
  parser: exampleParser,
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
  },
});
const previewLanguageSupport = new LanguageSupport(previewCodeLanguage);

export const AtlantisPreviewEditor = () => {
  const { code, updateCode, error } = useAtlantisPreview();
  const editor = useRef<HTMLDivElement>(null);
  const editorView = useRef<EditorView | null>(null);

  // Push externally loaded code (the page's example) into the editor.
  useEffect(() => {
    const view = editorView.current;
    if (code && view && view.state.doc.toString() !== code) {
      view.dispatch(view.state.update({ changes: { from: 0, to: view.state.doc.length, insert: code } }));
    }
  }, [code]);

  useEffect(() => {
    if (editor.current && !editorView.current) {
      const startState = EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          atlantisPreviewCodeTheme,
          syntaxHighlighting(atlantisPreviewHighlightStyle),
          keymap.of([indentWithTab]),
          previewLanguageSupport,
          // Every edit re-transpiles and re-renders the preview, like the original (no debounce).
          EditorView.updateListener.of((update) => {
            if (update.docChanged) updateCode(update.state.doc.toString());
          }),
        ],
      });
      editorView.current = new EditorView({ state: startState, parent: editor.current });
      editorView.current.dispatch({});
    }
    return () => {
      editorView.current?.destroy();
      editorView.current = null;
    };
  }, []);

  return (
    <div>
      <div ref={editor} />
      <CopyCodeButton code={code} />
      {error}
    </div>
  );
};
