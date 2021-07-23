## 第一章

> **使用前沿技术、利用工具辅助开发的重要性**



### transpiling

网站 /app 可能需要支持并**未提供这些新特性的旧版浏览器**，而功能特性 的快速进化使得这个问题更加严峻。

如何解决这个矛盾呢？

**答案是工具化（提供工具）。**具体来说是一种称为 transpiling（transformation ＋ compiling，转换＋编译）的技术。简单地说，其思路是利用 专门的工具把你的 ES6 代码转化为等价（或近似！）的可以在 ES5 环境下工作的代码。



### shim/polyfill

并非所有的 ES6 新特性都需要使用 transpiler，还有 polyfill（也称为 shim）这种模式。在可能的情况下，polyfill 会为新环境中的行为定义在旧环境中的等价行为。语法不能 polyfill，而 API 通常可以。

```js
if (!Object.is) {
 Object.is = function(v1, v2) {
 // 检查-0
 if (v1 === 0 && v2 === 0) {
 return 1 / v1 === 1 / v2;
 }
 // 检查NaN
 if (v1 !== v1) {
 return v2 !== v2;
 }
 // 其余所有情况
 return v1 === v2;
 };
}
```

这里有一组名为“ES6 Shim”的 ES6 shim 实现（https:// github.com/paulmillr/es6-shim/）， 你一定要把它作为一个标准放在你所有的 JavaScript 新项目中。



人们认为 JavaScript 会持续不断地发展，浏览器会逐渐地而不是以大规模突变的形式支持 新特性。**所以，保持 JavaScript 发展更新的最好战略就是在你的代码中引入 polyfill shim， 并且在构建过程中加入 transpiler 步骤，现在就开始接受并习惯这个新现实吧。**

如果还要保持现状，等着所有浏览器都支持某个特性才开始应用这个特性，那么你就已经 落后了。你将遗憾地错过所有设计用于使得编写 JavaSript 更高效健壮的创新。

不管未来的 JavaScript 采用何种版本标识，它的发展都会比过去要快得多。transpiler 和 shim/polyfill 都是重要的工具，它们能帮助你保持处于这个语言发展的最前沿。





## 第二章

不要依赖于 const 来规范代码行为，而是在意图清晰的时候，把它作为一个表 明意图的工具。



