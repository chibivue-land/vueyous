import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { URL, fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vueyouse: fileURLToPath(new URL("../../packages", import.meta.url)),
    },
  },
});
