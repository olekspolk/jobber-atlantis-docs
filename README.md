# Jobber Atlantis docs, with overlays that escape the preview iframe

An improved replica of [atlantis.getjobber.com](https://atlantis.getjobber.com), the docs of
Jobber's Atlantis design system. On the original site, menus, dropdowns, date pickers and drawers
opened in a live example are cut off or squeezed by the preview iframe; here they extend over the
page and close on a click anywhere on it, as if the example were not in an iframe at all.

**Live:** [jobber-atlantis-docs.pages.dev](https://jobber-atlantis-docs.pages.dev)

![The DatePicker page before and after the fix: the calendar cut off at the bottom of the 260px preview, then opening in full over the page](docs/datepicker-before-after.png)

![The Select page before and after the fix: the list squeezed into the 260px preview, showing one option and scrolling, then opening in full over the page](docs/select-before-after.png)

## The fix

[`src/overlay-frame`](src/overlay-frame) is a standalone module with no dependencies. While an
overlay in the example does not fit the frame — cut off by it, or squeezed into it and scrolling —
the frame grows over the page (the layout keeps its resting height, so nothing below moves), the
example stays exactly where it was painted, and presses on the page are replayed in the frame, so
overlays close as they would without it. Design, options and limits are in
[its README](src/overlay-frame/README.md).

Integrating it takes two lines: the preview document ([`skeleton.ts`](src/preview/skeleton.ts)) adds
`overlayFrameGuestScript()`, and [`AtlantisPreviewViewer.tsx`](src/preview/AtlantisPreviewViewer.tsx)
renders `<OverlayFrame>` in place of the `<iframe>`.

## Run it

```bash
npm install
npm run dev                # http://localhost:5190
npm run verify             # scenario checks in headless Chrome, with the dev server running
npm run verify -- --phone  # the same in a phone-sized window, on the small-screen layout
npm run build              # typecheck + production build
```

`npm run verify` opens overlays in the live preview and checks that they are fully visible from the
first painted frame, that neither the example nor the page moves, and that a click outside closes
them — including resized previews, menus that flip, scrollbars, modal backdrops and edits.

## Deployment

Pushes to `main` build the site and deploy it to Cloudflare Pages
([workflow](.github/workflows/deploy.yml)); pull requests are only built. The workflow reads the
repository secrets `CLOUDFLARE_API_TOKEN` (a token with Account › Cloudflare Pages › Edit) and
`CLOUDFLARE_ACCOUNT_ID`.
