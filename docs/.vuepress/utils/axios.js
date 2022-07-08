import axios from "axios";
import mockjs from "mockjs";

export default axios;
export function post(url, params) {
  return new Promise((resolve) => {
    resolve(mockjs.mock(params));
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
    resolve(mockjs.mock(params));
  }).then((data) => {
    return {
      code: 0,
      message: "请求成功",
      data: data,
    };
  });
}
