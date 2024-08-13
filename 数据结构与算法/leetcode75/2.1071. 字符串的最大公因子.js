
/**
 对于字符串 s 和 t，只有在 s = t + ... + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。

给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 x 能除尽 str2 。

示例 1：

输入：str1 = "ABCABC", str2 = "ABC"
输出："ABC"
示例 2：

输入：str1 = "ABABAB", str2 = "ABAB"
输出："AB"
示例 3：

输入：str1 = "LEET", str2 = "CODE"
输出：""
 

提示：

1 <= str1.length, str2.length <= 1000
str1 和 str2 由大写英文字母组成
 */


/**
 * 枚举法
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
 var gcdOfStrings1 = function(str1, str2) {  
    var targetPreStr1 = []
    for(var i = 0; i < str1.length; i++) {
     var preStr = str1.slice(0, i + 1)
     if(str1.split(preStr).join('') == '') {
         targetPreStr1.push(preStr) 
     }
    }
    var targetPreStr2 = []
    for(var i = 0; i < str2.length; i++) {
     var preStr = str2.slice(0, i + 1)
     if(str2.split(preStr).join('') == '') {
         targetPreStr2.push(preStr)
     }
    }
    var maxCommonStr = ""
    for(var j = 0; j < targetPreStr1.length; j++) {
       for(var k = 0; k < targetPreStr2.length; k++) {
             if(targetPreStr1[j] == targetPreStr2[k]) {
                 if(targetPreStr2[k].length > maxCommonStr.length) {
                      maxCommonStr = targetPreStr2[k]
                 }
             }
       }
    }
    return maxCommonStr
 };

 //  求两数的公约数
 function gcd( a,  b) {
     remainder = a % b;
     while (remainder != 0) {
         a = b;
         b = remainder;
         remainder = a % b;
     }
     return b;
 }

 /**
  * 数学解题法
  * @param {string} str1
  * @param {string} str2
  * @return {string}
  */
 var gcdOfStrings = function(str1, str2) { 
    // 如果存在公约字符串，则两个字符串任意组合都应该是相等的 
    if (str1 + str2 != str2 + str1) return "";
    // 取前面最大公约数个字符
    return str1.slice(0, gcd(str1.length, str2.length));
 };
 str1 = "ABABAB"
 str2 = "ABAB"
 console.log(gcdOfStrings(str1, str2))