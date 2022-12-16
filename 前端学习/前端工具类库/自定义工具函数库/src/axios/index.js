function axios({method, url, params, data}) {
  method = method.toUpperCase();
  return new Promise((resolve, reject)=>{
    // 处理params对象
    let str = '';
    for(let k in params) {
      str += `${k}=${params[k]}&`;
    }
    if(str) {
      str = str.slice(0, -1);    
      url += '?' + str;
    }

    const xhr = new XMLHttpRequest();
    // 打开连接(初始化请求, 没有请求)
    xhr.open(method, url, true)
    if(method === 'POST' || method === 'PUT' || method === 'DELETE') {
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
    // 设置响应结果的类型为JSON
    xhr.responseType = 'json';
    // 处理结果
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve({
            status: xhr.status,
            message: xhr.statusText,
            body: xhr.response
          });
        } else {
          reject(new Error("请求失败，失败状态码为", xhr.status));
        }
      }
    }
  });
}

axios.get = function(url, options) {
  let config = Object.assign(options, {method: 'GET', url: url});
  return axios(config);
}

axios.post = function(url, options) {
  let config = Object.assign(options, {method: 'POST', url: url});
  return axios(config);
}

axios.put = function(url, options) {
  let config = Object.assign(options, {method: 'PUT', url: url});
  return axios(config);
}

axios.delete = function(url, options) {
  let config = Object.assign(options, {method: 'DELETE', url: url});
  return axios(config);
}