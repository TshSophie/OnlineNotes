import Watcher from "./Watcher.js";

export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if (this.$el) {
      // 调用函数，让节点变为fragment，类似于mustache中的tokens。实际上用的是AST，这里就是轻量级的，fragment
      let $fragment = this.node2Fragment(this.$el);
      // 编译
      this.compile($fragment);
      // 替换好的内容要上树
      this.$el.appendChild($fragment);
    }
  }
  node2Fragment(el) {
    /*
      1.createDocumentFragment()方法，是用来创建一个虚拟的节点对象，或者说，是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的。
      2.DocumentFragment节点不属于文档树，继承的parentNode属性总是null。它有一个很实用的特点，当请求把一个DocumentFragment节点插入文档树时，插入的不是DocumentFragment自身，而是它的所有子孙节点，即插入的是括号里的节点。这个特性使得DocumentFragment成了占位符，暂时存放那些一次插入文档的节点。它还有利于实现文档的剪切、复制和粘贴操作。 
      另外，当需要添加多个dom元素时，如果先将这些元素添加到DocumentFragment中，再统一将DocumentFragment添加到页面，会减少页面渲染dom的次数，效率会明显提升。
    */
    var fragment = document.createDocumentFragment();

    var child;
    /*
      Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。
      如果将被插入的节点已经存在于当前文档的文档树中，
      那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。
    */
    // 让所有DOM节点，都进入fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(el) {
    // console.log(el);
    // 得到子元素
    var childNodes = el.childNodes;
    var self = this;
    // 这里简化了模板编译，仅处理双大括号变量的情况
    var reg = /\{\{(.*)\}\}/;
    // 这里简化了，处理了最外层的，没有递归处理子节点
    childNodes.forEach((node) => {
      var text = node.textContent;
      text;
      // console.log(node.nodeType);
      // console.log(reg.test(text));
      /*
        nodeType
        1 元素节点      
        2 属性节点
        3 文本节点
      */
      if (node.nodeType == 1) {
        self.compileElement(node);
      } else if (node.nodeType == 3 && reg.test(text)) {
        let name = text.match(reg)[1];
        self.compileText(node, name);
      }
    });
  }

  compileElement(node) {
    // console.log(node);
    // 这里的方便之处在于不是将HTML结构看做字符串，而是真正的属性列表
    var nodeAttrs = node.attributes;
    var self = this;

    // 类数组对象变为数组
    [].slice.call(nodeAttrs).forEach((attr) => {
      // 这里就分析指令
      var attrName = attr.name;
      var value = attr.value;
      // 指令都是v-开头的
      var dir = attrName.substring(2);

      // 看看是不是指令
      if (attrName.indexOf("v-") == 0) {
        // v-开头的就是指令
        if (dir == "model") {
          console.log('发现了model指令', value);
          new Watcher(self.$vue, value, (value) => {
            node.value = value;
          });
          var v = self.getVueVal(self.$vue, value);
          node.value = v;

          // 添加监听
          node.addEventListener("input", (e) => {
            var newVal = e.target.value;
            self.setVueVal(self.$vue, value, newVal);
            v = newVal;
          });
        } else if (dir == "if") {
          console.log('发现了if指令', value);
        }
      }
    });
  }

  compileText(node, name) {
    // console.log('AA', name);
    // console.log('BB', this.getVueVal(this.$vue, name));
    node.textContent = this.getVueVal(this.$vue, name);
    new Watcher(this.$vue, name, (value) => {
      node.textContent = value;
    });
  }

  getVueVal(vue, exp) {
    var val = vue;
    exp = exp.split(".");
    exp.forEach((k) => {
      val = val[k];
    });

    return val;
  }

  setVueVal(vue, exp, value) {
    var val = vue;
    exp = exp.split(".");
    exp.forEach((k, i) => {
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
}
