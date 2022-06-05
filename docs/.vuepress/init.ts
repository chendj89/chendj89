import fs from "fs";
import path from "path";
import jsBeautify from "js-beautify";
import { NametoUpperCase } from "./utils";
let info: any = {};
// 导入模板
let importTpl: any[] = [];
// 安装模板
let installTpl: string[] = [];
let beautifyConfig = {
  indent_size: 2,
};
/**
 * 读取md信息
 * @param mdRoot
 * @param mdDir
 */
function readMds(mdRoot: string, mdDir: string) {
  // 当前目录
  const root = path.join(mdRoot, mdDir);
  // 文件夹
  const dirs = fs.readdirSync(root);
  dirs.map((fileName) => {
    // dir 当前目录或者当前文件名
    // 文件完整路径
    let filePath = path.join(root, fileName);
    // 文件详情
    let stat = fs.statSync(filePath);
    // 判断当前文件是否为目录
    if (stat.isDirectory()) {
      if (!info[fileName]) {
        info[fileName] = {
          name: fileName,
          children: [],
        };
      }
      return readMds(root, fileName);
    } else {
      if (info[mdDir]) {
        let comName =
          NametoUpperCase(mdDir) +
          NametoUpperCase(fileName.replace(".vue", ""));
        let mdPath = filePath;
        filePath = filePath.replace(/\\/gi, "/");
        filePath = filePath.replace(__dirname.replace(/\\/gi, "/"), "..");
        let file = {
          comName,
          fileName,
          mdName: mdDir + "/" + fileName.replace(".vue", ""),
          filePath,
          mdPath: mdPath.replace(/\\\\/gi, "/"),
        };
        importTpl.push({
          name: comName,
          filePath: filePath,
        });
        installTpl.push(comName);
        info[mdDir].children.push(file);
      }
    }
  });
  return info;
}

function writeMds() {
  let list = ["examples"];
  list.map((item) => {
    readMds(__dirname, item);
  });
  importTpl = importTpl.map((item) => {
    return `import ${item.name} from "${item.filePath}"`;
  });
  installTpl = installTpl.map((item) => {
    return `app.component("${item}",${item})`;
  });
  let tpl = `${importTpl.join(";\n")}
        /**
         * 自动导入组件 
         */
        export default function imports(app: any) {
        ${installTpl.join(";\n")}
        }`;
  //写入导入组件
  fs.writeFileSync(
    path.join(__dirname, "config/install.ts"),
    jsBeautify.js(tpl, beautifyConfig)
  );
  // 写入组件信息
  fs.writeFileSync(
    path.join(__dirname, "config/install.json"),
    jsBeautify.js(JSON.stringify(info), beautifyConfig)
  );
}
writeMds();
