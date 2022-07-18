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
      let opts = Object.assign(
        {
          // 1 英式，2 美式
          type: 1,
          // 音量
          volume: 1,
          // 倍速
          playbackRate: 1,
        },
        options
      );
      // 是否重新抓取数据
      if (options && options.reload) {
        // 获取所有单词
        let words = code.match(/<vp-word>(.+)<\/vp-word>/gi);
        // 读取单词表
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
                    wordbook?.querySelectorAll(".phonetic")[opts.type - 1]
                      .innerHTML;
                  let src = `https://dict.youdao.com/dictvoice?audio=${word}&type=${opts.type}`;
                  return {
                    name: word,
                    soundmark: soundmark,
                    src: src,
                    volume: opts.volume,
                    playbackRate: opts.playbackRate,
                  };
                });
                data[word] = result;
                fs.writeFileSync(file, JSON.stringify(data), "utf-8");
              }
            } else {
            }
          });
        }
      }

      return code;
    },
  };
});
export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
