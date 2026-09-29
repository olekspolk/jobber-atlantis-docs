# Jobber Atlantis docs — FilterPicker

A local replica of the [FilterPicker page on atlantis.getjobber.com](https://atlantis.getjobber.com/components/FilterPicker)
— same layout, live code editor and iframe preview.

```bash
npm install
npm run dev      # copies the FilterPicker docs, builds /editorBundle.js, starts Vite on http://localhost:5190
npm run build    # typecheck + production build
```

## Structure

```
site.config.json     external links (Atlantis site, Storybook, GitHub source, Jobber fonts), dev port
src/preview/         the live preview, reproduced from the site's production bundle
src/layout/, pages/, components/, content/   the docs page around it
editor-bundle/       what live examples can use, built into /editorBundle.js
public/              the site's favicon (atlantis_favicon.svg); editorBundle.js is built here
scripts/             docs copy, iframe bundle build
```

`{{name}}` placeholders in `index.html` and the preview templates are filled by `src/template.ts`
(for `index.html`, at build time through a small plugin in `vite.config.ts`).

### The preview (reproduced from atlantis.getjobber.com)

- `skeleton.html` — the iframe document, written with `document.open/write/close` as on the site.
  `codeWrapper.js` — the module every edit runs in it (the site's `WebCodeWrapper`). `skeleton.ts`
  imports both as text (`?raw`) and fills their placeholders.
  The iframe is a separate document, so it links its own Atlantis CSS (components, design tokens,
  dark mode); `skeleton.ts` imports those files from the packages with `?url`, so Vite serves them in
  development and emits hashed copies in a build.
- Examples can use `FilterPicker`, `Button` and `useState` (plus `React`, which JSX compiles to):
  `editor-bundle/entry.ts` exports exactly that, and `codeWrapper.js` imports it. The site's bundle
  exposes every Atlantis component and hook.
- `AtlantisPreviewProvider.tsx` — the first update writes the skeleton and waits for `load`, sets the
  height to `body.scrollHeight + 60` (260px) with `resize: vertical`; every edit is transpiled with
  `@babel/standalone` 7.26.2 (`env` + `react` + `transform-typescript`) and posted to the iframe as
  `{ type: "updateCode" }` (an edit made before `load` replaces the module posted then). Theme
  changes post `{ type: "updateTheme" }`.
- `AtlantisPreviewEditor.tsx` — CodeMirror 6 with the site's extensions and theme, no debounce.
- `AtlantisPreviewViewer.tsx` — renders the preview iframe.

Cosmetic differences: the Jobber Pro heading font is served only to Jobber's domains (Poppins is
Atlantis's fallback), the logo is a text stand-in, the navigation lists only FilterPicker, and the
preview does not link the site's `/tailwind.css` (the examples use no Tailwind classes).

## Known issue

As on the site, menus and popovers opened in the preview are cut off by the iframe: the
FilterPicker menu is taller than the 260px preview.
