/*****************************1、上台阶问题************************************** */
// 思路1：至顶向下看问题，递归求解
// 如我们到要走到第8个台阶，根据每一次只能上1或2个台阶，那么上一步不是在第8-1个台阶就是在第8-2=6个台阶上，如此倒推下去......
// 假设n阶台阶有f(n)种走法，可以通过递归的方式进行求解。因为一步可以上1阶或者2阶台阶，
// 那如果先上1个台阶则只需求出剩下的n-1个台阶的走法，如果先上2个台阶则只需求出剩下的n-2个台阶的走法，
// 所以求n个台阶的走法变为求n-1和n-2个台阶的走法，则有f(n) = f(n - 1) + f(n - 2)(其中n > 2)。
// 1 2 3 5 8 13 21 34 55 89
function jumpStep(n) {
  if (n <= 0) return -1;
  if (n < 3) return n;
  return jumpStep(n - 1) + jumpStep(n - 2);
}

// 思路1-1 记忆化递归算法，将计算过的值缓存起来，减少重复计算
function jumpStepImp(n, cache) {
  if (cache[n]) return cache[n];
  if (n <= 0) return -1;
  if (n < 3) return (cache[n] = n);
  cache[n] = jumpStep(n - 1) + jumpStep(n - 2);
  return cache[n];
}

// 思路2：至底向上，动态规划求解
// 该问题当前状态只和之前的两个状态有关，因此可以采用动态规划，逐步解决问题
// dp[i]=max(dp[i-1]+values[i], values[i])
function jumpStepDp(n) {
  if (n <= 0) return 0;
  let step = 0;
  let fStep = 1;
  let ffStep = 0;
  for (let i = 1; i <= n; ++i) {
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
function moveTo(from, to, n) {
  num++;
  console.log(`第${num}躺: 第${n}个盘${from} -> ${to}`);
}

// 把n个盘子从A移动到B，用aux做中转
function Hanoi(A, B, aux, n) {
  if (n < 2) {
    return moveTo(A, B, n);
  }
  // 把n-1个盘子从A移动到aux，用B做中转
  Hanoi(A, aux, B, n - 1);
  moveTo(A, B, n);
  // 把n-1个盘子从aux移动到B，用A做中转
  Hanoi(aux, B, A, n - 1);
}
// Hanoi("A", "B", "T", 3);

/*****************************3、八皇后问题************************************** */
// 根据题目条件，皇后不能同行，所以我们每行只能放置一个皇后。而刚好我们是8*8的棋盘，
// 所以我们刚好是每行和每列都只能放置一个皇后。也就是说，我们一行一行地放置皇后。
let max = 8; // 定义数组的最大长度
let arr = []; // 声明数组
let count = 0; // 记录解法的数量
let resultArr = [];
// 判断该位置是否合适
function check(n) {
  for (let i = 0; i < n; i++) {
    // 判断n行和之前的n-i个皇后之间是否存在同一直线（行/列/斜线）的情况
    // Math.abs(n-i)==Math.abs(arr[n]-arr[i]) 判断是否在同一直线上（成等腰三角形）
    // 同一行->n=i
    // 同一列->arr[n]=arr[i]
    // 同一斜线->Math.abs(n - i) == Math.abs(arr[n] - arr[i])
    if (Math.abs(n - i) == Math.abs(arr[n] - arr[i]) || arr[n] == arr[i]) {
      return false;
    }
  }
  return true;
}

// 放置皇后
function setQueen(n = 0) {
  if (n == max) {
    // 若摆放第9个皇后则结束调用
    count++; // 方法+1
    resultArr.push([...arr]);
    return;
  }

  // 从第1列摆放到第max列
  for (let col = 0; col < max; col++) {
    // 赋值给arr[n]，第n行，进一步判断
    arr[n] = col;
    if (check(n)) {
      setQueen(n + 1);
    }
  }
}

setQueen();
console.log("八皇后问题解法：", count);
// function queen(a, cur) {
//   if (cur==a.length) { console.log(a); return; }
//   for (var i = 0; i < a.length; i++) {
//       a[cur] = i;
//       var flag = true;
//       for (var j = 0; j < cur; j++) {
//           var ab = i - a[j];
//           if (a[j]==i||(ab>0?ab:-ab)==cur-j) { flag=false; break };
//       };
//       if (flag) { queen(a,cur+1); }
//   };
// };
// queen([1,1,1,1,1,1,1,1],0);


/*****************************4、字符串计算器************************************** */
function priority(operator) {
  if(['+', '-'].indexOf(operator) > -1) {
    return 1;
  } else if(['*', '/'].indexOf(operator) >= -1) {
    return 2;
  }
}

function isOperator(char) {
  return ['+', '-', '*', '/'].indexOf(char) > -1
}

function calculateByOp(num1, op, num2) {
  num1 = parseFloat(num1)
  num2 = parseFloat(num2)
  switch(op) {
    case '+': 
      return num2 + num1;
    case '-': 
      return num2 - num1;
    case '*': 
      return num2 * num1;
    case '/': 
      if(num2 == 0) {
        console.warn('非法值，除数不能为0')
        return false
      }
      return num2 / num1;
    default:
      return false
  }
}

function calculator(expression) {
  let stack = [];
  let i = 0;
  let opTop = '';
  stack.push(expression[i]);
  i++;
  while(i < expression.length) {
    let cur = expression[i];
    if(cur == '=') {
      // 直接求取结果
      let result = calculateByOp(stack.pop(), stack.pop(), stack.pop())
      // 判断栈为不为空
      if(stack.length == 0) {
        return result;
      } else if(stack.length == 2) {        
        return calculateByOp(result, stack.pop(), stack.pop())
      } else {
        return '表达式存在问题'
      }
      // 如果当前扫描到的字符是运算符
    } else if(isOperator(cur)) {
      // opTop有值且栈顶不为运算符
      if(opTop && !isOperator(stack[stack.length - 1])) {
        // 比较cur和opTop的优先级
        if(priority(opTop) >= priority(cur)) {
          // 弹出栈
          stack.push(calculateByOp(stack.pop(), stack.pop(), stack.pop()))
        }
      }
      opTop = cur;
    }
    stack.push(cur);    
    i++;
  }
  return '表达式存在问题'
}

console.log(calculator('5+4-2='))
console.log(calculator('2*5-4*3/4/2='))

function calculate2(s) {
  const ops = [1];
  let sign = 1;

  let ret = 0;
  const n = s.length;
  let i = 0;
  while (i < n) {
      if (s[i] === ' ') {
          i++;
      } else if (s[i] === '+') {
          sign = ops[ops.length - 1];
          i++;
      } else if (s[i] === '-') {
          sign = -ops[ops.length - 1];
          i++;
      } else if (s[i] === '(') {
          ops.push(sign);
          i++;
      } else if (s[i] === ')') {
          ops.pop();
          i++;
      } else {
          let num = 0;
          while (i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
            num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
            i++;
          }

          ret += sign * num; 
      }
  }
  return ret;
};

console.log(calculate2('(1+(4+5+2)-3)+(6+8)'))