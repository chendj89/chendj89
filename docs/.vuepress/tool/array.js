/**
 * @description 两个列表的交集
 * @param {Array} a 列表源数据
 * @param {Array} b 列表源数据
 * @return {Array} 目标数据
 * @example
 */
export const intersection = (a, b, key = null) => {
  return a.filter((i) =>
    key ? b.map((i) => i[key]).includes(i[key]) : b.includes(i)
  );
};
