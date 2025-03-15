import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use esbuild instead of rollup
    rollupOptions: undefined,
    minify: "esbuild",
  },
  optimizeDeps: {
    // Force vite to use esbuild for dependency optimization
    esbuildOptions: {
      target: "esnext",
    },
  },
  plugins: [tailwindcss()],
});
