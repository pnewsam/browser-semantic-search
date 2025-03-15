import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
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
