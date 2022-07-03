/**
 * 名称开头大写
 * @param name
 */
export function NametoUpperCase(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
}

export const throttleAndDebounce = (fn, delay) => {
  let timeout;
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

export function insertLinkIcon(contentRef) {
  const links = Array.from(
    contentRef.value?.$el?.querySelectorAll <
      HTMLLinkElement >
      "a:not(.header-anchor)" ?? []
  );

  links.forEach((link) => {
    link.classList.add("vp-link");
    if (
      !link.href.startsWith(window.origin) &&
      !link.innerHTML.includes("<img")
    ) {
      link.innerHTML = `
        ${link.innerHTML}
        <svg class="link-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path
            d="
              M853.333333 469.333333a42.666667 42.666667 0 0 0-42.666666
              42.666667v256a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667
              42.666667 0 0 1-42.666667-42.666667V256a42.666667
              42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667
              0 0 0 0-85.333333H256a128 128 0 0 0-128 128v512a128 128
              0 0 0 128 128h512a128 128 0 0 0 128-128v-256a42.666667
              42.666667 0 0 0-42.666667-42.666667z
            "
            fill="currentColor">
          </path>
          <path
            d="
              M682.666667 213.333333h67.413333l-268.373333 267.946667a42.666667
              42.666667 0 0 0 0 60.586667 42.666667 42.666667
              0 0 0 60.586666 0L810.666667 273.92V341.333333a42.666667
              42.666667 0 0 0 42.666666 42.666667 42.666667 42.666667 0 0 0
              42.666667-42.666667V170.666667a42.666667 42.666667 0 0
              0-42.666667-42.666667h-170.666666a42.666667
              42.666667 0 0 0 0 85.333333z
            "
            fill="currentColor"
          >
          </path>
        </svg>
        `;
    }
  });
}

export function insertTableWrapper(contentRef) {
  const tables = Array.from(
    contentRef.value?.$el.querySelectorAll(
      "table:not(.el-table__body):not(.el-table__header)"
    ) ?? []
  );
  tables.forEach((table) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("vp-table");
    table.parentNode.insertBefore(wrapper, table);
    table.parentNode.removeChild(table);
    wrapper.appendChild(table);
  });
}
