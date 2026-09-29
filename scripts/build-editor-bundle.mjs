// Builds the ES module the preview iframe resolves through its import map
// ("@jobber/components" -> /editorBundle.js), the way atlantis.getjobber.com serves its live examples,
// and lists its exports for the module every example runs in (src/preview/codeWrapper.js).
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const scopeFile = resolve(root, "src/generated/editor-scope.json");

const result = await build({
  entryPoints: [resolve(root, "editor-bundle/entry.ts")],
  outfile: resolve(root, "public/editorBundle.js"),
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2020",
  minify: true,
  metafile: true,
  logLevel: "warning",
  define: { "process.env.NODE_ENV": '"production"' },
});

const scope = Object.values(result.metafile.outputs).find((output) => output.entryPoint)?.exports ?? [];
mkdirSync(dirname(scopeFile), { recursive: true });
writeFileSync(scopeFile, `${JSON.stringify(scope.sort(), null, 2)}\n`);
console.log(`built public/editorBundle.js (${scope.length} names in scope)`);
