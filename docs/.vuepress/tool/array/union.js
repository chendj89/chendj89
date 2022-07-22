/**
 * 并集
 * @param {Array} a 列表源数据
 * @param {Array} b 列表源数据
 * @return {Array} 目标数据
 */
export const union = (a, b, key = null) => {
  return [
    ...a,
    ...b.filter((i) =>
      key ? !a.map((i) => i[key]).includes(i[key]) : !a.includes(i)
    ),
  ];
};
