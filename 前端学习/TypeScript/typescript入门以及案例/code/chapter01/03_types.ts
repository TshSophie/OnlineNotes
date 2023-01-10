//  使用字面量进行类型声明
let a : 10;
a = 10;
// a = 11; // Type '11' is not assignable to type '10'.ts(2322)

// 可以使用 | 来连接多个类型(联合类型)
let b: "male" | "female";
b = "male";
b = "female";
// b = "aaa"; // Type '"aaa"' is not assignable to type '"male" | "female"'.ts(2322)

let c: boolean | string;
c = true;
c = "hello";
// c = 123; // Type '123' is not assignable to type 'string | boolean'.ts(2322)

 
// any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
// 使用TS时，不建议使用any类型
let d: any;
d = 10;
d = 'hello';
d = true;

let e: unknown;
e = 10;
e = "hello";
e = true;

let s:string;
s = d;  // d的类型时any，它可以赋值给任意变量

// unknown 实际上就是一个类型安全的any
// unknown 类型的变量，不能直接赋值给其他变量
// s = e; // Type 'unknown' is not assignable to type 'string'.ts(2322)
if(typeof e == "string") {
  s = e;
}

// 类型断言 可以告诉解析器变量的实际类型
/**
 * 语法：
 * 变量 as 类型
 * <类型> 变量
 */
s = e as string;
s = <string>e;

// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void {
  // return 123; // Type 'number' is not assignable to type 'void'.ts(2322)
  return undefined
}

// never 表示永远不会返回结果
function fn2(): never {
  throw new Error("报错了");
}