import path from "path";
import fs from "fs";
import { defineConfig } from "vuepress/config";
import { mdPlugin } from "./md";
import Icons from "unplugin-icons/webpack";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/webpack";
import { webpackPlugin } from "./plugins/word";
export default defineConfig({
  base: process.env.NODE_ENV !== "production" ? undefined : "/chendj89/",
  title: "Vue2.7",
  head: [
    ["link", { rel: "icon", href: "/assets/xiaochou.jpg" }],
    [
      "script",
      { src: "https://unpkg.com/better-mock@0.3.4/dist/mock.browser.js" },
    ],
  ],

  markdown: {
    lineNumbers: false,
    toc: { includeLevel: [1, 2, 3] },
    extendMarkdown: (md) => {
      mdPlugin(md);
      // mdLink(md);
    },
  },
  configureWebpack: {
    node: {
      global: true,
      process: true,
    },
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
      Icons({
        compiler: "vue2",
        autoInstall: true,
        customCollections: {
          "my-icons": {
            mdn: () => {
              return fs.readFileSync(
                path.join(__dirname, "./svg/mdn.svg"),
                "utf-8"
              );
            },
          },
        },
      }),
      webpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
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
          "/": "??????",
        },
      },
    ],
    [
      "container",
      {
        type: "warning",
        defaultTitle: {
          "/": "??????",
        },
      },
    ],
    [
      "container",
      {
        type: "danger",
        defaultTitle: {
          "/": "??????",
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
