/*****************************1、上台阶问题************************************** */
// 思路1：至顶向下看问题，递归求解
// 如我们到要走到第8个台阶，根据每一次只能上1或2个台阶，那么上一步不是在第8-1个台阶就是在第8-2=6个台阶上，如此倒推下去......
// 假设n阶台阶有f(n)种走法，可以通过递归的方式进行求解。因为一步可以上1阶或者2阶台阶，
// 那如果先上1个台阶则只需求出剩下的n-1个台阶的走法，如果先上2个台阶则只需求出剩下的n-2个台阶的走法，
// 所以求n个台阶的走法变为求n-1和n-2个台阶的走法，则有f(n) = f(n - 1) + f(n - 2)(其中n > 2)。
// 1 2 3 5 8 13 21 34 55 89
function jumpStep(n) {
  if(n <= 0) return -1;
  if(n < 3) return n;
  return jumpStep(n - 1) + jumpStep(n - 2);
}

// 思路1-1 记忆化递归算法，将计算过的值缓存起来，减少重复计算
function jumpStepImp(n, cache) {
  if(cache[n]) return cache[n];
  if(n <= 0) return -1;
  if(n < 3) return cache[n] = n;
  cache[n] = jumpStep(n - 1) + jumpStep(n - 2);
  return cache[n]
}

// 思路2：至底向上，动态规划求解
// 该问题当前状态只和之前的两个状态有关，因此可以采用动态规划，逐步解决问题
// dp[i]=max(dp[i-1]+values[i], values[i])
function jumpStepDp(n) {
	if(n <= 0)
		return 0;
  let step = 0;
  let fStep = 1;
  let ffStep = 0;
  for(let i = 1; i <= n; ++i)
  {
    step = fStep + ffStep;
    ffStep = fStep;
    fStep = step;
  }
  return step;
}

// console.log(jumpStep(8))
// console.log(jumpStepImp(8, []))
// console.log(jumpStepDp(8))

/*****************************2、汉诺塔问题************************************** */
// 解题思路：
// 对于 n 个圆盘的汉诺塔问题，移动圆盘的过程是：
// 将起始柱上的 n-1 个圆盘移动到辅助柱上；
// 将起始柱上遗留的 1 个圆盘移动到目标柱上；
// 将辅助柱上的所有圆盘移动到目标柱上。
let num = 0;
function moveTo(from, to) {
  num++
  console.log(`${num}: ${from} -> ${to}`);
}

// 把n个盘子从from移动到to，用aux做中转
function Hanoi(A, B, aux, n) {
  if(n < 2) {
    return moveTo(A, B);
  }
  // 把n-1个盘子从A移动到aux，用B做中转
  Hanoi(A, aux, B, n-1)
  moveTo(A, B);
  // 把n-1个盘子从aux移动到B，用B做中转
  Hanoi(aux, B, A, n-1)
}
Hanoi('A', 'B', 'T', 5)