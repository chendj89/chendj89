import { defineClientConfig } from "@vuepress/client";
import installs from "./config/install";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./theme/theme-chalk/src/reset.scss";
import "./theme/theme-chalk/src/index.scss";
import "./theme/theme-chalk/src/dark/css-vars.scss";
import "./theme/styles/css-vars.scss";
import "./theme/styles/app.scss";
import "./theme/index.scss";
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    installs(app);
    app.use(ElementPlus);
  },
  setup() {},
  rootComponents: [],
});
