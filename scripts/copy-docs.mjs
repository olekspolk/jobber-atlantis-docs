// Copies the docs markdown that @jobber/components ships in its npm package for every documented
// component (src/content/components/*.ts); the package's exports map does not expose dist/docs,
// so they cannot be imported directly.
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const components = resolve(root, "src/content/components");
const docs = resolve(root, "node_modules/@jobber/components/dist/docs");
const to = resolve(root, "src/generated/docs");

const names = readdirSync(components).flatMap((file) =>
  [...readFileSync(resolve(components, file), "utf8").matchAll(/generated\/docs\/(\w+)\.md\?raw/g)].map((m) => m[1]),
);

mkdirSync(to, { recursive: true });
for (const name of names) copyFileSync(resolve(docs, name, `${name}.md`), resolve(to, `${name}.md`));
console.log(`copied ${names.length} docs into src/generated/docs`);
