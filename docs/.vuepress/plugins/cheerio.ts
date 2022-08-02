import { createUnplugin } from "unplugin";
import http from "http";
import { load } from "cheerio";
import fs from "fs";
import path from "path";

export const unplugin = createUnplugin((options) => {
  return {
    name: "cheerio",
    transformInclude(id) {
      return id.endsWith("api.md");
    },
    transform(code) {
      let html = fs.readFileSync(path.join(__dirname, "api.html"), "utf-8");
      let $ = load(html);
      let $api = $("#api-index");
      let $sections = $api.find(".api-section");
      let hash = {};
      $sections.each((index, item) => {
        let h2 = $(item).find("h2").text();

        hash[h2] = {
          h2: h2,
          list:[]
        };
        let $groups = $(item).find(".api-groups");
        $groups.each((i, ele) => {
          let h3 = $(ele).find("h3").text();
          let $links = $(ele).find("a");
          let list:any[] = [];
          $links.each((j, link) => {
            list.push({
              text: $(link).text(),
              href: $(link).attr("href"),
            });
          });

          hash[h2].list.push({
            h3:h3,
            list:list,
          })
        });

      });
      fs.writeFileSync(path.join(__dirname,"api.json"),JSON.stringify(hash,null,2),"utf-8")

      return code;
    },
  };
});

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
