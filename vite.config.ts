import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { resolve } from "node:path";
import { devtools } from "@tanstack/devtools-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    tailwindcss(),
    svgr(),
    devtools({
      removeDevtoolsOnBuild: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
