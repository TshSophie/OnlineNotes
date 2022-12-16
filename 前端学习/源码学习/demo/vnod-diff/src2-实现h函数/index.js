import h from "./h";

// const myVNode1 = h("div", {}, [
//   h("p", {}, "嘻嘻"),
//   h("p", {}, "哈哈"),
//   h("p", {}, h('span', {}, '呵呵')),
// ]);
// const myVNode1 = h("p", {title: '标题', attr: '属性'}, "嘻嘻")
// const myVNode1 = h("p", {title: '标题', attr: '属性'}, [h("p", {}, "嘻嘻"),h("p", {}, "哈哈"),])
const myVNode1 = h("p", {title: '标题', attr: '属性'}, h("p", {}, "嘻嘻"))
console.log(myVNode1);
