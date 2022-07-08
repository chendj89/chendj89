---
title: 哈哈哈1
---


## 表格

:::demo 
table/basic
:::

### 多选

- 手动添加一个 `el-table-column`，设`type`属性为`selection`即可

```vue
<el-table-column type="selection" width="55"></el-table-column>
```
- 状态
  1. indeterminate为 `false` ，v-model为 `true` 的时候，状态为 `全选中`。

  1. indeterminate为 `true` ，v-model为 `false` 的时候，状态为 `半选中`。

  1. indeterminate为 `false` ，v-model为 `false` 的时候，状态为 `未选中`。

:::danger
`el-table`中 `row-key` 未设置时，表格将只有 `全选中` 和 `未选中`
:::

:::demo 
form/checkbox
:::





<!-- 脚本 -->
<script setup>
import { reactive } from "vue";
</script>