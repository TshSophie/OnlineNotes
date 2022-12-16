/**
 * util.promisify方法可以将函数直接变成promise的封装方式,不用再去手动封装
 */
//引入 util 模块
const util = require('util');
//引入 fs 模块
const fs = require('fs');
//返回一个新的函数
let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./1_demo1.js').then(value => {
  console.log(value.toString());
});