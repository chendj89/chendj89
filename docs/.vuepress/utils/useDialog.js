import Vue from "vue";
export function useDialog(Component, options) {
  return ((Component, { $el, ...reset }={}) => {
    return new Promise((resolve, reject) => {
      let target = $el || document.body;
      const ComponentConstructor = Vue.extend(Component);
      if (options && options.ins) {
        // https://blog.csdn.net/qq_14993591/article/details/121174829
        // ComponentConstructor.prototype.__proto__ = options.ins.proxy.prototype;
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
        Object.assign({ el: document.createElement("div") }, {
          propsData:reset
        })
      );
      function destroyInstance() {
        target.removeChild(instance.$el);
        instance.$destroy();
        instance = null;
      }
      target.appendChild(instance.$el);
    });
  })(Component, options);
}

export const useName = () => {
  console.log(this);
};
