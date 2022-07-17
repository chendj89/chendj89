/**
 * 转换MD文件
 */
import path from "path";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdContainer from "markdown-it-container";
import { highlight } from "./highlight";
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
      if (token.tag == "code" && ["js run"].includes(token.info)) {
        let comment = highlight("//结果", "js");
        return `${rawCode}<div class="language-js extra-class vp-code-container">${comment}<vp-code code="${encodeURIComponent(
          token.content
        )}">${token.content}</vp-code></div>`;
      } else {
        return rawCode;
      }
    };
  const { fence, code_block: codeBlock } = md.renderer.rules;

  md.renderer.rules.fence = wrap(fence);
  md.renderer.rules.code_block = wrap(codeBlock);
};
