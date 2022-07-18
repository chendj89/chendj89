import { createUnplugin } from "unplugin";
import http from "http";
import fs from "fs";
import path from "path";
import createHtmlDom from "htmldom";
function loadPage(word: string, opts: any) {
  return new Promise(function (resolve, reject) {
    http
      .get(`http://dict.youdao.com/w/eng/${word}`, function (res) {
        console.log(word);

        var html = "";
        res.on("data", function (d) {
          html += d.toString();
        });
        res.on("end", function () {
          let $ = createHtmlDom(html);
          let $pronounce = $(".wordbook-js .pronounce");
          // 发音方式
          let $lang = $pronounce.eq(opts.type - 1);
          // 发音方式
          let lang = $lang[0].children[0].data;
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
        for (let i = 0; i < wordList.length; i++) {
          let word = wordList[i];
          if (!data[word]) {
            let msg = await loadPage(word, opts);
            data[word]=msg;
          }
        }
        fs.writeFileSync(file,JSON.stringify(data,null,2),"utf-8");
        return code;
      },
    };
  }
);

// export const unplugin2 = createUnplugin(
//   (options: Partial<IOption> | undefined) => {
//     return {
//       name: "word",
//       transformInclude(id) {
//         return id.endsWith(".md");
//       },
//       async transform(code) {
//         let opts = Object.assign(
//           {
//             // 1 英式，2 美式
//             type: 1,
//             // 音量
//             volume: 1,
//             // 倍速
//             playbackRate: 1,
//           },
//           options
//         );
//         // 获取所有单词
//         let words = code.match(/<vp-word>(.+)<\/vp-word>/gi);
//         // 读取单词表
//         let file = path.join(__dirname, "./data.json");
//         // 数据
//         let data: any = fs.readFileSync(file, "utf-8");
//         // 判空，转换为json对象
//         data = (data && JSON.parse(data)) || {};
//         if (words) {
//           // 如果重新更新，必须清空数据
//           if (opts.reload) {
//             data = {};
//           }
//           for (let i = 0; i < words.length; i++) {
//             let el = words[i];
//             // 获取单词
//             let result = el.match(/<vp-word>(.+)<\/vp-word>/);
//             // 单词
//             let word = (result && result[1]) || "";
//             // 判空处理
//             if (!word) {
//               return;
//             }
//             // 如果需要重新加载,并且没有数据
//             if (opts.reload && !data[word]) {
//               // 同步拿到网络数据
//               let msg = await loadPage(
//                 `http://dict.youdao.com/w/eng/${word}`
//               ).then((xml) => {
//                 let $ = createHtmlDom(xml);
//                 let $pronounce = $(".wordbook-js .pronounce");
//                 // 发音方式
//                 let $lang = $pronounce.eq(opts.type - 1);
//                 // 发音方式
//                 let lang = $lang[0].children[0].data;
//                 // 英标
//                 let soundmark = $lang.find(".phonetic").html();
//                 // 中文意思
//                 let desc = $(".trans-container ul li").eq(0).html();
//                 return {
//                   name: word,
//                   soundmark: soundmark,
//                   src: `https://dict.youdao.com/dictvoice?audio=${word}&type=${opts.type}`,
//                   volume: opts.volume,
//                   desc: desc,
//                   playbackRate: opts.playbackRate,
//                 };
//               });
//               data[word] = msg;
//             } else {
//               // 更新音频参数
//               data[word] = {
//                 ...data[word],
//                 volume: opts.volume,
//                 playbackRate: opts.playbackRate,
//               };
//             }
//           }
//         }
//         // 保存数据并格式话
//         fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
//         return code;
//       },
//     };
//   }
// );
export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
