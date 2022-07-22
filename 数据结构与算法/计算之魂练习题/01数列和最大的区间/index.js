let arr = [
        1.5,-12.3,3.2,-5.5,23.2,3.2,-1.4,-12.2,34.2,5.4,-7.8,1.1,-4.9
    //  1.5, -12.3, 3.2, -5.5, 23.2, 3.2, -1.4, -62.2, 44.2, 5.4, -7.8, 1.1, -4.9,
];

let arr2 = [
  1.5, -12.3, 3.2, -5.5, 23.2, 3.2, -1.4, -62.2, 44.2, 5.4, -7.8, 1.1, -4.9,
]

let arr3 = [
  -1.4, -1, -9.9, -0.5
]

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

// 思路四：正反两遍扫描，总体算法的时间复杂度为O(K)
// 1 先在序列中扫描找到第一个大于0的数。
//    1.1 假设整个数组都是负数或者0，那找到最大的数，也就是所要找的区间。
//    1.2 否则，从头部序列开始删除直到遇到第一个大于0的数。到此我们认为数组第0个元素是一个正数。
// 2 把左边界固定在第一个数，然后q=2,3,…K，计算S(1,q)，以及到目前为止和最大值Maxf，和达到最大值的右边界r。
// 3 对于所有的q，都有S(1,q)>=0，或者存在某个q0，当q > q0的时候，符合，都有S(1,q) >= 0。 在这种情况下，当扫描到最后，
// 即q=K时，所保留的那个Maxf所对应的r就是我们要找的区间的右边界。
// 为什么？因为从第r+1个数开始，或者是负数，或者是0，无论再怎么加，也不可能让和更大。
// 存在缺陷，无法正确处理累加总和连续小于0的情况
function findMaxSumRangeV4(values) {
  if (values == null || values.length == 0) return null;
  // let maxSum = Number.MIN_VALUE;
  let maxOfIndex = -1;
  let maxMinus = values[0];
  // 找到第一个大于0的数
  let K = values.length;
  let p = -1;
  for (let i = 0; i < K; i++) {
    if (values[i] > 0) {
      p = i;
      break;
    } else if(maxMinus < values[i]){
      maxOfIndex = i
    }
  }
  // 所有数都小于等于0，则找最大的那个数
  if (p == -1) {
    return [maxOfIndex, maxOfIndex];
  }
  // 从左到右找到和最大的数即为右边界
  let sum = values[p];
  let maxf = sum;
  let r = 0;
  for (let q = p + 1; q < K; q++) {
    // 计算子数组的和
    sum += values[q];
    if (maxf < sum) {
      maxf = sum;
      r = q;
    }
  }
  // 从右到左找到和最大的数即为左边界
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


function findMaxSumRangeV5(values) {
  if (values == null || values.length == 0) return null;
  // let maxSum = Number.MIN_VALUE;
  let maxOfIndex = -1;
  let maxMinus = values[0];
  // 找到第一个大于0的数
  let K = values.length;
  let p = -1;
  for (let i = 0; i < K; i++) {
    if (values[i] > 0) {
      p = i;
      break;
    } else if(maxMinus < values[i]){
      maxOfIndex = i
    }
  }
  // 所有数都小于等于0，则找最大的那个数
  if (p == -1) {
    return [maxOfIndex, maxOfIndex];
  }
  // 从左到右找到和最大的数即为右边界
  let sum = values[p];
  let maxf = sum;
  let r = p;
  let l = p;
  for (let q = p + 1; q < K; q++) {
    // 计算子数组的和
    sum += values[q];
    // 发现S(p,q)<0，那么需要从q位置开始，反向计算Maxb
    if(sum < maxf) {
      // console.log(sum, maxf)
      // 查找左边界
      let sumB = 0;
      let maxB = Number.MIN_VALUE;      
      for (let j = q; j >= p; j--) {
        sumB += values[j];
        if (sumB > maxB) {
          maxB = sumB;
          // console.log(j, maxB)
          l = j;
        }
      }
      // 存在局部最大区间和大于缓存的最大值，更新右边界
      if(maxB > maxf) {
        r = q;
        p = l;
        sum = maxB;
        maxf = maxB;
      } else {
        // 跳过负数
        while (q + 1 < K && values[q + 1] <= 0) {
          q++;
        }
      }
    } else {
      maxf = sum;
      r = q;
    }
  }
  return [l, r];
}

// 思路五：
function findMaxSumRangeV45(values) {
  if (values == null || values.length == 0) return null;
  let K = values.length;
  // 检查是否有大于0的元素
  let p = -1;
  for (let i = 0; i < K; i++) {
    if (values[i] > 0) {
      p = i;
      break;
    }
  }
  // 所有数都小于等于0，则找最大的那个数
  if (p == -1) {
    let maxOfIndex = argMax(values);
    return [maxOfIndex, maxOfIndex];
  }
  let maxSum = Number.MIN_VALUE; // 区间和最大值
  let l = -1,
    r = -1;
  let sum = 0; // 某个区域内的累加和
  let maxF = Number.MIN_VALUE; // 某个区域内从左到右累加的和最大值
  let lF = p;
  let rF = p; // 某个区域内和最大值的右边界
  let i = p;
  while (i < K) {
    sum += values[i];
    // 发现S(p,q)<0，那么需要从q位置开始，反向计算Maxb
    if (sum < 0) {
      let q = i;
      // 查找左边界
      let sumB = 0;
      let maxB = Number.MIN_VALUE;
      lF = q;
      for (let j = q; j >= p; j--) {
        sumB += values[j];
        if (sumB > maxB) {
          maxB = sumB;
          lF = j;
        }
      }
      // 计算区域内的和，如果该序列和大于之前的最大序列和，则更新maxSum及区间开始结束下标
      // let sumRange = rangeSum(values, lF, rF);
      // if (sumRange > maxSum) {
      //   maxSum = sumRange;
      //   l = lF;
      //   r = rF;
      // }
      if(maxB > maxSum) {
        maxSum = maxB;
        l = lF;
        r = rF;
      }
      // 从q+1开始往后扫描，查找下一个区段的起点（即跳过小于0的数，找到第一个大于0的元素）
      while (q + 1 < K && values[q + 1] <= 0) {
        q++;
      }
      p = q + 1;
      i = q + 1;
    } else if (maxF < sum) {
      // 否则S(p,q)>0，且当前位置的序列累计和大于最大值就更新maxF和右边界位置
      maxF = sum;
      rF = i;
      i++;
    }
  }
  return [l, r];
}

/**
 * 获取序列最大值的下标
 * @param {Array} values 序列 
 * @returns 返回序列最大值的下标
 */
function argMax(values) {
  let max = Number.MIN_VALUE;
  let maxOfIndex = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
      maxOfIndex = i;
    }
  }
  return maxOfIndex;
}

