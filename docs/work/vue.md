---
title: vue2
---

## 系统方法

重置data
```js 
Object.assign(this.$data, this.$options.data());
```

重置表单 
```js 
this.$refs.form.resetFields();
```
