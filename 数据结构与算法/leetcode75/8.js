/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var increasingTriplet = function(nums) {
    var count = 1
    for(var i = 1; i < nums.length; i++) {
      if(nums[i] > nums[i-1]) {
       count++
      } else {
       count = 1
      }
      if(count == 3) return true
    }
    return false
  };

var nums = [20,100,10,12,5,13]
console.log(increasingTriplet(nums))