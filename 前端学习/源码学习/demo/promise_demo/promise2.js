function Promise(executor) {
  this.PromiseState = "pending";
  this.PromiseResult = null;
  // 保存回调函数
  this.callbacks = [];

  resolve = (data) => {
    console.log("resolve被调用...");
    // 控制状态只能修改一次
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = data;
    // 放在定时器里，实现异步效果
    setTimeout(() => {
      // 调用成功的回调函数
      this.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  };

  reject = (data) => {
    console.log("reject被调用...");
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    this.PromiseResult = data;
    // 放在定时器里，实现异步效果
    setTimeout(() => {
      // 调用失败的回调函数
      this.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  };

  try {
    // 同步调用【执行器函数】
    executor(resolve, reject);
  } catch (error) {
    // 修改promise的状态为【失败】
    reject(error);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 实现异常穿透
  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }
  if (typeof onResolved !== "function") {
    onResolved = (value) => value;
  }
  return new Promise((resolve, reject) => {
    // 封装函数
    let callback = (func) => {
      try {
        // 获取回调函数的执行结果
        let result = func(this.PromiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => {
              resolve(v);
            },
            (r) => {
              reject(r);
            }
          );
        } else {
          // 结果的对象状态为【成功】
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    };
    // 调用回调函数
    if (this.PromiseState === "fulfilled") {
      // 放在定时器里，实现异步效果
      setTimeout(() => {
        callback(onResolved);
      });
    }
    if (this.PromiseState === "rejected") {
      // 放在定时器里，实现异步效果
      setTimeout(() => {
        callback(onRejected);
      });
    }
    if (this.PromiseState === "pending") {
      // 保存回调函数
      this.callbacks.push({
        onResolved: () => {
          callback(onResolved);
        },
        onRejected: () => {
          callback(onRejected);
        },
      });
    }
  });
};

let p1 = new Promise((resolve, reject) => {
  console.log("我是promise...");
  setTimeout(() => {
    resolve("OK");
  });
});
