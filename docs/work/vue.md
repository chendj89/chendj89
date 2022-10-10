---
title: vue2
---

## 系统方法

重置 data

```js
Object.assign(this.$data, this.$options.data());
```

重置表单

```js
this.$refs.form.resetFields();
```

cnpm

```sh
npm install -g cnpm --registry=https://registry.npmmirror.com
```

:::demo vue2、vue3`v-bind`、`v-on`快速绑定属性和方法
vue/parent
:::