import ButtonBasic from "../examples/button/basic.vue";
import ButtonDisabled from "../examples/button/disabled.vue";
import ButtonGroup from "../examples/button/group.vue";
import ButtonIcon from "../examples/button/icon.vue";
import ButtonLink from "../examples/button/link.vue";
import ButtonLoading from "../examples/button/loading.vue";
import ButtonText from "../examples/button/text.vue";
import DemoContainer from "../examples/demo/container.vue";
import DemoSourcecode from "../examples/demo/sourcecode.vue";
import UploadBox from "../examples/upload/box.vue"
/**
 * 自动导入组件 
 */
export default function imports(app: any) {
  app.component("ButtonBasic", ButtonBasic);
  app.component("ButtonDisabled", ButtonDisabled);
  app.component("ButtonGroup", ButtonGroup);
  app.component("ButtonIcon", ButtonIcon);
  app.component("ButtonLink", ButtonLink);
  app.component("ButtonLoading", ButtonLoading);
  app.component("ButtonText", ButtonText);
  app.component("DemoContainer", DemoContainer);
  app.component("DemoSourcecode", DemoSourcecode);
  app.component("UploadBox", UploadBox)
}