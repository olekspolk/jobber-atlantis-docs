// Builds the ES module the preview iframe resolves through its import map
// ("@jobber/components" -> /editorBundle.js), the way atlantis.getjobber.com serves its live examples.
import { build } from "esbuild";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

await build({
  entryPoints: [resolve(root, "editor-bundle/entry.ts")],
  outfile: resolve(root, "public/editorBundle.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  minify: true,
  logLevel: "warning",
  define: { "process.env.NODE_ENV": '"production"' },
});
console.log("built public/editorBundle.js");
