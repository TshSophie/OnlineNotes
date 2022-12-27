/**
 * 中断 promise 链
 */
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 1000);
});

p.then((value) => {
  console.log(111);
})
.then((value) => {
  // 有且只有这一个方式
  return new Promise(() => {});
}) 
.then((value) => {
  console.log(222);
})
.then((value) => {
  console.log(333);
})
.catch((reason) => {
  console.warn(reason);
});
