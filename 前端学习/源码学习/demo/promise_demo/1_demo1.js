/**
 * 1.使用 promise 封装基于定时器的异步
 */
function delay(waitTime) {
  return new Promise((resolve, reject)=>{
    console.info("启动异步定时任务...")
    setTimeout(()=>{
      const now = Date.now();
      if(now % 2 == 1) {
        resolve("中奖了！" + now);
      } else {
        reject("失败了~" + now);
      }
    }, waitTime);
  });
}
const promise = delay(1000);

promise.then((result)=>{
  console.log("result： ", result);
}, (reason)=>{
  console.log("reason： ", reason);  
});