import { createUnplugin } from "unplugin";
import fs from "fs";
import path from "path";
import postcss, { ChildNode, Rule } from "postcss";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";
import babel from "@babel/parser";
import postscss from "postcss-scss";
import * as csstree from "css-tree";

export const unplugin = createUnplugin((options) => {
  return {
    name: "scss",
    transformInclude(id) {
      return id.endsWith("样式.md");
    },
    async transform(code) {
      let reg1 = /^@\[code\s*(\{\s*[\w,]*\s*\})?\s*\]\(.*\)\s*$/gm;
      let reg2 = /^@\[code\s*(\{\s*[\w,]*\s*\})?\s*\]\((.*)\)$/;
      let result = code.match(reg1);
      if (result) {
        for (let i = 0; i < result.length; i++) {
          let item = result[i].trim();
          let list = item.match(reg2);
          if (list) {
            let root = process.cwd();
            let file = list[2].replace("@docs", "/docs");
            file = path.join(root, file);
            let content = fs.readFileSync(file, "utf-8");
            // 文件后缀
            let extname = path.extname(file).replace(".", "");
            console.log(extname);
            
            if (["scss", "css"].includes(extname)) {

              let t0: any = [];
              if (list[1]) {
                let methodList: any = list[1].replace("{", "").replace("}", "");
                methodList = methodList.split(",");
                for (let j = 0; j < methodList.length; j++) {
                  let methodName = methodList[j];
                  methodName = methodName.trim();
                  let ast = csstree.parse(content, { positions: true });
                  let strMethod = "";
                  ast.children.map((cell) => {
                    if (cell.prelude.value.includes(methodName)) {
                      strMethod = content.slice(
                        cell.loc.start.offset,
                        cell.loc.end.offset + 1
                      );
                      if (strMethod) {
                        t0.push(strMethod);
                        strMethod = "";
                      }
                    }
                  });
                }

                if (t0.length) {
                  code = code.replace(
                    item,
                    "```" + extname + "\n" + t0.join("\n") + "\n```"
                  );
                  console.log(t0);
                }
              }else {
                code = code.replace(
                  item,
                  "```" + extname + "\n" + content + "\n```"
                );
              }
            } else {
              if (list[1]) {
                let methodList: any = list[1].replace("{", "").replace("}", "");
                methodList = methodList.split(",");
                if (methodList) {
                  let ast = babel.parse(content, {
                    sourceType: "module",
                    attachComment: false,
                    tokens: false,
                    errorRecovery: false,
                    plugins: [
                      // enable jsx and flow syntax
                      "jsx",
                      "flow",
                    ],
                  });
                  let t2: any[] = [];
                  methodList.map((methodName) => {
                    methodName = methodName.trim();
                    ast.program.body.map((item: any, index) => {
                      let idName = item.declaration.declarations[0].id.name;
                      if (methodName == idName) {
                        let comment: any = ast.comments?.find((cell: any) => {
                          return cell.loc.end.line == item.loc?.start.line - 1;
                        });
                        if (comment) {
                          t2.push(
                            content.slice(comment.start, comment.end + 1)
                          );
                        }
                        t2.push(content.slice(item.start, item.end + 1));
                      }
                    });
                  });
                  if (t2.length) {
                    code = code.replace(
                      item,
                      "```" + extname + "\n" + t2.join("\n") + "\n```"
                    );
                  }
                }
              } else {
                code = code.replace(
                  item,
                  "```" + extname + "\n" + content + "\n```"
                );
              }
            }
          }
        }
      }
      console.log(code);
      
      return code;
    },
  };
});

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
