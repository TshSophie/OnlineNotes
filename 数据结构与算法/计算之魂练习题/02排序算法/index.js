
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



function MySwap(arr, a, b){
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// 调整堆
// arr 待调整的序列
// pos 待调整的点
// len 待调整序列的长度
function AdjustHeap(arr, pos, len){

    // 左子节点
    let left = pos * 2 + 1;
    // 右子节点
    let right = pos * 2 + 2;
    let max = pos;

    // 比较，将较大的数调整到堆顶
    if (left < len && arr[max] < arr[left])
    {
        max = left;
    }
    if (right < len && arr[max] < arr[right])
    {
        max = right;
    }
    // 说明有被调整, 将其与末尾元素进行交换，此时末尾就为最大值
    if (max != pos) 
    {
        MySwap(arr, max, pos);
        // 对应的被调整的那个点也可能需要再做下调整, 剩余元素重新构造堆
        AdjustHeap(arr, max, len);
    }
}

function HeapSort(arr, start, end) {

    let len = end + 1;
    // 初始化堆,最后一个非叶子节点
    for (let i = parseInt(len / 2) - 1; i >= 0; i--)
    {
        AdjustHeap(arr, i, len);
        console.log(arr)
    }
    // 交换堆顶元素和未排序序列最后一个元素
    for (let i = len - 1; i >= 0; i--)
    {
        MySwap(arr, 0, i);
        // 从堆顶开始调整
        AdjustHeap(arr, 0, i);
    }
}

function QuickSort(arr,start,end)
{
    // 起始位置
    let i = start;
    let j = end;

    let temp = arr[i]; //设基准数为第一个元素
    if (i < j)
    {
        while (i < j)
        {
            // 从右往左找小于基准数的
            while (i < j && arr[j] > temp)
            {
                j--;
            }
            // 找到了就放在i位置
            if (i < j)
            {
                arr[i] = arr[j];
                i++;
            }

            // 从左往右找大于基准数的
            while (i < j && arr[j] < temp)
            {
                i++;
            }
            // 找到了就放在j位置
            if (i < j)
            {
                arr[j] = arr[i];
                j--;
            }
        }

        arr[i] = temp;

        // 对左半部分进行排序
        QuickSort(arr, start, i - 1);
        // 对右半部分进行排序
        QuickSort(arr, i + 1, end);


    }
}



// let num = [2, 11, 10, 5, 4, 13, 9, 7, 8, 1, 12, 3, 6, 15, 14];
// let num = [8, 4, 5, 7, 1, 3, 6, 2];
// let num = [4, 5, 8, 7, 1, 2, 3, 6];
let num = [5, 9, 4, 7, 3, 6, 19, 6, 3 ]
console.log('initial',num);

// let temp = [];
// sort
// MergeSort(num, 0, num.length - 1, temp);
// sort
// HeapSort(num, 0, num.length - 1);
// sort
QuickSort(num, 0, num.length - 1);

console.log('sort',num);
