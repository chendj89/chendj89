import Vue from "vue";
export function useDialog(Component,options) {
  return ((options) => {
    return new Promise((resolve, reject) => {
      const ComponentConstructor = Vue.extend(Component);
      ComponentConstructor.prototype.$resolve = function (params) {
        destroyInstance();
        resolve(params);
      };
      ComponentConstructor.prototype.$reject = function (params) {
        destroyInstance();
        reject(params);
      };
      let instance = new ComponentConstructor(
        Object.assign({ el: document.createElement("div") }, options)
      );
      function destroyInstance() {
        document.body.removeChild(instance.$el);
        instance.$destroy();
        instance = null;
      }
      document.body.appendChild(instance.$el);
    });
  })(Component,options);
}
