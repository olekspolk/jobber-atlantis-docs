// Copies the FilterPicker docs markdown that @jobber/components ships in its npm package; the
// package's exports map does not expose dist/docs, so it cannot be imported directly.
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const from = resolve(root, "node_modules/@jobber/components/dist/docs/FilterPicker/FilterPicker.md");
const to = resolve(root, "src/content/generated/FilterPicker.md");

mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log("copied src/content/generated/FilterPicker.md");
