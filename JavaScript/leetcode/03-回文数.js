/*
    判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
    示例 1: 输入: 121 输出: true
    示例 2: 输入: -121 输出: false 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
    示例 3: 输入: 10 输出: false 解释: 从右向左读, 为 01 。因此它不是一个回文数。
    进阶:
    你能不将整数转为字符串来解决这个问题吗？
 */

var isPalindrome = function(x) {
    return x === parseInt(x.toString().split('').reverse().join(''));
};

console.log(isPalindrome(121))

/*
    var isPalindrome = function(x) {
        if (x < 10) { return x >= 0; }
        let n = 10 ** Math.floor(Math.log10(x));
        while(n > 1 && x > 0) {
            if (Math.floor(x / n) !== x % 10) { return false; }
            x = Math.floor((x % n) / 10);
            n /= 100;
        }
        return true;
    };
*/