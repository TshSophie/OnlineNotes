
import def from "./def";
import defineReactive from "./defineReactive";
import observe from "./observe";
export default class Observer {
  constructor(value) {
    // 给实例添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false);
    // console.log('我是Observer构造器', value);
    // Observer类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以被侦测的）的object
    // 检查它是数组还是对象
    if (Array.isArray(value)) {
      // 如果是数组：将这个数组的原型，指向arrayMethods
      // Object.setPrototypeOf(value, arrayMethods);
      // 让这个数组变的observe
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  // 遍历
  walk(value) {
    for (let k in value) {
      defineReactive(value, k);
    }
  }
  // 数组的特殊遍历
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      console.log('arr[i]', arr[i]);
      // 逐项进行observe
      observe(arr[i]);
    }
  }
};