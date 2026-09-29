// Scenario checks in headless Chrome: overlays opened in the live preview must be fully visible from
// the first painted frame, without moving the example or the page. The FilterPicker page gets the
// full set of scenarios; the other components whose overlays the preview cuts off or squeezes, a check
// of their own example.
//
//   npm run dev                      # in another terminal
//   npm run verify                   # DOCS_URL=http://localhost:5191 npm run verify  for a dev server elsewhere
//   npm run verify -- InputDate Menu # only those components' checks
//
// Headless Chrome renders frames, so resize events, requestAnimationFrame and Floating UI's
// autoUpdate behave as in a visible tab. Puppeteer hides scrollbars by default; they are shown here
// because a classic scrollbar (desktop Chrome with a mouse) takes layout width.
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import puppeteer from "puppeteer-core";
import site from "../site.config.json" with { type: "json" };

const BASE = process.env.DOCS_URL ?? `http://localhost:${site.devServerPort}`;
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WINDOW = { width: 1440, height: 900 };
const RESTING = 260;
const CAP = Math.round(WINDOW.height * 0.9);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const LABELS = ["Bilbo Baggins", "Frodo Baggins", "Pippin Took", "Merry Brandybuck", "Sam Gamgee", "Aragorn"];

// Variations of the FilterPicker page's own example.
const picker = (wrapperStyle, count = LABELS.length) => `const [selected, setSelected] = useState([]);

  return (
    <div style={{ ${wrapperStyle} }}>
      <FilterPicker label="Teammates" selected={selected} onSelect={setSelected}>
${LABELS.slice(0, count)
  .map((label, i) => `        <FilterPicker.Option id="${i + 1}" label="${label}" />`)
  .join("\n")}
      </FilterPicker>
    </div>
  );`;

const EXAMPLES = {
  // Trigger near the bottom of the preview: Floating UI flips the menu above it.
  flipUp: picker("paddingTop: 170"),
  // Taller than the preview, so the resting page already has a scrollbar.
  tallWithPicker: picker('height: 420, paddingTop: 250, boxSizing: "border-box"'),
  // Two options, trigger at the top: the menu fits inside the resting frame.
  fitsPicker: picker('marginBottom: "auto"', 2),
  // A modal-like layer: a full-viewport backdrop around a panel taller than the preview.
  modalLayer: `const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    const backdrop = document.createElement("div");
    backdrop.style.cssText = "position:fixed;inset:0;display:flex;align-items:center;justify-content:center";
    backdrop.innerHTML = '<div style="width:320px;height:480px;background:var(--color-surface)"></div>';
    document.body.appendChild(backdrop);
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      backdrop.remove();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <Button label="Open" onClick={() => setOpen(true)} />;`,
  // A layer that grows with the frame can never fit; the frame must stop growing.
  viewportLayer: `React.useEffect(() => {
    const layer = document.createElement("div");
    layer.style.cssText = "position:absolute;top:10px;left:10px;width:120px;height:calc(100vh + 40px)";
    document.body.appendChild(layer);
    return () => layer.remove();
  }, []);

  return <p>A layer sized in vh, next to #root</p>;`,
  // A list sized to the room below it, as positioning libraries size a dropdown: in the resting frame
  // it shows 90px of its 400px and scrolls.
  squeezedList: `React.useEffect(() => {
    const list = document.createElement("div");
    list.innerHTML = '<div style="height:400px"></div>';
    const place = () => {
      list.style.cssText = "position:fixed;top:150px;left:10px;width:200px;overflow:auto;max-height:" + (innerHeight - 170) + "px";
    };
    place();
    addEventListener("resize", place);
    document.body.appendChild(list);
    return () => {
      removeEventListener("resize", place);
      list.remove();
    };
  }, []);

  return <p>A list sized to the room below it</p>;`,
  // A panel exactly as tall as the viewport, like a side drawer.
  drawer: `React.useEffect(() => {
    const panel = document.createElement("div");
    panel.style.cssText = "position:fixed;top:0;right:0;width:200px;height:100%;background:var(--color-surface)";
    document.body.appendChild(panel);
    return () => panel.remove();
  }, []);

  return <p>A panel as tall as the viewport</p>;`,
  syntaxError: `return (
    <div>`,
  staticTall: `return (
    <div style={{ height: 400, width: 300, background: "var(--color-surface--background)" }}>
      Tall static content
    </div>
  );`,
  // A bare expression with a line starting with `return` inside a callback: still a bare expression.
  nestedReturn: `<Button
    label="Nested return"
    onClick={() => {
      return null;
    }}
  />`,
  edited: `<Button label="Edited example" />`,
  editedWhileLoading: `<Button label="Edited while loading" />`,
};

