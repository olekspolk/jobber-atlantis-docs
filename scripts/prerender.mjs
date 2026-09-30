// After `vite build`: each page of the site as an HTML file with its content already in it, taken
// from the built site rendered in headless Chrome, at a phone's width and at a desktop's. A visit
// paints that content at once and loads the app after; the app renders the page again out of sight
// and takes its place once the page is ready (src/main.tsx). Without Chrome (CHROME_PATH), this is
// skipped with a warning and pages render in the browser as before. The pages' documents are read
// as they are rendered, for /llms.txt and the pages' Markdown (scripts/llms.mjs).
//
//   node scripts/prerender.mjs
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import site from "../site.config.json" with { type: "json" };
import { SKIPPED_PAGES, readDocument, writeLlms } from "./llms.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const chrome = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((path) => path && existsSync(path));
if (!chrome) {
  console.warn("prerender: no Chrome found (set CHROME_PATH), so pages render in the browser only");
  process.exit(0);
}

// The phone layout is the site's below its medium breakpoint (768px), the desktop one from there on.
const WIDTHS = [
  { name: "narrow", viewport: { width: 412, height: 823, isMobile: true, hasTouch: true } },
  { name: "wide", viewport: { width: 1440, height: 900 } },
];
const TIMEOUT = 30000;
const PARALLEL = 6;

const template = readFileSync(join(dist, "index.html"), "utf8");
const entryScript = /<script type="module" crossorigin src="([^"]+)"><\/script>/.exec(template);
if (!entryScript) throw new Error("prerender: dist/index.html has no module script");

// dist/ as the site serves it: its files, and the app's index.html for every other address.
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
const server = createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, "http://localhost").pathname)).replace(/^(\.\.[/\\])+/, "");
  const file = join(dist, path);
  const found = existsSync(file) && statSync(file).isFile();
  response.writeHead(200, { "content-type": TYPES[extname(found ? file : "index.html")] ?? "application/octet-stream" });
  response.end(found ? readFileSync(file) : template);
});
await new Promise((listening) => server.listen(0, "127.0.0.1", listening));
const base = `http://127.0.0.1:${server.address().port}`;

// On CI (GitHub's runners may refuse Chrome its sandbox) it runs without one: it only opens the
// site's own build. A Chrome that does not start leaves the pages to render in the browser.
let browser;
try {
  browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ["--no-first-run", ...(process.env.CI ? ["--no-sandbox"] : [])],
  });
} catch (error) {
  console.warn(`prerender: Chrome did not start (${error.message.split("\n")[0]}), so pages render in the browser only`);
  server.close();
  process.exit(0);
}

// Once the page says it is ready (src/site/pageReady.ts) and what follows its render has settled
// (code highlighting, layouts measured a frame later): #root's HTML, without its ids (a link to
// #heading or a label's for="" must find the live page's element), editable text (what is typed
// into the snapshot would be lost) or its frames' pages (an embed loads once, in the live page), the
// styles its code added to the head, and the site's pages it links to, its component tabs among them.
async function capture(page, path, viewport) {
  await page.setViewport(viewport);
  await page.goto(base + path, { waitUntil: "load", timeout: TIMEOUT });
  await page.waitForFunction(() => window.__pageReady === true, { polling: 100, timeout: TIMEOUT });
  await new Promise((settled) => setTimeout(settled, 500));
  return page.evaluate(async () => {
    await document.fonts.ready;
    const root = document.getElementById("root");
    const copy = root.cloneNode(true);
    for (const element of copy.querySelectorAll("[id]")) element.removeAttribute("id");
    for (const element of copy.querySelectorAll("[contenteditable]")) element.removeAttribute("contenteditable");
    for (const frame of copy.querySelectorAll("iframe[src]")) frame.removeAttribute("src");
    const tabs = [...root.querySelectorAll('[role="tab"]')].map((tab) => tab.textContent.trim().toLowerCase());
    return {
      path: location.pathname,
      html: copy.innerHTML,
      title: document.title,
      styles: [...document.querySelectorAll('head link[rel="stylesheet"]')].map((link) => link.getAttribute("href")),
      inlineStyles: [...document.querySelectorAll("head style")].map((style) => style.textContent),
      links: [
        ...[...root.querySelectorAll("a[href^='/']")].map((link) => new URL(link.href).pathname),
        ...(/^\/components\/[^/]+$/.test(location.pathname)
          ? tabs.filter((tab) => ["web", "mobile", "implement"].includes(tab)).map((tab) => `${location.pathname}/${tab}`)
          : []),
      ],
    };
  });
}

// Where the crawl starts: the home page and every page the side navigation links to.
async function paths(page) {
  await page.setViewport(WIDTHS[1].viewport);
  await page.goto(`${base}/`, { waitUntil: "load", timeout: TIMEOUT });
  await page.waitForFunction(() => window.__pageReady === true, { polling: 100, timeout: TIMEOUT });
  const links = await page.evaluate(async () => {
    for (const toggle of document.querySelectorAll('nav button[aria-label^="Toggle "]')) toggle.click();
    await new Promise((opened) => setTimeout(opened, 500));
    return [...document.querySelectorAll("nav a[href^='/']")].map((link) => new URL(link.href).pathname);
  });
  return [...new Set(["/", ...links])];
}

