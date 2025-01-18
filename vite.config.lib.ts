import { defineConfig, UserConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  const root = process.cwd();

  return {
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    plugins: [vue(), vueJsx(), vueSetupExtend({})],
    esbuild: {
      pure: ["console.log", "debugger"]
    },
    build: {
      lib: {
        entry: resolve(__dirname, "./src/lib.ts"),
        name: "GeekerAdminComponents",
        fileName: "geeker-component-lib",
        formats: ["umd"]
      },
      rollupOptions: {
        external: [
          "vue",
          "vue-router",
          "vue-i18n",
          "pinia",
          "element-plus",
          "echarts",
          "@wangeditor/editor",
          "@wangeditor/editor-for-vue",
          "sortablejs",
          "vuedraggable"
        ]
      },
      minify: false
    }
  };
});
