import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwind from "@tailwindcss/vite";

// GitHub Pages specific configuration - simplified for build process
export default defineConfig({
  plugins: [
    react(),
    tailwind()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      '@shared': path.resolve(__dirname, "../shared"),
      '@assets': path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../gh-pages-build"),
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
  },
  base: './',
});