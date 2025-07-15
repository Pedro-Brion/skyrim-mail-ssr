import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier/flat";


export default defineConfig([
  { 
   files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
   languageOptions: { 
    globals: {...globals.browser, ...globals.node} 
   },
   rules:{
     "@typescript-eslint/no-explicit-any": "warn",
   } 
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  prettierConfig
]);
