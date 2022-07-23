/**
 * 获取文件名
 * @param {*} path
 * @returns
 */
export function getFileName(path) {
  let pos1 = path.lastIndexOf("/");
  let pos2 = path.lastIndexOf("\\");
  let pos = Math.max(pos1, pos2);
  if (pos < 0) return path;
  else return path.substring(pos + 1);
}

/**
 * 获取代码段的方法名
 * @param {*} content
 * @returns
 */
export function getCodeName(content) {
  let searchList = ["export const", "export function"];
  let result = null;
  searchList.map((search) => {
    let pos = content.indexOf(search);
    if (search == searchList[0]) {
      let pos2 = content.indexOf("=", pos + search.length);
      if (pos2 > pos) {
        result = content.slice(pos + search.length, pos2).trim();
      }
    } else {
      let pos2 = content.indexOf("(", pos + search.length);
      if (pos2 > pos) {
        result = content.slice(pos + search.length, pos2).trim();
      }
    }
  });
  return result;
}
/**
 * 获取代码段的代码格式
 * @param {*} path
 * @returns
 */
export function getCodeSuffix(path) {
  return path.match(/[^.]+$/)[0];
}
