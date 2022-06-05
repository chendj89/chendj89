---
title: Button 按钮
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 基础用法

:::demo 使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

button/basic

:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

:::demo 使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

button/disabled

:::

## 链接按钮

:::warning

`type="text"` 已被 **废弃**，将于版本 <VersionTag version="3.0.0" /> 时 **移除**，请考虑切换至新的 API。

新的 API `link` 于 <VersionTag version="2.2.1" /> 版本添加，同时可以使用 `type` API 设置链接按钮的主题样式。

:::

:::demo

button/link

:::

## 文字按钮

:::tip

文字按钮在现在有了全新的设计样式。 <el-tag round effect="plain" size="small">2.2.0</el-tag> 如果您想要使用老版样式的按钮，可以考虑使用 [Link](./link.md#basic) 组件。

API也已更新，由于 `type` 属性会同时控制按钮的样式， 因此我们通过一个新的 API `text: boolean` 来控制文字按钮。

:::

没有边框和背景色的按钮。

:::demo

button/text

:::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

:::demo 使用 `icon` 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。

button/icon

:::

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用 `<el-button-group>` 对多个按钮分组。

button/group

:::

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

:::tip

您可以使用 `loading` 插槽或 `loadingIcon`属性自定义您的loading图标

ps: `loading` 插槽优先级高于`loadingIcon`属性

:::

:::demo

button/loading

:::


