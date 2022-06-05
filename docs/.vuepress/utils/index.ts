/**
 * 名称开头大写
 * @param name
 */
export function NametoUpperCase(name: string) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  let called = false;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeout = setTimeout(fn, delay);
    }
  };
};
