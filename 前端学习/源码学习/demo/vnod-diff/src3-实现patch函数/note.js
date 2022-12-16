// 1、newVnode和oldVnode是不同类型元素的节点：插入新节点删除旧节点
oldVnode = h("p", {}, "你好p");
newVnode = h("span", {}, "你好span");


// 2、newVnode和oldVnode是相同类型元素的节点：需要精细化比较

// （1）新节点是文本节点: 判断两者的text属性不相同则直接oldVnode.elm.innerText = newVnode.text;
oldVnode1 = h("p", {}, ""); // 或 oldVnode1 = h("p", {}, [...]); 或 oldVnode1 = h("p", {}, h());
newVnode1 = h("p", {}, "你好span");


// （2）新节点不是文本节点，旧节点是文本节点：清空oldVnode的内容，插入newVnode
oldVnode1 = h("div", {}, "");
newVnode1 = h("div", {}, [
    h("p", {}, "A"),
    h("p", {}, "B"),
    h("p", {}, "C"),
]);


// （3）新节点不是文本节点，旧节点含有children属性即新老节点都有children：需要对这两个节点进行diff比较
oldVnode1 = h("div", {}, [
    h("p", {}, "A"),
    h("p", {}, "B"),
    h("p", {}, "C"),
]);
newVnode1 = h("div", {}, [
    h("p", {}, "A"),
    h("p", {}, "B"),
    h("p", {}, "C"),
    h("p", {}, "D"),
]);
