import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false, // So that popup build files don't get deleted
    outDir: "build",
    rollupOptions: {
      input: {
        content: "./src/scripts/content.ts",
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
