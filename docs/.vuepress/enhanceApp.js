import { post, get } from "./utils/axios";
import pageComponents from "@internal/page-components";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./theme/styles/app.scss";
import "./theme/index.scss";

// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  // fixed issue-1173
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component);
  }
  Vue.use(ElementUI);
  Vue.prototype.$http = {
    post,
    get,
  };
  // console.log(Object.keys(Vue.options.components));
};
