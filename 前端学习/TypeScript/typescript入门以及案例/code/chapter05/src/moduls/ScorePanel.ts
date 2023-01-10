// 积分牌
class ScorePanel{
  score = 0;
  level = 0;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置变量限制等级
  maxLevel: number;
  // 设置一个变量表示多少分升级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 积分提升
  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    // 判断分数是多少
    if(this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 等级提升
  levelUp() {
    // 等级上限
    if(this.level < this.maxLevel){
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;