// let num = [2, 11, 10, 5, 4, 13, 9, 7, 8, 1, 12, 3, 6, 15, 14];
let num = [8, 4, 5, 7, 1, 3, 6, 2];
// let num = [4, 5, 8, 7, 1, 2, 3, 6];

function Merge(arr, start, end, mid, temp) {
  // 以mid + 1为界限，逻辑上将arr分为两个序列
  let iStart = start; // 序列1开始位置
  let iEnd = mid; // 序列1末尾位置

  let jStart = mid + 1; // 序列2开始位置
  let jEnd = end; // 序列2末尾位置

  let len = 0;

  // 开始合并两个序列
  while (iStart <= iEnd && jStart <= jEnd) {
    // 比较两个序列当前指向的元素，将小的数放入缓存数组中
    if (arr[iStart] < arr[jStart]) {
      temp[len] = arr[iStart];
      iStart++;
    } else {
      temp[len] = arr[jStart];
      jStart++;
    }
    len++;
  }

  // 针对两个序列不对称(较长的那部分)进行收尾处理, 
  //   由于两序列都已经排过序了因此可以直接追加到temp数组末尾即可
  while (iStart <= iEnd) {
    temp[len] = arr[iStart];
    iStart++;
    len++;
  }

  while (iStart <= iEnd) {
    temp[len] = arr[jStart];
    jStart++;
    len++;
  }

  // 将缓存数组替换到原数组去
  for (let i = 0; i < len; i++) {
    arr[start + i] = temp[i];
  }
}

function MergeSort(arr, start, end, temp) {
  if (start >= end) {
    return;
  }
  let mid = parseInt((start + end) / 2);
  
  MergeSort(arr, start, mid, temp);

  MergeSort(arr, mid + 1, end, temp);

  Merge(arr, start, end, mid, temp);
}

let temp = [];
// sort
MergeSort(num, 0, num.length - 1, temp);

console.log(num);
