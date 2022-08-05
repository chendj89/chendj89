import Com from "./index.vue";
const install = function (Vue, opts = {}) {
  for (const [attr, value] of Object.entries(opts)) {
    if (Com.props[attr]) {
      Com.props[attr].default = value;
    }
  }
  Vue.component("OkT", Com);
};

export default install;
