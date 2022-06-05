/**
 * 转换MD文件
 */
import path from "path";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdContainer from "markdown-it-container";
import { highlight } from "./highlight";
import { NametoUpperCase } from "../utils";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";
import installJSon from "../config/install.json";
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
export const mdPlugin = (md: MarkdownIt) => {
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
          for (let attr in installJSon) {
            let item = installJSon[attr];
            for (let key in item.children) {
              let cell = item.children[key];
              if (cell.mdName == sourceFile) {
                source = fs.readFileSync(cell.mdPath, "utf-8");
              }
            }
          }
        }
        if (sourceFile.includes("/")) {
          let arr = sourceFile.split("/");
          let comName = ``;
          arr.map((item) => {
            comName += NametoUpperCase(item);
          });
          sourceFile = comName;
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);
        return `<DemoContainer source="${encodeURIComponent(
          highlight(source, "vue")
        )}"  raw-source="${encodeURIComponent(
          source
        )}" path="${sourceFile}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`;
      } else {
        return "</DemoContainer>";
      }
    },
  } as ContainerOpts);
};
