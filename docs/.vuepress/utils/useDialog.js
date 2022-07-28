import Vue from "vue";
export function useDialog(Component, options) {
  return ((Component, options) => {
    return new Promise((resolve, reject) => {
      const ComponentConstructor = Vue.extend(Component);
      if (options && options.ins) {
        // https://blog.csdn.net/qq_14993591/article/details/121174829
        ComponentConstructor.prototype.__proto__ = options.ins.proxy.prototype;
      }
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
  })(Component, options);
}
