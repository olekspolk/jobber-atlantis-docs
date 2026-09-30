import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig, transformWithEsbuild } from "vite";
import site from "./site.config.json";
import { rehypeHeadingIds } from "./src/content/mdx/rehypeHeadingIds";
import { remarkStorybookLinks } from "./src/content/mdx/remarkStorybookLinks";

const mdxPlugin = mdx({ remarkPlugins: [remarkGfm, remarkStorybookLinks], rehypePlugins: [rehypeHeadingIds] });

// Class names that a page's examples print in their code keep the ones they have on the site.
const SITE_CLASS_NAMES: Record<string, Record<string, string>> = {
  "Container.module.css": { item: "_item_1o13p_2" },
  "page-layouts.module.css": {
    item: "_item_ulv7o_2",
    itemDotted: "_itemDotted_ulv7o_7",
    itemUpsideDown: "_itemUpsideDown_ulv7o_13",
  },
  "scaffolding.module.css": { actions: "_actions_33u0d_2" },
};

// Every other class is named as CSS modules name it by default: _name_hash_line.
function scopedName(name: string, filename: string, css: string) {
  const siteName = SITE_CLASS_NAMES[basename(filename.split("?")[0])]?.[name];
  if (siteName) return siteName;
  let hash = 5381;
  for (let i = css.length; i; ) hash = (hash * 33) ^ css.charCodeAt(--i);
  const line = css.slice(0, Math.max(0, css.indexOf(`.${name}`))).split(/[\r\n]/).length;
  return `_${name}_${(hash >>> 0).toString(36).slice(0, 5)}_${line}`;
}

export default defineConfig({
  plugins: [
    // The site's pages are MDX: GitHub-flavoured markdown, with its ids on h2 headings and its
    // Storybook links pointing at the original site. A file imported with ?raw stays text: the
    // changelog table reads the changelogs' markdown.
    {
      ...mdxPlugin,
      enforce: "pre",
      transform: (value: string, id: string) => (/[?&]raw\b/.test(id) ? undefined : mdxPlugin.transform(value, id)),
    },
    react({ include: /\.(md|mdx|js|jsx|ts|tsx)$/ }),
    // Atlantis's foundation.css starts by importing Inter and Poppins from Google Fonts, a stylesheet
    // the page's own would wait for: the page declares them in src/styles/fonts.css instead. The
    // preview frame's copy (imported with ?url) keeps the import.
    {
      name: "foundation-without-font-import",
      transform(code, id) {
        if (!/[\\/]@jobber[\\/]design[\\/]dist[\\/]foundation\.css$/.test(id)) return;
        return code.replace(/@import url\("https:\/\/fonts\.googleapis\.com\/[^"]*"\);\s*/, "");
      },
    },
    // "Show Code" writes an example out as JSX named after its components' functions, so Atlantis's
    // components keep their names through minification (<Button />, not <a />). Only theirs: kept
    // names wrap functions in a helper of the chunk, which a function serialised into the preview
    // frame (the overlay-frame guest) could not call.
    {
      name: "atlantis-component-names",
      apply: "build",
      async transform(code, id) {
        if (!/[\\/]node_modules[\\/]@jobber[\\/]components[\\/]dist[\\/].+\.m?js$/.test(id.split("?")[0])) return;
        const { code: named, map } = await transformWithEsbuild(code, id, { loader: "js", keepNames: true });
        return { code: named, map };
      },
    },
    // @jobber/hooks does not say its modules are free of side effects, so a hook imported from its
    // index (as Atlantis's components import them) brought every hook along, and useCollectionQuery
    // brought Apollo's client. They only define hooks: unused ones can go.
    {
      name: "jobber-hooks-side-effects",
      apply: "build",
      transform(_code, id) {
        if (/[\\/]node_modules[\\/]@jobber[\\/]hooks[\\/]dist[\\/]/.test(id.split("?")[0])) return { moduleSideEffects: false };
      },
    },
  ],
  // The Babel worker (src/preview/transpile.worker.ts) is a module worker.
  worker: { format: "es" },
  // Pages load lazily, so the dev server scans every module for dependencies up front rather than
  // what index.html reaches: otherwise it finds them a page at a time and reloads for each.
  optimizeDeps: { entries: ["index.html", "src/**/*.{ts,tsx}"] },
  resolve: {
    alias: {
      // The live examples log their events with Storybook's `action`.
      "storybook/actions": fileURLToPath(new URL("./src/content/mdx/storybookActions.ts", import.meta.url)),
    },
  },
  css: { modules: { generateScopedName: scopedName } },
  server: { port: site.devServerPort },
});
