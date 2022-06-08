import ButtonBasic from "../examples/button/basic.vue";
import ButtonDisabled from "../examples/button/disabled.vue";
import ButtonGroup from "../examples/button/group.vue";
import ButtonIcon from "../examples/button/icon.vue";
import ButtonLoading from "../examples/button/loading.vue";
import ButtonText from "../examples/button/text.vue";
import DemoContainer from "../examples/demo/container.vue";
import DemoFooter2 from "../examples/demo/footer2.vue";
import DemoScene from "../examples/demo/scene.vue";
import DemoSidebarlink from "../examples/demo/sidebarlink.vue";
import DemoSlidebar from "../examples/demo/slidebar.vue";
import DemoSourcecode from "../examples/demo/sourcecode.vue";
import DemoToc from "../examples/demo/toc.vue";
import UploadBox from "../examples/upload/box.vue"
/**
 * 自动导入组件 
 */
export default function imports(app: any) {
  app.component("ButtonBasic", ButtonBasic);
  app.component("ButtonDisabled", ButtonDisabled);
  app.component("ButtonGroup", ButtonGroup);
  app.component("ButtonIcon", ButtonIcon);
  app.component("ButtonLoading", ButtonLoading);
  app.component("ButtonText", ButtonText);
  app.component("DemoContainer", DemoContainer);
  app.component("DemoFooter2", DemoFooter2);
  app.component("DemoScene", DemoScene);
  app.component("DemoSidebarlink", DemoSidebarlink);
  app.component("DemoSlidebar", DemoSlidebar);
  app.component("DemoSourcecode", DemoSourcecode);
  app.component("DemoToc", DemoToc);
  app.component("UploadBox", UploadBox)
}