const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function pageHtml(path, [narrow, wide]) {
  const styles = [...new Set([...narrow.styles, ...wide.styles])].filter((href) => !template.includes(`href="${href}"`));
  const inlineStyles = [...new Set([...narrow.inlineStyles, ...wide.inlineStyles])];
  const head = [
    // Its snapshot shows at its own address only: index.html also answers where the site has no
    // page file, and ?minimal=true lays a page out without its navigation.
    `<script>if (location.pathname !== ${JSON.stringify(path)} || /[?&]minimal=true/.test(location.search)) document.documentElement.dataset.prerendered = "off";</script>`,
    ...styles.map((href) => `<link rel="stylesheet" crossorigin href="${href}">`),
    ...inlineStyles.map((css) => `<style>${css.replace(/<\//g, "<\\/")}</style>`),
    // The snapshot for the layout in use; the app's page renders out of sight until it takes over.
    `<style id="prerendered-style">` +
      `html:not([data-prerendered=off]) #root{visibility:hidden;position:fixed;inset:0;overflow:hidden;z-index:-1}` +
      `html[data-prerendered=off] #prerendered{display:none}` +
      `@media (max-width:767px){#prerendered>[data-width=wide]{display:none}}` +
      `@media (min-width:768px){#prerendered>[data-width=narrow]{display:none}}</style>`,
  ];
  // The app loads once the snapshot has painted and its text has its fonts (two seconds at most), so
  // its code comes after the page's first and largest paints; at once where the snapshot is off.
  const loader = `<script>(function () {
      var loaded = false;
      function load() {
        if (loaded) return;
        loaded = true;
        var script = document.createElement("script");
        script.type = "module";
        script.crossOrigin = "";
        script.src = ${JSON.stringify(entryScript[1])};
        document.head.append(script);
      }
      if (document.documentElement.dataset.prerendered === "off") return load();
      try {
        new PerformanceObserver(function (list, observer) {
          if (!list.getEntriesByName("first-contentful-paint").length) return;
          observer.disconnect();
          (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(load); });
        }).observe({ type: "paint", buffered: true });
      } catch (error) {
        return load();
      }
      setTimeout(load, 2000);
    })();</script>`;
  return template
    .replace(entryScript[0], "")
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(wide.title)}</title>`)
    .replace("</head>", `  ${head.join("\n    ")}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="prerendered"><div data-width="narrow">${narrow.html}</div><div data-width="wide">${wide.html}</div></div>\n    <div id="root"></div>\n    ${loader}`,
    );
}

try {
  // A window each: a page in a tab behind another is hidden, and gets no animation frames. Only the
  // site's own requests go out: the snapshot is its HTML, and embeds (Figma's) never go quiet.
  const pages = await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      const page = await (await browser.createBrowserContext()).newPage();
      await page.setRequestInterception(true);
      page.on("request", (request) => (request.url().startsWith(base) ? request.continue() : request.abort()));
      return page;
    }),
  );
  // Crawled: each page's links join the queue. An address the app redirects (/components/button) or
  // answers with its 404 gets no file.
  const start = await paths(pages[0]);
  const seen = new Set(start);
  const queue = [...seen];
  const documents = new Map();
  let written = 0;
  let failed = 0;
  let busy = 0;
  await Promise.all(
    pages.map(async (page) => {
      for (;;) {
        const path = queue.shift();
        if (!path) {
          if (busy === 0) return;
          await new Promise((waited) => setTimeout(waited, 100));
          continue;
        }
        busy += 1;
        try {
          const snapshots = [];
          for (const { viewport } of WIDTHS) snapshots.push(await capture(page, path, viewport));
          if (snapshots[0].path !== path || snapshots[0].title.startsWith("Not Found")) continue;
          const file = path === "/" ? join(dist, "index.html") : join(dist, `${path}.html`);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, pageHtml(path, snapshots));
          written += 1;
          for (const link of snapshots.flatMap((snapshot) => snapshot.links)) {
            if (!seen.has(link) && !/\.[a-z0-9]+$/i.test(link)) {
              seen.add(link);
              queue.push(link);
            }
          }
          if (!SKIPPED_PAGES.has(path)) {
            documents.set(
              path,
              await readDocument(page, site.siteUrl).catch((error) => {
                console.warn(`no Markdown for ${path} (${error.message.split("\n")[0]})`);
                return null;
              }),
            );
          }
        } catch (error) {
          failed += 1;
          console.warn(`not prerendered, rendered in the browser instead: ${path} (${error.message.split("\n")[0]})`);
        } finally {
          busy -= 1;
        }
      }
    }),
  );
  console.log(`prerendered ${written} pages${failed ? `, ${failed} failed` : ""}`);
  // In the navigation's order, then the pages only links lead to.
  const rank = new Map(start.map((path, index) => [path, index]));
  const order = (path) => rank.get(path) ?? rank.size;
  const sorted = new Map([...documents].sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b)));
  console.log(`llms.txt: ${writeLlms(dist, site.siteUrl, sorted)} documents`);
} finally {
  await browser.close();
  server.close();
}
