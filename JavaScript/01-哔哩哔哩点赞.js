/*
    like=1 点赞
    like=2 取消点赞
 */
// POST 带的参数
let param =  `aid=${__INITIAL_STATE__.aid}&like=1&csrf=${getCookie('bili_jct')}`;
// Ajax
let xhr = new XMLHttpRequest();
xhr.open('POST','https://api.bilibili.com/x/web-interface/archive/like',true);
// 请求的时候添加cookie
xhr.withCredentials = true;
// 添加请求头
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 发送请求
xhr.send(param);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){ // 成功状态码
        console.log(JSON.parse(xhr.response));
    }
}