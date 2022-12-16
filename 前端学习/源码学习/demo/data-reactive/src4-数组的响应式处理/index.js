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
    {      
      cc: "gggg",
      dd: "llll"
    },
    {      
      cc: "ggggg",
      dd: "lllll"
    }
  ],
  e: {
    f: 'ooo',
    g: 'ppp'
  }
}

observe(obj)
// console.log("---------------------【测试普通属性obj.a的修改和读取】----------");
// // 监听obj的a属性
// new Watcher(obj, 'a', (val, oldVal) => {
//   console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的a属性值发生了改变★★★★★★★★★★');
//   console.log("oldVal", oldVal, "newVal", val);
// });
// obj.a = 999

// console.log("---------------------【测试子属性obj.e.f的修改和读取】----------");
// // 监听obj的e.f属性
// new Watcher(obj, 'e.f', (val, oldVal) => {
//   console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的e.f属性值发生了改变★★★★★★★★★★');
//   console.log("oldVal", oldVal, "newVal", val);
// });
// obj.e.f = 'modify f'
// 监听obj的c属性
new Watcher(obj, 'c', (val, oldVal) => {
  console.log('★★★★★★★★★★★★我是watcher的回调函数,我监控的c属性值发生了改变★★★★★★★★★★');
  console.log("oldVal", oldVal, "newVal", val);
});
console.log("---------------------【测试数组属性使用push()改变数据是否有被侦测】---------");
obj.c.push({'ee': 'push'})
// console.log("---------------------【测试数组属性使用pop()改变数据是否有被侦测】---------");
// obj.c.pop()
// console.log("---------------------【测试数组属性使用unshift()改变数据是否有被侦测】---------");
// obj.c.unshift({'aaa': 'unshift'})
// console.log("---------------------【测试数组属性使用reverse()改变数据是否有被侦测】---------");
// obj.c.reverse()
// console.log("---------------------【测试数组属性使用sort()改变数据是否有被侦测】---------");
// obj.c.sort()
// console.log("---------------------【测试数组属性使用shift()改变数据是否有被侦测】---------");
// obj.c.shift()
// console.log("---------------------【测试数组属性使用splice()改变数据是否有被侦测】---------");
// obj.c.splice(0, 1)