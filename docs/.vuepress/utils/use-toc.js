import { computed } from "vue";
export const useToc = (vm) => {
  let headers = vm.$page.headers;
  return computed(() => resolveHeaders(headers));
};
export const resolveHeaders = (headers) => {
  return mapHeaders(groupHeaders(headers));
};
export function groupHeaders(headers) {
  if (!headers) {
    return [];
  }
  headers = headers.map((h) => Object.assign({}, h));

  let lastH2;

  headers.forEach((h) => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter((h) => h.level === 2);
}

export function mapHeaders(headers) {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: header.children ? mapHeaders(header.children) : undefined,
  }));
}
