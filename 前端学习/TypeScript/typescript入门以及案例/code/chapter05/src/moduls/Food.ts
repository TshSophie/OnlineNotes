// 食物类
class Food{
  // 食物对应的元素
  element: HTMLElement;

  constructor() {
    // 获取food元素
    this.element = document.getElementById('food')!;

  }

  // 获取食物x坐标
  get x() {
    return this.element.offsetLeft;
  }

  // 获取食物y坐标
  get y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成随机的位置
    // x,y: 0~290,且每次移动一格为10像素
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;