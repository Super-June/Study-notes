/*
    给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
    示例 1:输入: 123  输出: 321
    示例 2:输入: -123 输出: -321
    示例 3:输入: 120  输出: 21
    注意:
    假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
    1534236469 =》 0
 */

var reverse = function(x) {
    let arr = x.toString().split('').reverse();
    arr.forEach((item,index) => {
        if(isNaN(arr[index]) === true){
            arr.unshift(arr[index]);
            arr.splice(index + 1,1);
        }
    })
    let num = parseInt(arr.join(''));
    if(-2147483648 <= num && 2147483647 >= num){
        return parseInt(arr.join(''));
    }
    return 0;
};

console.log(reverse(1534236469));