// Installed in the docs page: reads the preview frame and drives the editor.
function installHarness() {
  const frame = () => document.querySelector("iframe");
  const doc = () => frame().contentDocument;
  const win = () => frame().contentWindow;
  // A control by its label, aria-label or placeholder, or by its tag ("<input>", "<img>").
  const find = (source) =>
    [...doc().querySelectorAll("button, [role=button], [role=combobox], input, img")].find((el) =>
      new RegExp(source).test(
        `${el.innerText || ""} ${el.getAttribute("aria-label") || ""} ${el.getAttribute("placeholder") || ""} <${el.tagName.toLowerCase()}>`,
      ),
    );
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { left: Math.round(r.left), top: Math.round(r.top) };
  };
  // Same notion of "layer" as the guest: rendered next to #root, not a full-viewport wrapper.
  const layerElements = () => {
    const out = [];
    const visit = (el, depth) => {
      const style = win().getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      const full = r.width >= win().innerWidth - 1 && r.height >= win().innerHeight - 1;
      if (r.width > 2 && r.height > 2 && !full) return void out.push(el);
      if ((r.width > 0 && r.width <= 2) || (r.height > 0 && r.height <= 2) || depth >= 5) return;
      [...el.children].forEach((child) => visit(child, depth + 1));
    };
    [...doc().body.children]
      .filter((el) => el.id !== "root" && !["SCRIPT", "STYLE"].includes(el.tagName))
      .forEach((el) => visit(el, 0));
    return out;
  };
  const layerBoxes = () => layerElements().map((el) => el.getBoundingClientRect());
  // Scroll areas in the layers that hide part of their content.
  const hiddenContent = () =>
    layerElements()
      .flatMap((el) => [el, ...el.querySelectorAll("*")])
      .filter((el) => el.scrollHeight > el.clientHeight + 1 && /(auto|scroll)/.test(win().getComputedStyle(el).overflowY));
  // Those of them ending at the viewport's edge: sized by the frame rather than by their own maximum.
  const squeezedContent = () =>
    hiddenContent().filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom >= win().innerHeight - 32 || r.top <= 32;
    });

  window.__verify = {
    setCode(code) {
      const view = window.__previewEditor;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } });
    },
    click(source) {
      find(source)?.click();
    },
    center(source) {
      const f = frame().getBoundingClientRect();
      const r = find(source).getBoundingClientRect();
      return { x: f.x + r.x + r.width / 2, y: f.y + r.y + r.height / 2 };
    },
    escape() {
      const target = doc().activeElement || doc().body;
      target.dispatchEvent(new (win().KeyboardEvent)("keydown", { key: "Escape", bubbles: true }));
    },
    trigger(source) {
      const el = find(source);
      return el ? box(el) : null;
    },
    // The control is laid out, and loaded if it is an image (thumbnails come from the network).
    ready(source) {
      const el = find(source);
      const r = el?.getBoundingClientRect();
      return Boolean(r && r.width > 0 && r.height > 0 && (el.tagName !== "IMG" || (el.complete && el.naturalWidth > 0)));
    },
    // The example's first render can come before its web font (Inter), which then widens the text
    // and re-centres the example by a few px: wait for the font and a frame laid out with it.
    async settled(source) {
      find(source).getBoundingClientRect(); // lays the text out, which starts loading its font
      await doc().fonts.ready;
      await new Promise((resolve) => win().requestAnimationFrame(() => win().requestAnimationFrame(resolve)));
    },
    resize(height) {
      frame().style.height = `${height}px`;
    },
    // The first rendering update that lays out the opened overlay. ResizeObserver callbacks run
    // after layout and before paint, so this is exactly what the first painted frame shows.
    openFirstFrame(source) {
      return new Promise((resolve) => {
        const mo = new (win().MutationObserver)(() => {
          const layer = doc().querySelector("[data-floating-ui-portal] > *");
          if (!layer) return;
          mo.disconnect();
          const ro = new (win().ResizeObserver)(() => {
            ro.disconnect();
            const r = layer.getBoundingClientRect();
            resolve({
              frame: Math.round(frame().getBoundingClientRect().height),
              clipped: r.top < -1 || r.bottom > win().innerHeight + 1,
              trigger: box(find(source)),
              menuLeft: Math.round(r.left),
            });
          });
          ro.observe(layer);
        });
        mo.observe(doc().body, { childList: true, subtree: true });
        find(source).click();
      });
    },
    openLayers() {
      return layerBoxes().length;
    },
    snap() {
      const layers = layerBoxes();
      return {
        frame: Math.round(frame().getBoundingClientRect().height),
        slot: Math.round(frame().parentElement.getBoundingClientRect().height),
        frozen: Boolean(doc().querySelector("style[data-overlay-frame]")),
        layers: layers.map((r) => [Math.round(r.top), Math.round(r.bottom)]),
        allVisible: layers.every((r) => r.top >= -1 && r.bottom <= win().innerHeight + 1),
        hidden: hiddenContent().length,
        squeezed: squeezedContent().length,
        top: Math.round(frame().getBoundingClientRect().top),
        scrollHeight: doc().documentElement.scrollHeight,
        tabsTop: Math.round(document.querySelector('[role="tablist"]').getBoundingClientRect().top),
        resize: frame().style.resize,
        zIndex: frame().style.zIndex,
        error: /Unexpected token|Unterminated|SyntaxError|Expected/.test(
          document.querySelector("[data-usage-tab]")?.innerText ?? "",
        ),
      };
    },
  };
}

