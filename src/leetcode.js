/**
 * Created by coin on 4/14/17.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let arr = [];
    for (let i = 0; i < nums.length; i++) {
        let first = nums[i];
        let pair = target - first;

        for (let j = 0; j < arr.length;j++) {
            let second = arr[j];
            if (second.value === first) {
                console.log('success');
                return [second.index,i];
            }
        }
        arr.push({index:i,value:pair});
    }

    console.log('fail');
    return [];
};

function run() {
    let arr = twoSum([2, 7, 11, 15],9);
    console.log('result' + arr);
}

let LeetCode = run;
export default LeetCode;