import axios from "axios";
export function post(url, params) {
  if (url.includes("mock")) {
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
  }else {
    return axios.post(url,params)
  }
}
export function get(url, params) {
  if (url.includes("mock")) {
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
  }else {
    return axios.get(url,{
      params
    })
  }
}

export { axios };
