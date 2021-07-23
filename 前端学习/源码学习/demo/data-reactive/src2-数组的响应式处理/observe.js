import Observer from "./Observer";
export default function observe(value) {
  // 判断value是否是对象，否则直接返回
  if(typeof value != 'object')return
  // 将value转换为可被侦测的对象
  let ob;
  // 如果value存在__ob__属性，说明已经被转换过了
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}