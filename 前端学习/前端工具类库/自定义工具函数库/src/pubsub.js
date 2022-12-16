/**
 * 发布订阅实现
 */
const PubSub = {
}

let callbacksObjs = {
  // channel: {
  //   channel_1: callback1,
  //   channel_2: callback2,
  // }
}
let id = 0;

PubSub.subscribe = function(channel, callback) {
  const token = 'token_' + ++id;
  if(!callbacksObjs[channel]) {
    callbacksObjs[channel] = {
      [token]: callback
    }
  } else {
    callbacksObjs[channel][token] = callback;
  }
  return token;
}

PubSub.publish = function(channel, data) {
  if(callbacksObjs[channel]) {
    // 执行该频道下所有回调
    Object.values(callbacksObjs[channel]).forEach(callback => {
      console.log(data);
      callback(data);
    });
  }
}

PubSub.unsubscribe = function(flag) {
  // 取消所有频道
  if(!flag) {
    callbacksObjs = {}
  } else if(typeof flag === 'string') {
    if(flag.indexOf('token_') === 0) {
      // 取消名为flag的订阅
      const channelObj = Object.values(callbacksObjs).find(channel => channel.hasOwnProperty(flag));
      if(channelObj) {
        delete channelObj[flag];
      }
    } else {
      // 取消整个频道的订阅
      delete callbacksObjs[flag];
    }
  } else {
    throw new Error("参数必须为字符串类型！");
  }
}


/*************************************************************************************************
 * 测试
 */


let pid1 = PubSub.subscribe('pay', (data)=>{
  console.log("商家已接单", data);
});

let pid2 = PubSub.subscribe('pay', (data)=>{
  console.log("骑手取货", data);
});

let pid3 = PubSub.subscribe('cancel', (data)=>{
  console.log("买家取消订单", data);
});

PubSub.publish('pay', {
  id: 1,
  name: "小明"  
});

PubSub.publish('cancel', {
  id: 1,
  name: "小明"  
});

// 取消某个订阅
PubSub.unsubscribe(pid1);
// 取消频道的所有订阅
PubSub.unsubscribe('pay');
console.log(callbacksObjs);
