---
title:
en:
---

## 已知 Bug

1、`el-tooltip` 无法显示精准问题

超链接上显示 `el-tooltip` ，页面跳转后 `el-tooltip`已经存在

2、`el-table` 有`fixed`、`show-summary`属性时,`fixed`的滚动条将无法滚动

3、日期组件报错 <el-tag size="mini">指定版本：2.15.8</el-tag>

```js
// Prop being mutated: "placement"
```

临时应急方式

```js
import Vue from "vue";
import ElementUI from "element-ui";
function RepairProps(cmp) {
  (cmp.mixins || []).forEach((mixin) => {
    if (mixin.props && mixin.props.placement) {
      const defaultValue = mixin.props.placement.default;
      mixin.data = new Proxy(mixin.data, {
        apply(target, thisArg, argArray) {
          const res = Reflect.apply(target, thisArg, argArray);
          return {
            ...(res || {}),
            placement: defaultValue,
          };
        },
      });
      delete mixin.props.placement;
    }
    if (mixin.mixins && mixin.mixins.length > 0) {
      RepairProps(mixin);
    }
  });
}

RepairProps(ElementUI.DatePicker);
RepairProps(ElementUI.TimePicker);
RepairProps(ElementUI.TimeSelect);
Vue.use(ElementUI);
```
4、`el-dialog`弹窗显示时，按`esc`主体消失但遮罩不消失

解决方案：
```js
// 遮罩层会插入至 Dialog 的父元素上
"modal-append-to-body":false
```
5、`el-dialog`弹窗中再显示弹窗,`el-dialog`遮罩(`z-index`)层级不对，