async function run(browser) {
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.setViewport(WINDOW);
  await page.goto(`${BASE}/components/FilterPicker/web`, { waitUntil: "load" });
  await page.waitForFunction(() =>
    [...(document.querySelector("iframe")?.contentDocument?.querySelectorAll("button") ?? [])].some((b) =>
      /Teammates/.test(b.innerText),
    ),
  );
  await page.evaluate(installHarness);

  const call = (method, ...args) => page.evaluate((m, a) => window.__verify[m](...a), method, args);
  const snap = () => call("snap");
  const escape = async () => {
    await call("escape");
    await sleep(1200);
  };
  const load = async (code) => {
    await call("setCode", code);
    await sleep(1500);
  };
  const r = {};

  console.log("· the page's own example");
  await call("settled", "Teammates");
  r.rest = { ...(await snap()), trigger: await call("trigger", "Teammates") };
  r.first = await call("openFirstFrame", "Teammates");
  await sleep(1200);
  r.open = { ...(await snap()), trigger: await call("trigger", "Teammates") };
  await page.evaluate(() => {
    const input = document.querySelector("iframe").contentDocument.querySelector("input");
    const win = input.ownerDocument.defaultView;
    Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value").set.call(input, "Ba");
    input.dispatchEvent(new win.Event("input", { bubbles: true }));
  });
  await sleep(1200);
  r.filtered = await snap();
  await escape();
  r.closed = { ...(await snap()), trigger: await call("trigger", "Teammates") };
  for (let i = 0; i < 5; i++) {
    await call("click", "Teammates");
    await sleep(80);
    await call("escape");
    await sleep(80);
  }
  await sleep(1500);
  r.toggled = await snap();

  console.log("· page interaction while open");
  await call("click", "Teammates");
  await sleep(1500);
  const covered = await page.evaluate(() => {
    const slot = document.querySelector("iframe").parentElement.getBoundingClientRect();
    return { x: slot.x + 40, y: slot.bottom + 40 };
  });
  const scrollTop = () => page.evaluate(() => document.querySelector("[data-main-scroll]").scrollTop);
  const before = await scrollTop();
  await page.mouse.move(covered.x, covered.y);
  await page.mouse.wheel({ deltaY: 240 });
  await sleep(800);
  r.wheelScrolled = (await scrollTop()) - before;
  await page.evaluate(() => document.querySelector("[data-main-scroll]").scrollTo({ top: 0 }));
  await sleep(600);
  const tab = await page.evaluate(() => {
    const el = [...document.querySelectorAll('[role="tab"], button')].find((b) => b.innerText.trim() === "Design");
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  await page.mouse.click(tab.x, tab.y);
  await sleep(1200);
  r.coveredClick = { ...(await snap()), stayedOnWeb: page.url().endsWith("/web") };

  console.log("· presses on the page, outside the frame");
  const pagePoint = (selector) =>
    page.evaluate((sel) => {
      const rect = document.querySelector(sel).getBoundingClientRect();
      return { x: rect.x + 20, y: rect.y + rect.height / 2 };
    }, selector);
  await call("click", "Teammates");
  await sleep(1200);
  const heading = await pagePoint("h1");
  await page.mouse.click(heading.x, heading.y);
  await sleep(1200);
  r.outsideHeading = { ...(await snap()), open: await call("openLayers") };
  await call("click", "Teammates");
  await sleep(1200);
  const search = await pagePoint('button[aria-label="Search"]');
  await page.mouse.click(search.x, search.y);
  await sleep(1200);
  r.outsideButton = {
    ...(await snap()),
    open: await call("openLayers"),
    focus: await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? null),
  };

  console.log("· resized preview");
  await call("resize", 420);
  await sleep(600);
  await call("click", "Teammates");
  await sleep(1500);
  r.resizedOpen = await snap();
  await escape();
  r.resizedClosed = await snap();
  await call("resize", 150); // clamps to min-height: 200px
  await sleep(800);
  r.minRest = await call("trigger", "Teammates");
  r.minFirst = await call("openFirstFrame", "Teammates");
  await sleep(1200);
  await escape();
  r.minClosed = { ...(await snap()), trigger: await call("trigger", "Teammates") };
  r.minSecond = await call("openFirstFrame", "Teammates");
  await sleep(1200);
  await escape();
  await call("resize", RESTING);
  await sleep(600);

  console.log("· trigger near the bottom");
  await load(EXAMPLES.flipUp);
  r.flipRest = await call("trigger", "Teammates");
  r.flipFirst = await call("openFirstFrame", "Teammates");
  await sleep(1500);
  r.flipOpen = await snap();
  await escape();

  console.log("· tall example (scrollbar at rest)");
  await load(EXAMPLES.tallWithPicker);
  r.tallRest = {
    trigger: await call("trigger", "Teammates"),
    scrollbar: await page.evaluate(() => {
      const f = document.querySelector("iframe");
      return f.contentWindow.innerWidth - f.contentDocument.documentElement.clientWidth;
    }),
  };
  r.tallFirst = await call("openFirstFrame", "Teammates");
  await sleep(1200);
  await escape();
  r.tallClosed = { ...(await snap()), trigger: await call("trigger", "Teammates") };

  console.log("· a menu that fits the frame, a modal-like layer");
  await load(EXAMPLES.fitsPicker);
  await call("click", "Teammates");
  await sleep(1500);
  r.fitsOpen = await snap();
  const heading2 = await pagePoint("h1");
  await page.mouse.click(heading2.x, heading2.y);
  await sleep(1200);
  r.fitsOutside = { ...(await snap()), open: await call("openLayers") };
  await load(EXAMPLES.modalLayer);
  await call("click", "Open");
  await sleep(1500);
  r.modalOpen = await snap();
  await call("escape");
  await sleep(1500);
  r.modalClosed = await snap();

  console.log("· edge cases");
  await load(EXAMPLES.syntaxError);
  r.syntaxError = await snap();
  await load(EXAMPLES.staticTall);
  r.staticTall = await snap();
  await load(EXAMPLES.viewportLayer);
  await sleep(2500);
  r.vhA = await snap();
  await sleep(2500);
  r.vhB = await snap();
  await load(EXAMPLES.squeezedList);
  r.squeezed = await snap();
  await load(EXAMPLES.drawer);
  r.drawer = await snap();

  console.log("· editing: a nested return, a theme change");
  await load(EXAMPLES.nestedReturn);
  r.nestedReturn = await call("trigger", "Nested return");
  await load(EXAMPLES.edited);
  await page.click('button[aria-label="Switch to dark theme"]');
  await sleep(1500);
  r.themeChange = {
    ...(await page.evaluate(() => ({
      editor: window.__previewEditor.state.doc.toString(),
      theme: document.querySelector("iframe").contentDocument.documentElement.dataset.theme,
    }))),
    preview: await call("trigger", "Edited example"),
  };

  await page.close();
  return r;
}

// The preview's stylesheets are held back, so its skeleton is still loading when the example is
// edited: the edit must not be replaced by the page's example once the skeleton loads.
async function runLoadRace(browser) {
  console.log("· an edit made while the preview loads");
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  await page.setViewport(WINDOW);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.frame() !== page.mainFrame() && request.resourceType() === "stylesheet") {
      setTimeout(() => request.continue(), 1500);
    } else {
      request.continue();
    }
  });
  await page.goto(`${BASE}/components/FilterPicker/web`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(
    () => window.__previewEditor && document.querySelector("iframe")?.contentDocument?.documentElement.dataset.theme,
  );
  await page.evaluate(installHarness);
  const loading = await page.evaluate(() => document.querySelector("iframe").contentDocument.readyState !== "complete");
  await page.evaluate((code) => window.__verify.setCode(code), EXAMPLES.editedWhileLoading);
  await page.waitForFunction(() => document.querySelector("iframe").contentDocument.readyState === "complete");
  await sleep(1500);
  const result = {
    loading,
    edited: await page.evaluate(() => window.__verify.trigger("Edited while loading")),
    example: await page.evaluate(() => window.__verify.trigger("Teammates")),
  };
  await page.close();
  return result;
}

