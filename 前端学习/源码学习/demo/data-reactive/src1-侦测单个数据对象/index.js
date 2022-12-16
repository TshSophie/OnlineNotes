import defineReactive from "./defineReactive";
// 测试该函数
let obj = {
  a: "aaaa",
  b: "bbbb",
  c: [{ cc: "ggg", dd: "lll" }],
  e: { f: 'ooo',g: 'ppp'}
}
// 侦测obj的a属性
defineReactive(obj, 'a');
// 设置值
obj.a = "update obj.a"
// 读取值
console.log(obj.a)