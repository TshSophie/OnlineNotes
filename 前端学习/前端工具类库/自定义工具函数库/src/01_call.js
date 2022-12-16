function call(fn, obj, ...args) {
  if(obj === undefined || obj === null) {
    obj = window;
  }
  obj.tempFn = fn;
  const result = obj.tempFn(...args)
  delete obj.tempFn;
  return result;
}


function apply(fn, obj, args) {
  if(obj === undefined || obj === null) {
    obj = window;
  }
  obj.tempFn = fn;
  const result = obj.tempFn(...args)
  delete obj.tempFn;
  return result;
}


function bind(fn, obj, ...args) {
  return (...args2)=>{
    return call(fn, obj, ...args, ...args2);
  }
}


function throttle(callback, wait) {
  let start = 0;
  console.log("throttle...");
  return function(event) {
    const now = Date.now();    
    if(now - start > wait) {
      callback.call(this, event);
      start = now;
    }
    console.log(start)
  }
}


function debounce(callback, wait) {
  console.log("debounce..."); 
  let timeoutId = -1  
  return function(event) {
    // 拦截wait期间的其他事件调用
    if(timeoutId !== -1) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{      
      callback.call(this, event);
      // 成功执行函数后，重置定时器id
      timeoutId = -1;
    }, wait);    
  }
}

/**
 * 测试案例
 */

function add(num1, num2) {
  return num1 + num2 + this.testNum;
}

const obj = {
  testNum: 100
}

// console.log(call(add, obj, 10, 20));
// console.log(apply(add, obj, [10, 20]));
// console.log(bind(add, obj)(10, 20));
// 只跟前面的参数有关
// console.log(bind(add, obj, 1, 2)(10, 20));