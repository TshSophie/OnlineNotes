## 插槽slot的基本使用


## `this.$slots`
可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
```js
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```

也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：
```js
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
```
