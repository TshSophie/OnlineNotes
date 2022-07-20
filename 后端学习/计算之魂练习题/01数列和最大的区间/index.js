let arr = [
  1.5, -12.3, 3.2, -5.5, 23.2, 3.2, -1.4, -12.2, 34.2, 5.4, -7.8, 1.1, -4.9,
];

// 思路一：三重循环，枚举法
// 枚举起点p，范围是从0到K-1，枚举终点q，范围是从p到K-1。这些数字的综合为S(p,q)。
// 区间一头一尾的组合有O(K^2)种。计算S(p,q)，平均要做K/4次加法。
// 这又是一重循环。因此算法总复杂度为O(K^3)。
function findMaxSumRangeV1(values) {
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
      /**************************每次sum都置零，这里做了重复计算************************************** */
      let sum = 0;
      for (let i = p; i <= q; i++) {
        sum += values[i];
      }
      /****************************************************************************************** */
      if (maxSum < sum) {
        maxSum = sum;
        start = p;
        end = q;
      }
    }
  }
  return [start, end];
}

// 思路二： 二重循环，枚举法
// 时间复杂度一致O(K^2)
function findMaxSumRangeV2(values) {
  if (values == null || values.length == 0) return null;
  let start = 0;
  let end = 0;
  let maxSum = Number.MIN_VALUE;
  let K = values.length;
  for (let p = 0; p < K; p++) {
    // 枚举起始位置
    let sum = values[p];
    if (maxSum < sum) {
      maxSum = sum;
      start = p;
      end = p;
    }
    for (let q = p + 1; q < K; q++) {
      // 枚举终点位置
      // 计算子数组的和
      sum += values[q];
      if (maxSum < sum) {
        maxSum = sum;
        start = p;
        end = q;
      }
    }
  }
  return [start, end];
}

// 思路三：分治法 总体算法时间复杂度为O(KlogK)
// 1 首先将序列一分为二，分成从1到K/2，以及K/2+1到K两个子序列（下标从1开始的描述方式）
// 2 对这两个子序列分别求总和最大区间。
// 3 归并步骤。
function findMaxSumRangeV3(values) {
  if (values == null || values.length == 0) return null;
  let K = values.length;
  let result = findMaxSumRange(values, 0, K - 1);
  return [result[0], result[1]];
}

function findMaxSumRange(values, startIndex, endIndex) {
  if (startIndex == endIndex) {
    return [startIndex, startIndex, values[startIndex]];
  }
  let middle = parseInt((startIndex + endIndex) / 2);
  let q1 = findMaxSumRange(values, startIndex, middle);
  let q2 = findMaxSumRange(values, middle + 1, endIndex);
  // 左边的序列与右边的序列是否相邻没有间隔
  if (q1[1] == q2[0] + 1) {
    // 两个序列总和均大于零，则取这两个序列合并的区间
    if (q1[2] > 0 && q2[2] > 0) {
      return [q1[0], q2[1], q1[2] + q2[2]];
    } else {
      // 否则取总和大的区间
      return q1[2] > q2[2] ? q1 : q2;
    }
    // 左边的序列与右边的序列中间有间隔，则是[p1, q1], [p2, q2], [p1, q2]中总和最大的那个区间，
    // 该步骤总体复杂度为O(K)
  } else {
    // 求S[p1, q2]，复杂度为O(K)
    let sum = 0;
    for (i = q1[0]; i <= q2[1]; i++) {
      sum += values[i];
    }
    // S[p1, q1], S[p2, q2]之间进行比较
    let max = q1[2] > q2[2] ? q1 : q2;

    // S[p1, q1], S[p2, q2], S[p1, q2]之间进行比较
    if (sum > max[2]) {
      max = [q1[0], q2[1], sum];
    }
    return max;
  }
}

// 方法四：正反两遍扫描，总体算法的时间复杂度为O(K)
// 1 先在序列中扫描找到第一个大于0的数。
//    1.1 假设整个数组都是负数或者0，那找到最大的数，也就是所要找的区间。
//    1.2 否则，从头部序列开始删除直到遇到第一个大于0的数。到此我们认为数组第0个元素是一个正数。
// 2 把左边界固定在第一个数，然后q=2,3,…K，计算S(1,q)，以及到目前为止和最大值Maxf，和达到最大值的右边界r。
// 3 对于所有的q，都有S(1,q)>=0，或者存在某个q0，当q > q0的时候，符合，都有S(1,q) >= 0。 在这种情况下，当扫描到最后，
// 即q=K时，所保留的那个Maxf所对应的r就是我们要找的区间的右边界。
// 为什么？因为从第r+1个数开始，或者是负数，或者是0，无论再怎么加，也不可能让和更大。
function findMaxSumRangeV4(values) {
  if (values == null || values.length == 0) return null;
  // let maxSum = Number.MIN_VALUE;
  // 找到第一个大于0的数
  let K = values.length;
  let p = -1;
  for (let i = 0; i < K; i++) {
    if (values[i] > 0) {
      p = i;
      break;
    }
  }
  // 所有数都小于等于0，则找最大的那个数
  if (p == -1) {
    let max = Number.MIN_VALUE;
    let maxOfIndex = -1;
    for (let i = 0; i < K; i++) {
      if (values[i] > max) {
        max = values[i];
        maxOfIndex = i;
      }
    }
    return [maxOfIndex, maxOfIndex];
  }
  //从左到右
  let sum = values[p];
  let maxf = sum;
  let r = 0;
  for (let q = p + 1; q < K; q++) {
    //计算子数组的和
    sum += values[q];
    if (maxf < sum) {
      maxf = sum;
      r = q;
    }
  }
  //从右到左
  sum = values[K - 1];
  maxf = sum;
  let l = K - 1;
  for (let q = K - 2; q >= 0; q--) {
    sum += values[q];
    if (maxf < sum) {
      maxf = sum;
      l = q;
    }
  }
  return [l, r];
}

console.log(findMaxSumRangeV1(arr));
console.log(findMaxSumRangeV2(arr));
console.log(findMaxSumRangeV3(arr));
console.log(findMaxSumRangeV4(arr));
