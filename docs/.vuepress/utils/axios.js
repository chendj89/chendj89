export function post(url, params) {
  return new Promise((resolve) => {
    resolve(Mock.mock(params));
  }).then((data) => {
    return {
      code: 0,
      message: "请求成功",
      data: data,
    };
  });
}
export function get(url, params) {
  return new Promise((resolve) => {
    resolve(Mock.mock(params));
  }).then((data) => {
    return {
      code: 0,
      message: "请求成功",
      data: data,
    };
  });
}
