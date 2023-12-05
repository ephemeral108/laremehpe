import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacyPlugin from "@vitejs/plugin-legacy";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/dist/",
  plugins: [
    react(),
    legacyPlugin({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true,
    }),
  ],
  // base: "https://laremehpe.gitee.io/",
  server: {
    host: true,
    port: 80,
  },
});
