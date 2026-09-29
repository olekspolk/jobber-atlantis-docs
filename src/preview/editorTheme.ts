import { HighlightStyle } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

// Same look as the atlantis.getjobber.com editor: CodeMirror's default highlight style with the
// Atlantis token overrides the site applies to it (strings and numbers informative, comments invoice…).
export const atlantisPreviewCodeTheme = EditorView.theme(
  {
    "&": {
      color: "var(--color-text)",
      backgroundColor: "var(--color-surface--background)",
      border: "var(--border-base) solid var(--color-border)",
      borderRadius: "var(--radius-base)",
      padding: "var(--space-small)",
    },
    ".cm-content": {
      caretColor: "var(--color-interactive)",
    },
    ".cm-type": {
      color: "var(--color-text)",
    },
    "&.cm-focused": {
      outline: "transparent",
      boxShadow: "var(--shadow-focus)",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "var(--color-surface)",
    },
    ".cm-gutters": {
      backgroundColor: "inherit",
      color: "var(--color-text--secondary)",
      border: "none",
    },
  },
  { dark: true },
);

export const atlantisPreviewHighlightStyle = HighlightStyle.define([
  { tag: tags.meta, color: "#404740" },
  { tag: tags.link, textDecoration: "underline" },
  { tag: tags.heading, textDecoration: "underline", fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.keyword, color: "#708" },
  {
    tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
    color: "var(--color-quote)",
  },
  { tag: [tags.literal, tags.inserted], color: "var(--color-informative)" },
  { tag: [tags.string, tags.deleted], color: "var(--color-informative)" },
  {
    tag: [tags.regexp, tags.escape, tags.special(tags.string)],
    color: "var(--color-critical)",
  },
  { tag: tags.definition(tags.variableName), color: "#00f" },
  { tag: tags.local(tags.variableName), color: "var(--color-task)" },
  { tag: [tags.typeName, tags.namespace], color: "#085" },
  { tag: tags.className, color: "var(--color-interactive)" },
  { tag: [tags.special(tags.variableName), tags.macroName], color: "#256" },
  { tag: tags.definition(tags.propertyName), color: "#00c" },
  { tag: tags.comment, color: "var(--color-invoice)" },
  { tag: tags.invalid, color: "#f00" },
]);
