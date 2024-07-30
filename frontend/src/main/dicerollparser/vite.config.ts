import { fileURLToPath, resolve, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import vuetify from "vite-plugin-vuetify";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    eslintPlugin(),
    // vite-plugin-checker
    // https://github.com/fi3ework/vite-plugin-checker
    checker({ typescript: true, vueTsc: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:9080",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.spec.ts"],
    server: {
      deps: {
        inline: ["@vue", "vuetify"],
      },
    },
    setupFiles: [
      resolve(__dirname, "dicerollparser/src/__tests__/matchMedia.ts"),
    ],
  },
});
