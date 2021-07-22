import observe from "./observe";
import Watcher from './Watcher.js';

let obj = {
  a: "aaaa",
  b: "bbbb",
  c: [
    {
      cc: "ggg",
      dd: "lll"
    }
  ],
  e: {
    f: 'ooo',
    g: 'ppp'
  }
}

// defineReactive(obj, 'a');
observe(obj)
// console.log("-----------【a】----------");
// obj.a
// obj.a = 999
// obj.a
// console.log("-----------【b】----------");
// obj.b
// obj.b = 333
// obj.b
// console.log("-----------【c】---------");
// obj.c[0].cc
// obj.c[0].cc = 222
// obj.c[0].cc
// console.log("-----------【obj】---------");

// console.log('obj.c.__ob__', obj.c.__ob__);

// console.log(obj);
new Watcher(obj, 'a', (val, oldVal) => {
  console.log('★我是watcher，我在监控e', val);
  console.log("oldVal", oldVal);
});
obj.a = "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu";







