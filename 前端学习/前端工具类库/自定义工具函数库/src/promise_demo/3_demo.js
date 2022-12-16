/**
 * 3.fs模块使用Promise
 */
const fs = require('fs');
function myReadFile(path) {
  return new Promise((resolve, reject)=>{
    fs.readFile(path, (err, data)=>{
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


myReadFile('./1_demo1.js2').then((ret=>{
  console.log(ret.toString());
})
// , reason=>{
//   console.log(reason);
// }
).catch(err=>{
  console.log("这是catch的")
});

/**
 * 可以在每个then()的第二个回调函数中进行err处理,也可以利用异常穿透特性,
 * 到最后用catch去承接统一处理,两者一起用时,
 * 前者会生效(因为err已经将其处理,就不会再往下穿透)而走不到后面的catch,
 * 在每个.then()中我可以将数据再次传出给下一个then()
 */