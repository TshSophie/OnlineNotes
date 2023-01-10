// object表示一个js对象
let a :object;
a = {};
a = function(){};


// {} 用来指定对象中可以包含哪些属性
// 语法：{属性名:属性值, 属性名:属性值}
let b: {name: string};
b = {name: '孙悟空'};
// b = {name: 234}; // The expected type comes from property 'name' which is declared here on type '{ name: string; }'

// 在属性名后边加上?，表示属性是可选的
let c: {name: string, age?:number};
c = {name: '孙悟空', age: 18};

// [propName: string]: any 表示任意类型的属性
let d: {name: string, [propName: string]: any};
d = {name: '猪八戒', a:1, b:2};


/**
 * 设置函数结构的类型声明
 *  语法： (形参: 类型, 形参: 类型 ...)=> 返回值
 */
let e: (a: number, b: number)=>number
e = function(n1, n2):number{
  return n1 + n2;
}


/**
 * 数组的类型声明:
 *    类型[]
 *    Array<类型>
 */
let f: string[];
f = ['a', 'b', 'c'];


/**
 * 元组，就是固定长度的数组
 * 语法：[类型, 类型, 类型]
 */
let h: [string, string];
// h = ['hello', 'abc', '123']; //Type '[string, string, number]' is not assignable to type '[string, string]'.

/**
 * enum 枚举
 */
enum Gender{
  Male = 0,
  Female = 1
}
let i: {name: string, gender: Gender};
i = {
  name: '孙悟空',
  gender: Gender.Female,
}
console.log(i.gender === Gender.Female); 

// &表示同时满足
let j: {name: string} & {age: number};
j = {name: '孙悟空', age: 18};


// 类型别名
type  myType = 1 | 2 | 3 | 4 | 5;
let k: myType;
let l: myType;

