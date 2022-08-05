import Index from "./index.vue";
const install = function (Vue, opts = {}) {
  let Index2=Vue.extend(Index,{
    propsData:{
      item1:9
    }
  });
  Vue.component("OkT", Index2);
};

export default install;
