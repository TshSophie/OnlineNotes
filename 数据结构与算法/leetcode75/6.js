var isEmpty = function (char) {
    return char == 0
}

/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    let i = 0;
    let j = s.length - 1
    let targetStrArrL = []
    let targetStrArrR = []
    let preLeft = 0
    let preRight = s.length - 1
    while (isEmpty(s[preLeft])) {
        i++;
        preLeft = i
    }
    while (isEmpty(s[preRight])) {
        j--;
        preRight = j
    }
    while (i < s.length && j > 0 && i <= j) {
        while(!isEmpty(s[i]) && i < s.length) {
            i++
        }
        if(isEmpty(s[i])){ // 当前监测到空字符，且上一个字符为非空字符
            let char = s.slice(preLeft, i)
            !isEmpty(char) && targetStrArrL.unshift(char)
            i++
            preLeft = i
        }
        // 去除多余空字符
        while(isEmpty(s[i])) {
            i++
            preLeft = i
        }

        while(!isEmpty(s[j]) && j > 0) {
           j--
        }
        if(isEmpty(s[j])){ // 当前监测到空字符，且上一个字符为非空字符
            let char = s.slice(j + 1, preRight + 1)
            !isEmpty(char) && targetStrArrR.push(char)
            j--
            preRight = j
        }
        // 去除多余空字符
        while(isEmpty(s[i])) {
            j--
            preRight = j
        }
    }
    // console.log(targetStrArrL, targetStrArrR)
    return [...targetStrArrR, ...targetStrArrL].join(' ')
};

var s = "EPY2giL"
console.log(reverseWords(s))