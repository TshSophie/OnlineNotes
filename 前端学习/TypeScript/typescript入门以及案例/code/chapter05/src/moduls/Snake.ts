class Snake{
  // 表示蛇的元素
  head:HTMLElement;
  // 蛇的身体（包括蛇头）
  bodies: HTMLCollection;
  // 获取蛇的容器
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div');    
  }

  // 获取蛇的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value: number) {
    // 新旧值相同，不需要修改
    if(this.X == value) return;
    // X合法值0-290
    if(value < 0 || value > 290) {
      // 蛇撞墙，抛出异常
      throw new Error("蛇撞墙了！");
    }

    // 蛇掉头屏蔽，正在向左走不可以按右键，反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
      console.log("水平方向发生掉头");
      // 如果发生掉头，应该反方向继续行走
      if(value > this.X) {
        value = this.X - 10;
      }else{
        value = this.X + 10;
      }
    }

    // 移动蛇身
    this.moveBody();

    this.head.style.left = value + 'px';

    // 检查蛇是否撞到自己
    this.checkHeadBody();
  }

  set Y(value: number) {
    if(this.Y == value) return;
    // Y合法值0-290
    if(value < 0 || value > 290) {
      // 蛇撞墙，抛出异常
      throw new Error("蛇撞墙了！");
    }

    // 蛇掉头屏蔽，正在向上走不可以按下方向键，反之亦然
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
      console.log("垂直方向发生掉头");
      // 如果发生掉头，应该反方向继续行走
      if(value > this.Y) {
        value = this.Y - 10;
      }else{
        value = this.Y + 10;
      }
    }

    // 移动蛇身
    this.moveBody();

    this.head.style.top = value + 'px';

    // 检查蛇是否撞到自己
    this.checkHeadBody();
  }

  // 蛇增加身体的方法
  addBody() {
    // 向element中添加一个div
    let tempDiv = document.createElement('div');
    this.element.insertAdjacentElement('beforeend', tempDiv);
  }

  // 添加一个蛇身体移动的方法
  moveBody(){
    /**
     * 后边的身体设置位前边身体的位置
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      
      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检测蛇撞到自己
  checkHeadBody(){
    // 获取所有的身体(非0)，检测其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let body = this.bodies[i] as HTMLElement;
      // 蛇头撞到自己
      if(this.X === body.offsetLeft && this.Y === body.offsetTop) {
        throw new Error("撞到自己");
      }      
    }
  }
}

export default Snake;