/*
    字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

    示例 1：
    输入: s = "abcdefg", k = 2
    输出: "cdefgab"

    示例 2：
    输入: s = "lrloseumgh", k = 6
    输出: "umghlrlose"

*/

var reverseLeftWords = function (s, n) {
  /* 方法一
      let resultArr = s.split('')
      let handleArr = resultArr.splice(0,n)
      return resultArr.concat(handleArr).join('')
    */

    // 方法二
    // return s.substr(-(s.length - n)) + s.substr(0, n)
    return s.substr(n) + s.substr(0, n)
};

console.log(reverseLeftWords("abcdefg", 2))
