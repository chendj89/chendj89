/**
 * 转换MD文件
 */
import path from "path";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdContainer from "markdown-it-container";
import { highlight } from "./highlight";
import { getFileName, getCodeName, getCodeSuffix } from "../tool/file.js";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";
const localMd = MarkdownIt();

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string;
}
export const mdPlugin = (md: any) => {
  let exportList: any[] = [];
  md.use(mdContainer, "demo", {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFileToken = tokens[idx + 2];
        let source = "";
        let sourceFile = sourceFileToken.children?.[0].content ?? "";
        if (sourceFileToken.type === "inline") {
          source = fs.readFileSync(
            path.resolve(__dirname, "../examples", `${sourceFile}.vue`),
            "utf-8"
          );
        }
        if (sourceFile.includes("/")) {
          sourceFile = sourceFile.replace("/", "-");
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
        return `<vp-container origin="${encodeURIComponent(
          source
        )}" source="${encodeURIComponent(
          highlight(source, "vue")
        )}" path="${sourceFile}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`;
      } else {
        return "</vp-container>";
      }
    },
  } as ContainerOpts);
  const wrap =
    (wrapped) =>
    (...args) => {
      const [tokens, idx] = args;
      const token = tokens[idx];
      const rawCode = wrapped(...args);
      let infoArr: string[] = token.info.split(" ");

      // 如果是导入代码块
      if (token.src) {
        let fileName = getFileName(token.src);
        let codeName = getCodeName(token.content);
        if (codeName) {
          exportList.push({
            name: codeName,
            func: token.content.replace(/export/gi, "").trim(),
            fileName: fileName,
          });
          let suffix = getCodeSuffix(token.src);
          infoArr.push(suffix);
        }
      }

      if (infoArr.includes("export")) {
        exportList.push({
          name: infoArr[2],
          func: token.content.replace(/export/gi, "").trim(),
        });
      }

      if (infoArr.includes("js") || infoArr.includes("ts")) {
        let importStr = "";
        let htmlCode = "";
        exportList.map((item) => {
          if (token.content.includes(item.name)) {
            importStr += `// import { ${item.name} } from ${item.name};\n`;
          }
        });
        htmlCode = highlight(importStr + token.content + "//结果", "js");
        let arrMap = new Map();
        exportList = exportList.filter((item) => {
          return !arrMap.has(item.name) && arrMap.set(item.name, item);
        });
        // 缓存数据
        let cache = encodeURIComponent(JSON.stringify(exportList));
        // 代码
        let code = encodeURIComponent(token.content);
        if (infoArr.includes("run")) {
          return `<div class="language-${infoArr[0]} run extra-class">${htmlCode}<vp-code cache="${cache}" code="${code}">${token.content}</vp-code></div>`;
        } else {
          return rawCode;
        }
      } else {
        return rawCode;
      }
    };
  const { fence, code_block: codeBlock } = md.renderer.rules;

  md.renderer.rules.fence = wrap(fence);
  md.renderer.rules.code_block = wrap(codeBlock);
};
