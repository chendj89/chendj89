---
title: 飞翔的鱼
sidebar: false
---


<OkT>Hello Vue</OkT>

:::demo
dialog/useer
:::

:::demo 只能输入数字和.
input/numInputContainer
:::

### 引用文件

- 引用整个文件

```md
@[code](@docs/scss/mixin.scss)
```

- 引用文件中的单个或多个方法

```md
@[code {btn}](@docs/scss/mixin.scss)
```

```md
@[code {btn,input}](@docs/scss/mixin.scss)
```

```md
@[code {union}](@docs/.vuepress/tool/array/union.js)
```

### 引用图片

支持图片多格式

```md
![🤡](@docs/.vuepress/public/assets/xiaochou.jpg?width=60px&height=60px)
<!-- 旋转图片 -->
![🤡](@docs/.vuepress/public/assets/xiaochou.jpg?width=60px&height=60px&transform:rotate(45deg))
```

![🤡](@docs/.vuepress/public/assets/xiaochou.jpg?width=60px&height=60px)  

![🤡](@docs/.vuepress/public/assets/xiaochou.jpg?width=60px&height=60px&transform:rotate(45deg))
