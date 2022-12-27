class Promise {

  constructor(executor) {    
    this.PromiseState = "pending";
    this.PromiseResult = null;
    // 保存回调函数
    this.callbacks = [];

    let resolve = (data) => {
      // 控制状态只能修改一次
      if(this.PromiseState !== 'pending') return;
      this.PromiseState = "fulfilled";
      this.PromiseResult = data;
      // 放在定时器里，实现异步效果
      setTimeout(()=>{
        // 调用成功的回调函数
        this.callbacks.forEach(item => {
          item.onResolved(data);
        });
      });
    };

    let reject = (data) => {
      if(this.PromiseState !== 'pending') return;
      this.PromiseState = "rejected";
      this.PromiseResult = data;
      // 放在定时器里，实现异步效果
      setTimeout(()=>{
        // 调用失败的回调函数
        this.callbacks.forEach(item => {
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

  then(onResolved, onRejected) {
    const self = this;
    // 实现异常穿透
    if(typeof onRejected !== 'function') {
      onRejected = reason=>{
        throw reason;
      }
    }
    if(typeof onResolved !== 'function') {
      onResolved = value => value;
    }
    return new Promise((resolve, reject)=>{
      // 封装函数
      let callback = (func)=>{
        try {
          // 获取回调函数的执行结果
          let result = func(this.PromiseResult);
          if(result instanceof Promise){
            result.then(v => {
              resolve(v);
            }, r=>{
              reject(r);
            });
          } else {
            // 结果的对象状态为【成功】
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }
      // 调用回调函数
      if(this.PromiseState === 'fulfilled'){
        // 放在定时器里，实现异步效果
        setTimeout(()=>{
          callback(onResolved);
        });
      }
      if(this.PromiseState === 'rejected'){
        // 放在定时器里，实现异步效果
        setTimeout(()=>{
          callback(onRejected);
        });
      }
      if(this.PromiseState === 'pending'){
        // 保存回调函数
        this.callbacks.push({
          onResolved: ()=>{
            callback(onResolved);
          },
          onRejected: ()=>{
            callback(onRejected);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new Promise((resolve, reject)=>{
      if(value instanceof Promise){
        value.then(v => {
          resolve(v);
        }, r=>{
          reject(r);
        });
      } else {
        // 结果的对象状态为【成功】
        resolve(value);
      }
    });
  }

  static reject(reason){
    return new Promise((resolve, reject)=>{
      return reject(reason);
    });
  }

  // 全部成功时，返回所有成功的promise
  static all(promises){
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let index = 0; index < promises.length; index++) {
        // 获取每个promise的状态结果
        promises[index].then(v=>{
          count++;
          arr[index] = v;
          // 全部成功则返回数组
          if(count == promises.length) {
            resolve(arr);
          }
        }, r=>{
          reject(r);
        });
      }
    }); 
  }

  // 直接谁先执行就返回谁的运行结果即可
  static race(promises){
    //返回结果为promise对象
    return new Promise((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        // 获取每个promise的状态结果
        promises[index].then(v=>{
          //修改返回对象的状态为 『成功』
          resolve(v);
        }, r=>{
          //修改返回对象的状态为 『失败』
          reject(r);
        });
      }
    }); 
  }
}

