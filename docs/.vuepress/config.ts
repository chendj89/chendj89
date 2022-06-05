import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "@vuepress/cli";
import { mdPlugin } from "./md";
import { localTheme } from "./theme";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
export default defineUserConfig({
  lang: "zh-Cn",
  title: "chendj89",
  theme: localTheme({
    // 默认主题配置项
  }),
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
  extendsMarkdown: (md) => {
    mdPlugin(md);
  },

  bundler: viteBundler({
    viteOptions: {
      plugins: [
        Components({
          allowOverrides: true,
          resolvers: [IconsResolver()],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        }),
        Icons({ compiler: "vue3", autoInstall: true }),
      ],
    },
    vuePluginOptions: {},
  }),
});
