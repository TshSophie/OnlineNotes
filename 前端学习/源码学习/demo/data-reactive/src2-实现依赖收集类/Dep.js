let uid = 0;
export default class Dep{
  constructor(){
    this.id = uid++;
    // 存放订阅者（watcher）
    this.subs = [];
  }

  // 添加订阅者
  addSub(sub){
    this.subs.push(sub)
  }

  // 添加依赖
  depend(){
    if(Dep.target){
      console.log("depend添加一个依赖", Dep.target);
      this.addSub(Dep.target);
    }
  }

  // 通知更新
  notify(){
    console.log("notify有数据更新");
    let flag = true;
    // 浅克隆一份
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {  
      flag = false;
      subs[i].update();
      console.log(`----------------------------【执行订阅者${i}的更新操作】--------------------`);
    }
    if(flag)console.log("----------------------------【目前没有订阅者】--------------------");
  }
}