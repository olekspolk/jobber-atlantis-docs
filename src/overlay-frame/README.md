# overlay-frame

An iframe whose document can open overlays — menus, popovers, tooltips, dialogs — taller than the
frame. While one is open, the frame grows **over** the page (its document is transparent, so only the
overlay shows); the page layout keeps the frame's resting height, so nothing below it moves. When
the overlay closes, the frame goes back to its resting height. A press anywhere on the page closes
the overlay, as if the content were not in an iframe.

No dependencies. The core is framework-agnostic; `react.tsx` is a thin React layer on top.

```
guest.ts     runs inside the framed document: measures overlays, asks for height, keeps the painted
             example still while the frame grows, replays presses from the page as outside presses
host.ts      runs in the embedding page: applies the height over a slot that holds the layout and
             reports presses on the page
react.tsx    useOverlayFrame() / <OverlayFrame> for React
protocol.ts  the contract between the two (message types, synchronous host and guest globals)
```

## Integration

**1. Guest** — in the framed document, after the element your content renders into:

```ts
import { overlayFrameGuestScript } from "./overlay-frame";

const html = `…<div id="root"></div>${overlayFrameGuestScript({ rootSelector: "#root" })}…`;
```

If the framed document has its own bundle, call `overlayFrameGuest({ ...DEFAULT_GUEST_OPTIONS })`
from it instead. `overlayFrameGuestScript` serialises that same function with
`Function.prototype.toString`, which is why it is self-contained.

**2. Host** — in the page, instead of a bare `<iframe>`:

```tsx
<OverlayFrame ref={iframeRef} title="Preview" expandedZIndex="1000" style={{ minHeight: 200 }} />
```

Without React: put the iframe (absolutely positioned, `width: 100%`) inside a `position: relative`
wrapper and call `const detach = attachOverlayFrameHost(iframe, { slot: wrapper })`.

**3. Stacking** — choose `expandedZIndex` above the page content that follows the frame and below
the page's own modals, tooltips and toasts. The Atlantis docs use `calc(var(--elevation-modal) - 1)`.

## Options

| Guest (`overlayFrameGuestScript` / `overlayFrameGuest`) | Default | |
|---|---|---|
| `rootSelector` | `"#root"` | Element the content renders into; everything else in `<body>` is an overlay |
| `gap` | `16` | Room kept below an overlay, px |
| `maxRequestsPerSecond` | `12` | Bounds an overlay that grows with the frame (sized in `vh`); a held-back request is sent once the limit allows |
| `hostOrigin` | parent's origin | Origin of the page, for the `postMessage` fallback (cross-origin frames). By default the parent's origin as the browser reports it (`location.ancestorOrigins`), else the frame's own — set it where the browser does not report it |

| Host (`attachOverlayFrameHost` / `<OverlayFrame>`) | Default | |
|---|---|---|
| `slot` | — | Wrapper that holds the resting height (created by `<OverlayFrame>`) |
| `maxViewportFraction` | `0.9` | Largest height, as a fraction of the window height |
| `expandedZIndex` | `"1000"` | z-index while expanded |
| `dismissOnOutsidePress` | `true` | Report presses on the page to the guest (see below) |
| `guestOrigin` | page origin | Origin used for the `postMessage` fallback |

## What it guarantees

- The first painted frame after an overlay opens already shows the overlay in full. When guest and
  host are same-origin, the guest calls the host synchronously from a `requestAnimationFrame` callback,
  so the new height is laid out before that frame is painted (`postMessage` would land a frame late
  and flash the cut-off overlay; it remains the cross-origin fallback).
- The example does not move while the frame is taller: the root is pinned at its painted position
  and size, scrollbars are removed before measuring (a classic scrollbar would shift centred content
  by half its width), a resting scrollbar gutter is kept, and a scroll the opening caused (e.g.
  `scrollIntoView` of a selected option) is undone. All of this happens before the first paint.
- Positioning libraries hear about the new viewport right away (a `resize` event; Floating UI's
  `autoUpdate` listens for it), and the re-placed overlay is measured again within the same frame.
- A press on the page outside the frame closes the guest's overlays, like a press outside an overlay
  on a normal page. That press never reaches the framed document, so the host reports it (capture
  phase, so the page stopping propagation does not hide it) and the guest replays it as
  `pointerdown`/`mousedown`/`pointerup`/`mouseup`/`click` on its `<body>` — outside every overlay —
  which is what Floating UI's `useDismiss`, Base UI, Radix and MUI's `ClickAwayListener` listen for.
  The page still gets its press (focus stays where the user clicked), and it only happens while
  something floats.
- Documents without overlays are never touched. The resting height follows the embedder and the
  user's resize handle, which is hidden while expanded.
- Hosts can come and go. A detached host leaves the frame at its resting height; a host that
  attaches — late, or again while an overlay is open (as when `<OverlayFrame>`'s options change) —
  asks the guest to repeat the height it needs (`sync`). Same-origin, the frame is back at that
  height before its collapsed size is ever laid out.

## Limits

- Overlays must render next to the root (a portal into `<body>`, as Floating UI, Base UI, Radix and
  MUI do). One positioned inside the root is not measured.
- While expanded, the transparent part of the frame receives pointer input: a click on covered page
  content dismisses the overlay (a second click reaches the page). Wheel scrolling reaches the page.
- A press inside another iframe on the page never reaches this page's document, so it does not
  close the overlay.
- An overlay taller than the window stops at `maxViewportFraction`.
