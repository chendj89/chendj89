import path from "path";
import { defineConfig } from "vuepress/config";
import { mdPlugin } from "./md";
import Icons from "unplugin-icons/webpack";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/webpack";
export default defineConfig({
  base: process.env.NODE_ENV !== "production" ? undefined : "/chendj89/",
  title: "Vue2.7",
  head: [
    ["link", { rel: "icon", href: "/assets/onepiece.jpg" }],
    [
      "script",
      {
        src: "https://unpkg.com/mockjs@1.1.0/dist/mock.js",
      },
    ],
  ],
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
    extendMarkdown: (md) => {
      mdPlugin(md);
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@docs": path.resolve(__dirname, ".."),
        "@public": path.join(__dirname, "/public"),
      },
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [IconsResolver()],
      }),
      Icons({ compiler: "vue2", autoInstall: true }),
    ],
  },
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: [
          "./docs/.vuepress/theme/components",
          "./docs/.vuepress/examples",
        ],
        getComponentName: (filename) => {
          console.log(filename);
          filename = filename.replace("navbar/", "").replace(/\/|\\/g, "-");
          return filename;
        },
      },
    ],
    "@vuepress/plugin-nprogress",
    [
      "container",
      {
        type: "tip",
        defaultTitle: {
          "/": "提示",
        },
      },
    ],
    [
      "container",
      {
        type: "warning",
        defaultTitle: {
          "/": "注意",
        },
      },
    ],
    [
      "container",
      {
        type: "danger",
        defaultTitle: {
          "/": "警告",
        },
      },
    ],
    [
      "container",
      {
        type: "details",
        before: (info) =>
          `<details class="custom-block details">${
            info ? `<summary>${info}</summary>` : ""
          }\n`,
        after: () => "</details>\n",
      },
    ],
  ],
});
