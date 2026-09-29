import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import site from "./site.config.json";
import { fillTemplate } from "./src/template";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "site-config",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => fillTemplate(html, { fontsUrl: site.fontsUrl }),
      },
    },
  ],
  server: { port: site.devServerPort },
});
