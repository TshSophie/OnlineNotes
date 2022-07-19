let arr = [
  1.5, -12.3, 3.2, -5.5, 23.2, 3.2, -1.4, -12.2, 34.2, 5.4, -7.8, 1.1, -4.9,
];

// 思路一：三重循环，枚举法
// 枚举起点p，范围是从0到K-1，枚举终点q，范围是从p到K-1。这些数字的综合为S(p,q)。
// 区间一头一尾的组合有O(K^2)种。计算S(p,q)，平均要做K/4次加法。
// 这又是一重循环。因此算法总复杂度为O(K^3)。
function findMaxSumRange(values) {
  if (values == null || values.length == 0) return null;
  let start = 0;
  let end = 0;
  let maxSum = Number.MIN_VALUE;
  let K = values.length;
  for (let p = 0; p < K; p++) {
    // 枚举起始位置
    for (let q = p; q < K; q++) {
      // 枚举终点位置
      // 计算子数组的和
      let sum = 0;
      for (let i = p; i <= q; i++) {
        sum += values[i];
      }
      if (maxSum < sum) {
        maxSum = sum;
        start = p;
        end = q;
      }
    }
  }
  return [start, end];
}

console.log(findMaxSumRange(arr));
