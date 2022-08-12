---
title: ts
---

## Typescript 声明文件

普通 declare

```ts
declare function hello1(s: string): void;
```

全局 <vp-word>global</vp-word>
```ts
// 优点是可以和实体方法写在一个文件中

export default function useImport(name?: string) {
  console.log(name + "🤡");
}

declare global {
  /**
   * 导入小丑00
   * @param name
   */
  function useImport(name?: string): void;
}
export function useName() {}
```

