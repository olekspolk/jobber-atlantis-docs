// The mobile preview runs Atlantis's React Native components in the browser through the module the
// original site builds for it (react-native-web, @jobber/components-native, @jobber/hooks, React and
// react-intl): public/editorMobileBundle.js, fetched once from atlantis.getjobber.com and kept (the
// deploy workflow caches it). A download is tried three times. With --optional (the dev server), a
// failed one leaves the mobile previews blank instead of stopping the server; a build fails.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import site from "../site.config.json" with { type: "json" };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "public/editorMobileBundle.js");
const url = `${site.atlantisUrl}/editorMobileBundle.js`;
const ATTEMPTS = 3;

async function download() {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === ATTEMPTS) throw error;
      await new Promise((done) => setTimeout(done, 2000 * attempt));
    }
  }
}

if (existsSync(out) && !process.argv.includes("--force")) {
  console.log("public/editorMobileBundle.js is already there");
} else {
  try {
    const bundle = await download();
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, bundle);
    console.log("fetched public/editorMobileBundle.js");
  } catch (error) {
    const message = `could not fetch ${url}: ${error.message}`;
    if (!process.argv.includes("--optional")) throw new Error(message);
    console.warn(`${message}. The mobile previews stay blank until it can be fetched.`);
  }
}
