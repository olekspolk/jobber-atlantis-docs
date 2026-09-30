# overlay-frame

An iframe whose document can open overlays — menus, popovers, tooltips, dialogs, drawers — larger
than the frame, or squeezed to fit it. While one is open, the frame grows **over** the page (its
document is transparent, so only the overlay shows): downwards, and sideways as far as the page
has room; the page layout keeps the frame's resting size, so nothing around it moves. When the
overlay closes, the frame goes back to its resting size. A press anywhere on the page closes the
overlay, as if the content were not in an iframe.

No dependencies. The core is framework-agnostic; `react.tsx` is a thin React layer on top.

```
guest.ts     runs inside the framed document: measures overlays, asks for a size, keeps the painted
             example still while the frame grows, replays presses from the page as outside presses
host.ts      runs in the embedding page: applies the size over a slot that holds the layout and
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

Without React: put the iframe (absolutely positioned, `left: 0`, `width: 100%`) inside a
`position: relative` wrapper and call `const detach = attachOverlayFrameHost(iframe, { slot: wrapper })`.

**3. Stacking** — choose `expandedZIndex` above the page content that follows the frame and below
the page's own modals, tooltips and toasts. The Atlantis docs use `calc(var(--elevation-modal) - 1)`.

## Options

| Guest (`overlayFrameGuestScript` / `overlayFrameGuest`) | Default | |
|---|---|---|
| `rootSelector` | `"#root"` | Element the content renders into; everything else in `<body>` is an overlay, and so is what the content positions out of its flow |
| `gap` | `16` | Room kept around an overlay the frame grows for, px |
| `maxRequestsPerSecond` | `12` | Bounds an overlay that keeps resizing as the frame does; a held-back request is sent once the limit allows |
| `hostOrigin` | parent's origin | Origin of the page, for the `postMessage` fallback (cross-origin frames). By default the parent's origin as the browser reports it (`location.ancestorOrigins`), else the frame's own — set it where the browser does not report it |

| Host (`attachOverlayFrameHost` / `<OverlayFrame>`) | Default | |
|---|---|---|
| `slot` | — | Wrapper that holds the resting size (created by `<OverlayFrame>`) |
| `maxViewportFraction` | `0.9` | Largest height, as a fraction of the window height |
| `maxHeight` | — | Largest height, in px; whichever of the two is lower applies |
| `expandedZIndex` | `"1000"` | z-index while expanded |
| `dismissOnOutsidePress` | `true` | Report presses on the page to the guest (see below) |
| `guestOrigin` | page origin | Origin used for the `postMessage` fallback |

## What it guarantees

- Overlays are found wherever they render: next to the root (a portal into `<body>`, as Floating
  UI, Base UI, Radix and MUI do), or inside it, positioned out of the content's flow — fixed, or
  hanging below or above the box it is positioned against, like a dropdown drawn under its trigger.
- The first painted frame after an overlay opens already shows the overlay in full. When guest and
  host are same-origin, the guest calls the host synchronously from a `requestAnimationFrame` callback,
  so the new size is laid out before that frame is painted (`postMessage` would land a frame late
  and flash the cut-off overlay; it remains the cross-origin fallback).
- An overlay cut off at a side of the frame gets the frame reaching that much further on that side,
  as far as the page's visible area goes (the window, and every ancestor that clips or scrolls), so
  it is cut off no more than the page itself would cut it off. One laid out against the whole
  viewport (a full-screen viewer, a dialog on its backdrop) gets the page's whole width, as it would
  in a window. The host answers each request with how far it extended the frame; the frame reaching
  out to the left moves its viewport left on the page, so the pinned example moves right by as much.
- The example does not move while the frame is larger: the root is pinned at its painted position
  and size, measured with the resting page's scrollbars and no others (a classic scrollbar the
  overlay makes appear would shift centred content by half its width; a horizontal one the resting
  page had, under an example wider than the frame, would by half its height once gone), a resting
  scrollbar gutter is kept, and a scroll the opening caused (e.g. `scrollIntoView` of a selected
  option) is undone. All of this happens before the first paint.
- Positioning libraries hear about the new viewport right away (a `resize` event; Floating UI's
  `autoUpdate` listens for it), and the re-placed overlay is measured again within the same frame.
- An overlay the frame squeezes rather than cuts off gets the room it would have in the window. A
  dropdown sized to the room below its trigger (Floating UI's `size`, Base UI's available height)
  scrolls in an area that ends at the frame's edge: the frame grows by what that area hides. A panel
  exactly as tall as the frame (a side drawer) gets all the room there is, and so does one that fills
  the whole frame and scrolls part of its content (the same drawer in a phone's narrow preview). The
  room stays while the overlay is open, so the frame does not shrink back into squeezing it.
- An overlay laid out against the viewport (a full-screen viewer, a layer sized in `vh`), whose
  bottom moves down as far as the frame grows, gets all the room there is at once instead of
  creeping towards it. All the room there is ends 16px above the window's bottom, so it stays in
  view; it opens at that size and keeps it.
- A press on the page outside the frame closes the guest's overlays, like a press outside an overlay
  on a normal page. That press never reaches the framed document, so the host reports it (capture
  phase, so the page stopping propagation does not hide it) and the guest replays it as
  `pointerdown`/`mousedown`/`pointerup`/`mouseup`/`click` on its `<body>` — outside every overlay —
  which is what Floating UI's `useDismiss`, Base UI, Radix and MUI's `ClickAwayListener` listen for.
  The page still gets its press (focus stays where the user clicked), and it only happens while
  something floats.
- Documents without overlays are never touched. The resting height follows the embedder and the
  user's resize handle, which is hidden while expanded. A frame hidden with `display: none` (behind
  an inactive tab) keeps its slot's size, and shows again at it.
- Hosts can come and go. A detached host leaves the frame at its resting size; a host that
  attaches — late, or again while an overlay is open (as when `<OverlayFrame>`'s options change) —
  asks the guest to repeat the size it needs (`sync`). Same-origin, the frame is back at that
  size before its collapsed size is ever laid out.

## Limits

- An overlay inside the root counts once it hangs out of the box it is positioned against, by more
  than `gap` and by at least half its height. One drawn over that box, or laid out in the flow, is
  taken for part of the content.
- While expanded, the transparent part of the frame receives pointer input: a click on covered page
  content dismisses the overlay (a second click reaches the page). Wheel scrolling reaches the page.
- A press inside another iframe on the page never reaches this page's document, so it does not
  close the overlay.
- A press on the page is replayed on the frame's `<body>`, where outside-press listeners watch. An
  overlay that closes only through a backdrop of its own (a side drawer's dimmed overlay) closes on
  a press on that backdrop inside the frame, or on Escape.
- An overlay taller than the window stops at `maxViewportFraction` (or `maxHeight`).
- The frame never grows upwards, and sideways it reaches no further than the page's visible area. An
  overlay placed beyond that stays cut off, as on a page that narrow: on a phone, a calendar aligned
  with a small trigger's edge, which its library flips but does not shift.
- Cross-origin, the frame's extension to the left reaches the guest by message, a frame late: for
  that frame, the example is shifted left by as much.
- A box exactly the size of the frame is taken for a backdrop and looked through, unless it scrolls
  part of its content. One larger than the frame is measured as an overlay.
- A squeezed overlay is recognised by a scroll area ending at the frame's edge, by spanning exactly
  its height, or by filling it and scrolling; one fitted to the frame another way keeps the size it
  was given.