// The other components whose overlays the preview cuts off or squeezes, each with the control that
// opens its example's overlay. It closes on a press on the page outside the frame, or on Escape for a
// full-screen viewer, which covers the whole window on a normal page.
const COMPONENT_OVERLAYS = [
  { name: "InputDate", click: "<input>" },
  { name: "DatePicker", click: "Open Datepicker" },
  { name: "Gallery", click: "<img>", close: "Escape", maxHeight: 500 },
  { name: "LightBox", click: "Click me", close: "Escape", maxHeight: 500 },
  { name: "Menu", click: "More Actions" },
  { name: "Autocomplete", click: "<input>" },
  { name: "Combobox", click: "Search team members" },
  { name: "Select", click: "Active" },
  { name: "SelectPrimitive", click: "Select an option" },
  { name: "SideDrawer", click: "Open Side Drawer", close: "Escape" },
];

// A component's page as it loads: its example's overlay must open in full over the page, squeezed
// by nothing, keep its size once open, and close again.
async function runComponent(browser, { name, click, close }) {
  console.log(`· ${name}`);
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);
  page.on("dialog", (dialog) => dialog.dismiss());
  await page.setViewport(WINDOW);
  await page.goto(`${BASE}/components/${name}/web`, { waitUntil: "load" });
  await page.waitForFunction(() => document.querySelector("iframe")?.contentDocument?.getElementById("root")?.childElementCount);
  await page.evaluate(installHarness);
  const call = (method, ...args) => page.evaluate((m, a) => window.__verify[m](...a), method, args);
  await sleep(1500);
  const rest = await call("snap");
  await page.waitForFunction((source) => window.__verify.ready(source), {}, click);
  const control = await call("center", click);
  await page.mouse.click(control.x, control.y);
  await sleep(1500);
  const open = await call("snap");
  await sleep(2000);
  const later = await call("snap");
  if (close === "Escape") {
    await page.keyboard.press("Escape");
  } else {
    const heading = await page.evaluate(() => {
      const rect = document.querySelector("h1").getBoundingClientRect();
      return { x: rect.x + 20, y: rect.y + rect.height / 2 };
    });
    await page.mouse.click(heading.x, heading.y);
  }
  await sleep(1500);
  const closed = await call("snap");
  await page.close();
  return { rest, open, later, closed };
}

