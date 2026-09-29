# Jobber Atlantis docs — FilterPicker

A local replica of the [FilterPicker page on atlantis.getjobber.com](https://atlantis.getjobber.com/components/FilterPicker)
— same layout, live code editor and iframe preview — with a fix for menus and popovers being cut
off by the preview iframe: they now extend past it over the page and close on a click anywhere on the
page, as if the example were not in an iframe at all.

```bash
npm install
npm run dev      # copies the FilterPicker docs, builds /editorBundle.js, starts Vite on http://localhost:5190
npm run verify   # scenario checks in headless Chrome (needs the dev server running)
npm run build    # typecheck + production build
```

## Structure

```
site.config.json     external links (Atlantis site, Storybook, GitHub source, Jobber fonts), dev port
src/overlay-frame/   the fix, as a standalone module (see its README) — no dependencies
src/preview/         the live preview, reproduced from the site's production bundle
src/layout/, pages/, components/, content/   the docs page around it
editor-bundle/       what live examples can use, built into /editorBundle.js
public/              the site's favicon (atlantis_favicon.svg); editorBundle.js is built here
scripts/             docs copy, iframe bundle build, verify.mjs
```

`{{name}}` placeholders in `index.html` and the preview templates are filled by `src/template.ts`
(for `index.html`, at build time through a small plugin in `vite.config.ts`).

### The preview (reproduced from atlantis.getjobber.com)

- `skeleton.html` — the iframe document, written with `document.open/write/close` as on the site,
  plus the overlay-frame guest script. `codeWrapper.js` — the module every edit runs in it (the
  site's `WebCodeWrapper`). `skeleton.ts` imports both as text (`?raw`) and fills their placeholders.
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
- `AtlantisPreviewViewer.tsx` — renders the preview as `<OverlayFrame>`.

Cosmetic differences: the Jobber Pro heading font is served only to Jobber's domains (Poppins is
Atlantis's fallback), the logo is a text stand-in, the navigation lists only FilterPicker, and the
preview does not link the site's `/tailwind.css` (the examples use no Tailwind classes).

## The fix

`src/overlay-frame` — how it works, how to integrate it into another codebase, options and limits
are in [its README](src/overlay-frame/README.md). Integration here is two lines: the skeleton adds
`overlayFrameGuestScript({ rootSelector: "#root" })`, and the viewer renders `<OverlayFrame>` with
`expandedZIndex="calc(var(--elevation-modal) - 1)"` (above CodeMirror's `z-index: 200` gutters,
below Atlantis modals, tooltips and toasts).

## Verification

`npm run verify` (31 checks) drives the page in headless Chrome with classic scrollbars: the page's
own example, filtering, quick open/close, a click and wheel over covered content, clicks on the page
outside the frame (including one on a button, which must keep focus), a resized and a
minimum-size preview (opened twice), a trigger near the bottom (menu flips), a tall example with a
scrollbar at rest, a menu that fits the frame, a modal-like layer (full-viewport backdrop), a syntax
error, tall static content, a layer sized in `vh`, a bare example with a `return` inside a callback,
an edit kept across a theme change, and an edit made while the preview is still loading (its
stylesheets held back). Its examples stay within the example scope. The resting position is read
once the example's web font has loaded (the first render can come before it, and the font
re-centres the example by a few px). The first painted frame after opening is captured with a
ResizeObserver (after layout, before paint).

The editor exposes `window.__previewEditor` in development builds only, for these checks.
