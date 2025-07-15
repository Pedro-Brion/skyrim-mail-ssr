import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import autoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    autoImport({
      dts: "src/auto-imports.d.ts", // or a custom path
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
      ],
      viteOptimizeDeps: true,
        injectAtEnd: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
});
