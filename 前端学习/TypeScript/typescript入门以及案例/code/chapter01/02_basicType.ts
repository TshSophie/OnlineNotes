// 声明一个变量，同时指定它的类型为number
let a: number;

a = 10;
// a = 'hello'; // error: Type 'string' is not assignable to type 'number'.ts(2322)

let b: string;
b = 'hello';
// b = 123; // Type 'number' is not assignable to type 'string'.ts(2322)

// 声明完变量直接进行赋值
let c: boolean = false;
c = true;

// TS可以自动对变量进行类型检测
let d = false;
// d = 123; // Type 'number' is not assignable to type 'boolean'.ts(2322)

// js中函数不考虑参数的类型和个数,TS可以指定限制参数类型和个数以及返回值类型
function sum(a: number, b: number): number{
  return a + b;
}
//sum(2, '3'); // Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
// sum(1,2,3); // Expected 2 arguments, but got 3.ts(2554)

let result = sum(123,456); // let result: number


