
/**
 * @param {character[]} chars
 * @return {number}
 */
 var compress = function(chars) {
    if(chars.length == 1) return chars.length
    var count = 1
    var result = []
    for(var i = 1; i < chars.length; i++) {
        if(chars[i] == chars[i-1]) {
            count++
        } else {
            if(count > 1) {
                result.push(chars[i-1] + '' + count)
            } else {
                result.push(chars[i-1])
            }
            count = 1
        }
        if(i == chars.length - 1) {
            if(count > 1) {
                result.push(chars[i-1] + '' + count)
            } else {
                result.push(chars[i])
            }
        }
    }
    result = result.join('').split('')
    for (let i = 0; i < chars.length; i++) {
        chars[i] = result[i]        
    }
    chars.length = result.length
    console.log(result, chars)
    return chars.length
};

var chars = ["a","b","c"]
console.log(compress(chars));