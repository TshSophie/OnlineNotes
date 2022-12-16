export default function defineReactive(data, key, val) {
    // 获取对象属性原来的值
    if (arguments.length == 2) {
      val = data[key];
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get(){
        console.log("获取数据: ", val);
        // todo：在此可执行获取时数据的钩子操作
        return val
      },
      set(newValue){
        console.log("设置新的值：", newValue);
        // todo：在此可执行数据设置时的钩子操作
        if (val === newValue) {
          return;
        }
        val = newValue;
      }
    })
  }