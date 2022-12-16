import Dep from "./Dep";
var uid = 0;
// 属性监听器
export default class Watcher{
  constructor(target, expression, callback){
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }

  get() {
    // 进入依赖收集阶段。让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    const obj = this.target;
    var value;

    // 只要能找，就一直找
    try {
      value = this.getter(obj); // obj.expression
    } finally {
      Dep.target = null;
    }
    return value;
  }

  update(){
    this.getAndInvoke(this.callback);
  }

  getAndInvoke(cb) {
    const value = this.get();

    if (value !== this.value || typeof value == 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue);
    }
  }

}

// 对象值获取器，解析对象属性简单路径，'obj.a.b'字符串转换为其真实的值。返回一个回调函数
function parsePath(str) {
  var segments = str.split('.');

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]]
    }
    return obj;
  };
}