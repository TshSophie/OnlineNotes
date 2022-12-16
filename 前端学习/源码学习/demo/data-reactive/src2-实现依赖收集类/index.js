import Dep from "./Dep";
import Watcher from "./Watcher";

export default function defineReactive(data, key, val) {
  const dep = new Dep();

  // 获取对象属性原来的值
  if (arguments.length == 2) {
    val = data[key];
  }
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get(){
      if (Dep.target) {
        console.log("get收集依赖: ", val);
        dep.depend();        
      }
      return val
    },
    set(newValue){
      if (val === newValue) {
        return;
      }
      val = newValue;      
      console.log("set触发通知：", dep);      
      dep.notify();
    }
  })
}
// 测试该函数
let obj = {
  a: "aaaa",
  b: "bbbb",
  c: [{ cc: "ggg", dd: "lll" }],
  e: { f: 'ooo',g: 'ppp'}
}
// 将obj的a属性变为可侦测属性
console.log("-----------------------------将obj的a属性变为可侦测属性-----------------------------------------")
defineReactive(obj, 'a');
// 监听obj的a属性
new Watcher(obj, 'a', (val, oldVal) => {
  console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的a属性值发生了改变★★★★★★★★★★');
  console.log("oldVal", oldVal, "newVal", val);
});
// console.log("-----------------------------更改obj.a的值-----------------------------------------")
obj.a = "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu";
// 将obj的b属性变为可侦测属性
// defineReactive(obj, 'b');
// obj.b = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"