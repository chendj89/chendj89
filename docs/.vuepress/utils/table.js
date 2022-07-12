/**
 * 表格统计
 * @param {Object} obj 对象参数
 * @param {Array} obj.arr 允许进行统计的列集合
 * @param {Object} obj.total 统计
 * @param {Number} obj.total.index 统计出现的位置，默认为0
 * @param {String} obj.total.name 统计的名称
 * @param {String} obj.total.column 统计跨越几行 默认1行
 * @param {String} obj.spanArr 指定合并列的数组，用于单页面多表格统计
 * @param {Function} obj.custom 定制统计 可选项、独立项 需要返回统计数组 可选
 * @param {Function} obj.format 格式化统计结果 format接受一个num数 可选
 * @param {Array} obj.rowProperty 哪些属性需要特殊统计 可选
 */
export function mixin_tableSummary(obj) {
  if (!obj) {
    console.warn(`请配置统计参数`);
    return;
  }
  if (obj.hasOwnProperty('custom')) {
    return function (param) {
      const { columns, data } = param;
      let columnLen = columns.length;
      let sums = new Array(columnLen).fill('');
      let columnNames = new Array(columnLen).fill('');
      columns.forEach((column, index) => {
        columnNames[index] = column.property;
      });
      let list = obj.custom({
        columnNames,
        columns,
        data,
      });
      list.map((item, index) => {
        // 判空
        if (columnLen >= index) {
          if (!isNaN(Number(item))) {
            // 如果有格式化
            sums[index] = obj.format
              ? obj.format({
                  num: item,
                  name: columnNames[index],
                  index: index,
                  sum: sums,
                })
              : item;
          } else {
            sums[index] = item;
          }
        }
      });
      return sums;
    };
  } else {
    let that = this;
    return function (param) {
      // columns=列
      // data =数据
      const { columns, data } = param;
      const sums = [];
      // 循环列 判断哪些列需要统计
      columns.forEach((column, index) => {
        // 统计
        if (obj.total) {
          if (obj.total.index == index) {
            sums[index] = obj.total.name;
            return;
          }
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          // 只有允许的列才允许统计
          if (obj.arr.includes(index)) {
            sums[index] = values.reduce((prev, curr, index2) => {
              const value = Number(curr);
              // 判断数字
              if (!isNaN(value)) {
                
                // 判断是否指定列进行特殊统计
                if (obj.hasOwnProperty('rowProperty') && obj.rowProperty.includes(column.property)) {
                  // 判断合并列什么时候进行统计
                  // 或者 只统计合并列的第一项
                  // spanArr不存在时，说明没有合并单元格
                  if(obj.spanArr){
                    if(that[obj.spanArr][index2]){
                      return prev + curr;
                    }else {
                      return prev
                    }
                  }else {
                    return prev+curr;
                  }
                } else {
                  return prev + curr;
                }
              } else {
                return prev;
              }
            }, 0);
            if (obj.format) {
              sums[index] =
                obj.format({
                  num: sums[index],
                  name: column.property,
                  sum: sums,
                  index: index,
                }) + '';
            } else {
              // 统计
              sums[index] += '';
            }
          } else {
            // 虽然是数字可以统计，但不被允许
            sums[index] = '';
          }
        } else {
          // N/A =>""
          sums[index] = '';
        }
      });
      return sums;
    };
  }
}