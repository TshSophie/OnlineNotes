import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器，控制其他所有类
class GameControl{
  // 蛇
  snake: Snake;
  // 食物
  food: Food;
  // 积分牌
  scorelPanel: ScorePanel;

  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = '';
  // 创建一个属性用来记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorelPanel = new ScorePanel();

    this.init();
  }

  init(){
    // 绑定键盘按下事件
    document.addEventListener('keydown', this.keyDownHandler.bind(this));

    // 蛇移动
    this.run();
  }

  // 创建一个键盘按下的响应函数
  /**
   * ArrowRight Right
   * ArrowLeft  Left
   * ArrowUp Up
   * ArrowDown Down
   * @param event 
   */
  keyDownHandler(event: KeyboardEvent){
    // 需要检测event.key的值是否合法（上下左右键）
    this.direction = event.key;
  }

  // 控制蛇移动的方法
  run() {
    /**
     * 根据方向（this.direction）未使蛇的位置改变
     * 向上 top 减少
     * 向下 top 减少
     * 向左 left
     * 向右 left 增加
     */
    // 获取蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    switch(this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;      
    }

    // 检测蛇是否吃到食物
    this.checkEat(X, Y);    

    // 修改蛇的X和Y值
    try{
      this.snake.X = X;
      this.snake.Y = Y;
    } catch(e) {
      // 进入到catch，说明出现异常，游戏结束
      this.isLive = false;
      alert(e.message);
    }

    // 开启定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorelPanel.level - 1) * 30);
  }

  // 检测蛇是否吃到食物
  checkEat(X: number, Y: number){
    if(X === this.food.x && Y === this.food.y) {
      // 食物的位置要进行重置
      this.food.change();
      // 分数增加
      this.scorelPanel.addScore();
      // 蛇增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;