const componentCheck = ({ name, close, maxHeight = CAP }) => [
  `${name}: its example's overlay opens in full over the page (at most ${maxHeight}px), keeps its size, closes on ${close ?? "a press outside the frame"}`,
  (r) => {
    const { rest, open, later, closed } = r.components[name];
    return (
      rest.frame === RESTING &&
      open.layers.length > 0 &&
      open.allVisible &&
      open.squeezed === 0 &&
      open.frame > RESTING &&
      open.frame <= maxHeight &&
      open.slot === RESTING &&
      later.frame === open.frame &&
      closed.layers.length === 0 &&
      closed.frame === RESTING
    );
  },
];

const same = (a, b) => a.left === b.left && a.top === b.top;
// All the room there is: down to 16px above the window's bottom, within the cap.
const toWindowBottom = (snap) => Math.min(CAP, WINDOW.height - snap.top - 16);

const CHECKS = [
  ["first painted frame: menu not cut off", (r) => !r.first.clipped],
  ["first painted frame: example does not move (vertically or sideways)", (r) => same(r.first.trigger, r.rest.trigger)],
  ["first painted frame: menu aligned with its trigger", (r) => Math.abs(r.first.menuLeft - r.first.trigger.left) <= 1],
  ["open: menu fully visible", (r) => r.open.allVisible],
  ["open: frame grows over the page, layout keeps the resting height", (r) => r.open.frame > RESTING && r.open.slot === RESTING],
  ["open: frame grows only as far as the menu needs (its bottom + 16px), though its list scrolls", (r) => r.open.hidden > 0 && r.open.frame === Math.max(...r.open.layers.map(([, bottom]) => bottom)) + 16],
  ["open: content below does not move", (r) => r.open.tabsTop === r.rest.tabsTop],
  ["open: above page content, resize handle hidden", (r) => r.open.zIndex !== "" && r.open.resize === "none"],
  ["filtering the list: menu stays fully visible", (r) => r.filtered.allVisible],
  ["closed: back to rest, example where it was, handle back", (r) => r.closed.frame === RESTING && !r.closed.frozen && same(r.closed.trigger, r.rest.trigger) && r.closed.resize === "vertical"],
  ["open/close x5 quickly: settles at rest", (r) => r.toggled.frame === RESTING && !r.toggled.frozen],
  ["wheel over the covered area scrolls the page", (r) => r.wheelScrolled > 0],
  ["click on covered content: dismisses the menu, frame back to rest", (r) => r.coveredClick.layers.length === 0 && r.coveredClick.frame === RESTING],
  ["click on the page outside the frame: menu closes, frame back to rest", (r) => r.outsideHeading.open === 0 && r.outsideHeading.frame === RESTING && !r.outsideHeading.frozen],
  ["click on a page button outside the frame: menu closes, the button keeps focus", (r) => r.outsideButton.open === 0 && r.outsideButton.focus === "Search"],
  ["user-resized preview (420px): menu visible, returns to 420px", (r) => r.resizedOpen.allVisible && r.resizedOpen.slot === 420 && r.resizedClosed.frame === 420],
  ["minimum-size preview: first frame not cut off, example does not move", (r) => !r.minFirst.clipped && same(r.minFirst.trigger, r.minRest)],
  ["minimum-size preview: back to 200px, example where it was", (r) => r.minClosed.frame === 200 && same(r.minClosed.trigger, r.minRest)],
  ["minimum-size preview, second open: same as the first", (r) => !r.minSecond.clipped && same(r.minSecond.trigger, r.minRest)],
  ["trigger near the bottom: first frame not cut off, example does not move", (r) => !r.flipFirst.clipped && same(r.flipFirst.trigger, r.flipRest)],
  ["trigger near the bottom: menu fully visible", (r) => r.flipOpen.allVisible],
  ["tall example (scrollbar at rest): first frame not cut off, example does not move", (r) => r.tallRest.scrollbar > 0 && !r.tallFirst.clipped && same(r.tallFirst.trigger, r.tallRest.trigger)],
  ["tall example: example where it was after close", (r) => same(r.tallClosed.trigger, r.tallRest.trigger)],
  ["menu that fits the frame: visible, frame untouched", (r) => r.fitsOpen.layers.length > 0 && r.fitsOpen.allVisible && r.fitsOpen.frame === RESTING && !r.fitsOpen.frozen],
  ["menu that fits the frame: closes on a click outside the frame", (r) => r.fitsOutside.open === 0],
  ["modal-like layer: fully visible, frame back to rest after close", (r) => r.modalOpen.allVisible && r.modalOpen.frame > RESTING && r.modalClosed.frame === RESTING],
  ["syntax error: error shown, frame untouched", (r) => r.syntaxError.error && r.syntaxError.frame === RESTING],
  ["tall static content (no overlay): frame untouched", (r) => r.staticTall.frame === RESTING && !r.staticTall.frozen],
  ["layer sized in vh: gets all the room at once, down to the window's bottom, and keeps it", (r) => r.vhA.frame === r.vhB.frame && r.vhB.frame === toWindowBottom(r.vhB)],
  ["squeezed list (sized to the room below it): frame grows until it hides nothing", (r) => r.squeezed.frame > RESTING && r.squeezed.allVisible && r.squeezed.hidden === 0],
  ["panel as tall as the viewport (a side drawer): reaches down to the window's bottom", (r) => r.drawer.frame === toWindowBottom(r.drawer)],
  ["bare example with a return inside a callback: rendered", (r) => r.nestedReturn !== null],
  ["theme change: the edit stays in the editor and the preview, which follows the theme", (r) => r.themeChange.editor === EXAMPLES.edited && r.themeChange.preview !== null && r.themeChange.theme === "dark"],
  ["edit made while the preview loads: shown once it has loaded, not the page's example", (r) => r.loadRace.loading && r.loadRace.edited !== null && r.loadRace.example === null],
];

