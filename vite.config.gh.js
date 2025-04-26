import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwind from "@tailwindcss/vite";

// GitHub Pages specific configuration
export default defineConfig({
  plugins: [
    react(),
    tailwind(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "client", "src"),
      '@shared': path.resolve(__dirname, "shared"),
      '@assets': path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
  },
  // Base path for GitHub Pages - will be set to your repository name
  // If deploying to a custom domain, you can use '/' instead
  base: './',
});