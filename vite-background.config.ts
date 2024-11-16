import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false, // So that popup and content build files don't get deleted
    target: "node16",
    outDir: "build",
    rollupOptions: {
      input: {
        background: "./src/scripts/background.ts", // Entry Point
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
