import { createUnplugin } from "unplugin";
import http from "http";
import fs from "fs";
import path from "path";
import { load } from "cheerio";
function loadPage(word: string, opts: any) {
  return new Promise(function (resolve, reject) {
    http
      .get(`http://dict.youdao.com/w/eng/${word}`, function (res) {
        var html = "";
        res.on("data", function (d) {
          html += d.toString();
        });
        res.on("end", function () {
          let $ = load(html);
          let $pronounce = $(".wordbook-js .pronounce");
          // 发音方式
          let $lang = $pronounce.eq(opts.type - 1);
          // 发音方式
          let lang = $lang.clone().children().remove().end().text();
          // 英标
          let soundmark = $lang.find(".phonetic").html();
          // 中文意思
          let desc = $(".trans-container ul li").eq(0).html();
          resolve({
            name: word,
            soundmark: soundmark,
            src: `https://dict.youdao.com/dictvoice?audio=${word}&type=${opts.type}`,
            volume: opts.volume,
            desc: desc,
            lang: lang,
            playbackRate: opts.playbackRate,
          });
        });
      })
      .on("error", function (e) {
        reject(e);
      });
  });
}

interface IOption {
  /**
   * 是否重新加载
   */
  reload: boolean;
  /**
   * 发音方式 1英式 2美式
   */
  type: [1, 2];
  /**
   * 音量
   */
  volume: number;
  /**
   * 倍速
   */
  playbackRate: number;
  cheerio: any;
}
export const unplugin = createUnplugin(
  (options: Partial<IOption> | undefined) => {
    return {
      name: "word",
      transformInclude(id) {
        return id.endsWith(".md");
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
        // 获取所有单词
        let words = code.match(/<vp-word>(.+)<\/vp-word>/gi);
        // 读取单词表
        let file = path.join(__dirname, "./data.json");
        // 数据
        let data: any = fs.readFileSync(file, "utf-8");
        // 判空，转换为json对象
        data = (data && JSON.parse(data)) || {};
        // 收集所有单词
        let wordList: any[] = [];
        words?.map((item) => {
          let result = item.match(/<vp-word>(.+)<\/vp-word>/);
          if (result) {
            wordList.push(result[1]);
          }
        });
        if (wordList.length) {
          for (let i = 0; i < wordList.length; i++) {
            let word = wordList[i];
            if (!data[word]) {
              let msg = await loadPage(word, opts);
              data[word] = msg;
            }
          }
          fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
          console.log(wordList);
          
        }

        return code;
      },
    };
  }
);

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
