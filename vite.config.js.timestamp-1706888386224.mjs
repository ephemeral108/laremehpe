// vite.config.js
import { defineConfig } from "file:///home/laremehpe/Desktop/project/html/laremehpe/node_modules/vite/dist/node/index.js";
import react from "file:///home/laremehpe/Desktop/project/html/laremehpe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import legacyPlugin from "file:///home/laremehpe/Desktop/project/html/laremehpe/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    react(),
    legacyPlugin({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      renderLegacyChunks: true
    })
  ],
  // base: "https://laremehpe.gitee.io/",
  server: {
    host: true,
    port: 5173
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sYXJlbWVocGUvRGVza3RvcC9wcm9qZWN0L2h0bWwvbGFyZW1laHBlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9sYXJlbWVocGUvRGVza3RvcC9wcm9qZWN0L2h0bWwvbGFyZW1laHBlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2xhcmVtZWhwZS9EZXNrdG9wL3Byb2plY3QvaHRtbC9sYXJlbWVocGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IGxlZ2FjeVBsdWdpbiBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIuL1wiLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBsZWdhY3lQbHVnaW4oe1xuICAgICAgdGFyZ2V0czogW1wiaWUgPj0gMTFcIl0sXG4gICAgICBhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIl0sXG4gICAgICByZW5kZXJMZWdhY3lDaHVua3M6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIC8vIGJhc2U6IFwiaHR0cHM6Ly9sYXJlbWVocGUuZ2l0ZWUuaW8vXCIsXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogNTE3MyxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxTQUFTLG9CQUFvQjtBQUN6VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxrQkFBa0I7QUFFekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLE1BQ1gsU0FBUyxDQUFDLFVBQVU7QUFBQSxNQUNwQiwyQkFBMkIsQ0FBQyw2QkFBNkI7QUFBQSxNQUN6RCxvQkFBb0I7QUFBQSxJQUN0QixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==