const profile = mkdtempSync(join(tmpdir(), "jobber-atlantis-docs-chrome-"));
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: profile,
  args: ["--no-first-run", "--no-default-browser-check", `--window-size=${WINDOW.width},${WINDOW.height}`],
  ignoreDefaultArgs: ["--hide-scrollbars"],
});

// Names given on the command line run only those components' checks.
const only = process.argv.slice(2);

try {
  const r = only.length ? {} : await run(browser);
  if (!only.length) r.loadRace = await runLoadRace(browser);
  r.components = {};
  for (const spec of COMPONENT_OVERLAYS.filter((spec) => !only.length || only.includes(spec.name))) {
    r.components[spec.name] = await runComponent(browser, spec);
  }
  const checks = [
    ...(only.length ? [] : CHECKS),
    ...COMPONENT_OVERLAYS.filter((spec) => spec.name in r.components).map(componentCheck),
  ];
  let failed = 0;
  console.log("");
  for (const [name, check] of checks) {
    const ok = Boolean(check(r));
    if (!ok) failed += 1;
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  }
  console.log("");
  if (!only.length) {
    console.log(`first painted frame: ${JSON.stringify(r.first)}   rest trigger: ${JSON.stringify(r.rest.trigger)}`);
    console.log(`open: frame ${r.open.frame}px, slot ${r.open.slot}px, menu ${JSON.stringify(r.open.layers)}`);
    console.log(`minimum size: ${JSON.stringify(r.minFirst)}   rest trigger: ${JSON.stringify(r.minRest)}`);
  }
  for (const [name, { rest, open, later, closed }] of Object.entries(r.components)) {
    console.log(`${name}: frame ${rest.frame} → ${open.frame}px open, ${later.frame}px 2s later (layers ${JSON.stringify(open.layers)}, ${open.squeezed} squeezed) → ${closed.frame}px closed`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} passed.`);
  process.exitCode = failed ? 1 : 0;
} finally {
  await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
