/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    var i = 0
    var j = nums.length - 1
    while(i <= j) {
        if(nums[i] == 0) {
            if(nums[j] != 0) {
                 var temp = nums[j]
                 nums[j] = nums[i]
                 nums[i] = temp
                 i++
                 j--
            } else {
                j--
            }
        } else {
            i++
            j--
        }
    }
    return nums
 };

 var nums = [0,1,0,0,3,12]
 console.log(moveZeroes(nums))
 /**
  [0,1,0,3,12]
  [1,0,0,3,12]
  [1,0,3,0,12]
  [1,3,0,0,12]
  [1,3,0,12,0]
  [1,3,12,0,0]


[0,1,0,0,3,12]
[1,0,0,0,3,12]

  */