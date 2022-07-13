export function post(url, params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock(params));
    }, Mock.mock({ "number|1000-2000": 1000 }).number);
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
    setTimeout(() => {
      resolve(Mock.mock(params));
    }, Mock.mock({ "number|1000-2000": 1000 }).number);
  }).then((data) => {
    return {
      code: 0,
      message: "请求成功",
      data: data,
    };
  });
}
