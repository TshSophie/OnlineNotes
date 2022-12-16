import observe from "./observe";
import Watcher from "./Watcher";

let obj = {
  a: "aaaa",
  b: "bbbb",
  c: [
    {
      cc: "ggg",
      dd: "lll"
    },
  ],
  e: {
    f: 'ooo',
    g: 'ppp'
  }
}

observe(obj)
console.log("---------------------【测试普通属性obj.a的修改和读取】----------");
// 监听obj的a属性
new Watcher(obj, 'a', (val, oldVal) => {
  console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的a属性值发生了改变★★★★★★★★★★');
  console.log("oldVal", oldVal, "newVal", val);
});
obj.a = 999

console.log("---------------------【测试子属性obj.e.f的修改和读取】----------");
// 监听obj的e.f属性
new Watcher(obj, 'e.f', (val, oldVal) => {
  console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的e.f属性值发生了改变★★★★★★★★★★');
  console.log("oldVal", oldVal, "newVal", val);
});
obj.e.f = 'modify f'
console.log("---------------------【测试数组元素属性obj.c的修改和读取】---------");
// 监听obj的c属性
new Watcher(obj, 'c', (val, oldVal) => {
  console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的c属性值发生了改变★★★★★★★★★★');
  console.log("oldVal", oldVal, "newVal", val);
});
console.log("---------------------【测试数组属性使用赋值改变数据是否有被侦测】---------");
obj.c = [{'ccc': 'gggg'}]

console.log("---------------------【测试数组属性使用push()改变数据是否有被侦测】---------");
obj.c.push({'ee': 'push'})