/**
 * 获取区间累计最大的和
 * @param {Array} values 
 * @param {Int} start 
 * @param {Int} end 
 * @returns 返回区间累计最大的和
 */
function rangeSum(values, start, end) {
  let sumRange = 0;
  for (let j = start; j <= end; j++) {
    sumRange += values[j];
  }
  return sumRange;
}

// 思路6：动态规划
// 用dp[i]表示以第i个元素为结尾的子数组的最大和。那么答案就是max(dp)。
// 对于dp[i]来说，要么第i个元素作为前面子数组的最后一个元素，追加上去；要么就是单独成一个子数组。
// dp[i]=max(dp[i-1]+values[i], values[i]).
function findMaxSumRangeV6(values) {
  let pre = values[0];
  let maxSum = values[0];
  let l = 0,
    r = 0;
  let lF = 0,
    rF = 0;
  for (let i = 0; i < values.length; i++) {
    // 表示pre是大于0的，之前的累加都是正向的
    if (pre + values[i] > values[i]) {
      pre = pre + values[i];
      rF = i;
    } else {
      // 转折点，重新开始累计，因此lF,rF都置为该数的序号
      pre = values[i];
      lF = i;
      rF = i;
    }
    // 检测到目前最大的序列累计
    if (maxSum < pre) {
      maxSum = pre;
      l = lF;
      r = rF;
    }
  }
  return [l, r];
}

/*

动态规划基本思想
如果我们能够保存已解决的子问题的答案，而在需要时再找出已求得的答案，这样就可以避免大量的重复计算，
节省时间。我们可以用一个表来记录所有已解的子问题的答案。不管该子问题以后是否被用到，只要它被计算过，
就将其结果填入表中。这就是动态规划法的基本思路。具体的动态规划算法多种多样，但它们具有相同的填表格式

*/


// 思路7：贪心算法
function findMaxSumRangeV7(values){
  let result = Number.MIN_VALUE;
  let sum = 0;
  let leftIndex = []
  let rightIndex = []
  let maxIndex = 0
  let maxMinus = values[maxIndex]
  for(let i = 0; i < values.length; i++){
    // 缓存左边界的值(转折点)
    if(sum == 0 && values[i] > 0 && sum + values[i] > result) {
      leftIndex = i
    }
    sum += values[i];
    if(sum > result) {
      result = sum;
      // 缓存右边界的值
      if(i + 1 >= values.length) { 
        rightIndex = i
      } else if(values[i + 1] < 0) {
        rightIndex = i
      }
    }    
    if(sum < 0) {
      sum = 0;
    }
    // 都为负数的情况
    if(maxMinus < values[i]) {
      maxMinus = values[i]
      maxIndex = i
    }
  }
  if(result == Number.MIN_VALUE) {
    return {result: maxMinus, leftIndex: maxIndex, rightIndex: maxIndex}
  }
  return {result, leftIndex, rightIndex};
}

console.log(arr)
console.log(arr2)
// console.log('findMaxSumRangeV1', findMaxSumRangeV1(arr));
// console.log('findMaxSumRangeV1', findMaxSumRangeV1(arr2));
// console.log('findMaxSumRangeV2', findMaxSumRangeV2(arr));
// console.log('findMaxSumRangeV2', findMaxSumRangeV2(arr2));

// console.log('-----------------------------findMaxSumRangeV3-----------------------------');
// console.log('findMaxSumRangeV3', findMaxSumRangeV3(arr));
// console.log('findMaxSumRangeV3', findMaxSumRangeV3(arr2));
// console.log('findMaxSumRangeV3', findMaxSumRangeV3(arr2));
// console.log('findMaxSumRangeV4', findMaxSumRangeV4(arr));
// console.log('findMaxSumRangeV4', findMaxSumRangeV4(arr2));
// console.log('findMaxSumRangeV4', findMaxSumRangeV4(arr3));
// console.log('findMaxSumRangeV5', findMaxSumRangeV5(arr));
console.log('-----------------------------findMaxSumRangeV5-----------------------------');
console.log('findMaxSumRangeV5', findMaxSumRangeV5(arr));
console.log('findMaxSumRangeV5', findMaxSumRangeV5(arr2));
// console.log('findMaxSumRangeV5', findMaxSumRangeV5(arr3));
// console.log('findMaxSumRangeV6', findMaxSumRangeV6(arr));
// console.log('findMaxSumRangeV6', findMaxSumRangeV6(arr3));
console.log('findMaxSumRangeV7', findMaxSumRangeV7(arr));
console.log('findMaxSumRangeV7', findMaxSumRangeV7(arr2));
// console.log('findMaxSumRangeV7', findMaxSumRangeV7(arr3));
