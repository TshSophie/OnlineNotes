import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(data, key, val) {
  const dep = new Dep();
  // 获取对象属性原来的值
  if (arguments.length == 2) {
    val = data[key];
  }

  // 子元素要进行observe，至此形成了递归。
  // 这个递归不是函数自己调用自己，而是多个函数、类循环调用
  let childOb = observe(val);

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get(){
      console.log("获取数据: ", val);
      // 如果现在处于依赖收集阶段
      if (Dep.target) {
        console.log("------【依赖收集阶段】-------");
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
      }
      return val
    },
    set(newValue){
      console.log("设置新的值：", newValue);
      if (val === newValue) {
        return;
      }
      val = newValue;
      // 当设置了新值，这个新值也要被observe
      childOb = observe(newValue);
      // 发布订阅模式，通知dep
      dep.notify();
      console.log("------【发布订阅模式，通知dep】-------");
    }
  })
}