import { resolve } from "path";
import fs from "fs";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import svgLoader from "vite-svg-loader";

const NuxtTsConfig = (fs.readFileSync("./.nuxt/tsconfig.json")).toString();
const tsConfigFormated = JSON.parse(NuxtTsConfig
  .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m));

const r = (p: string) => resolve(__dirname, p);

export const alias: Record<string, string> = {};

Object.entries(tsConfigFormated.compilerOptions.paths)
  .forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    alias[key] = r(value[0]);
  });

export default {
  test: {

    globals: true,
    environment: "jsdom"
  },
  resolve: {
    alias
  },
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      imports: [
        "vue"
      ]
    })]
};
