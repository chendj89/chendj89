import { createUnplugin } from "unplugin";
import http from "http";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
import fs from "fs";
import path from "path";

function loadPage(url) {
  var pm = new Promise(function (resolve, reject) {
    http
      .get(url, function (res) {
        var html = "";
        res.on("data", function (d) {
          html += d.toString();
        });
        res.on("end", function () {
          resolve(html);
        });
      })
      .on("error", function (e) {
        reject(e);
      });
  });
  return pm;
}
let init = true;
export const unplugin = createUnplugin((options: any) => {
  return {
    name: "word",
    transformInclude(id) {
      return id.endsWith("掘金.md");
    },
    async transform(code) {
      let words = code.match(/<vp-word>(.+)<\/vp-word>/gi);
      let file = path.join(__dirname, "./data.json");
      if (words) {
        let data: any = fs.readFileSync(file, "utf-8");
        if (data) {
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = {};
          }
        } else {
          data = {};
        }
        words.forEach(async (item) => {
          let itemResult = item.match(/<vp-word>(.+)<\/vp-word>/);
          let word = (itemResult && itemResult[1]) || null;
          let result: any = null;

          if (word) {
            if (data[word]) {
              result = data[word];
            } else {
              data[word] = {};
              result = await loadPage(
                `http://dict.youdao.com/w/eng/${word}`
              ).then(function (d) {
                let dom = new JSDOM(d as string);
                let wordbook: Element = dom.window.document.querySelector(
                  ".wordbook-js"
                ) as Element;
                let soundmark =
                  wordbook?.querySelectorAll(".phonetic")[1].innerHTML;
                let src = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`;
                return {
                  name: word,
                  soundmark: soundmark,
                  src: src,
                };
              });
              console.log(result);
              data[word] = result;
              fs.writeFileSync(file, JSON.stringify(data), "utf-8");
            }
          } else {
          }
        });
      }
      return code;
    },
  };
});
export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
