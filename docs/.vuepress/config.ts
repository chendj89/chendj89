import path from "path";
import fs from "fs";
import { defineConfig } from "vuepress/config";
import { mdPlugin } from "./md";
import Icons from "unplugin-icons/webpack";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/webpack";
import { webpackPlugin } from "./plugins/word";
import { webpackPlugin as scssPlugin } from "./plugins/scss";
import { webpackPlugin as cheerioPlugin } from "./plugins/cheerio";
import { imsize_plugin } from "./md/image";
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
      imsize_plugin(md, {
        render(src: string, attrs: any) {
          if (src.includes("?")) {
            let src_arr = src.split("?");
            // 替换最后的)
            src_arr[1]=src_arr[1].replace(")","");
            src_arr[1]=src_arr[1].replace(/\&/gm,';').replace(/\=/gm,':');
            console.log(src_arr[1]);
            
            attrs.push(["style", src_arr[1]]);
          }
        },
      });
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

      scssPlugin(),
      webpackPlugin(),
      cheerioPlugin(),
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
          filename = filename.replace("navbar/", "").replace(/\/|\\/g, "-");
          console.log(filename);
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
        before: (info: string) =>
          `<details class="custom-block details">${
            info ? `<summary>${info}</summary>` : ""
          }\n`,
        after: () => "</details>\n",
      },
    ],
  ],
});
