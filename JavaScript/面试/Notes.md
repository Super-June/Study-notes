### typeof 和 instanceof
* typeof 操作符返回一个字符串，表示未经计算的操作数的类型。
* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

### __proto__和prototype
* 对象有属性__proto__,指向该对象的构造函数的原型对象。
* 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象。

### 作用域
* 全局作用域
* 函数作用域 (functuin)
* 块级作用域 (if,for...)

### 闭包
* **所有的只由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地点**
* 作用域应用的特殊情况，有两种表现：
    * 函数作为参数传递
    * 函数作为返回值被返回

```
//函数作为返回值
function create(){
    let a = 100
    return function(){
        console.log(a); // 100
    }
}
let fn create()
let a = 200
```
```
//函数作为参数
function print(fn){
    let a = 200
    fn()
}
let a = 100
function fn(){
    console.log(a) // 100
}
print(fn)
```

### this
* 参考网址：https://www.jianshu.com/p/bc541afad6ee
> this取什么值是在函数执行的时候确定的，不是在函数定义的时候确定的
> 箭头函数它的this永远取它上层函数的this

* **call**
* call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window。
* **apply**
* apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。
* **bind**
* 和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用。

* 手写bind函数
```js
// 模拟 bind
Function.prototype.bind1 = function () {
    // 将参数拆解为数组
    const args = Array.prototype.splice.call(arguments);
    // 获取 this （数组的第一项）
    const t = args.shift();
    // fn1.bind(...) 中的 fn1
    const self = this;
    // 返回一个函数
    return function () {
        return self.apply(t,args);
    }
}
function fn1(a,b) {
    console.log('this', this);
    console.log(a, b);
    return 'this is fn1'
}
const fn2 = fn1.bind({a: 1,b: 2}, 2, 6);
const res = fn2();
console.log(res);
```

### 同步和异步
* 单线程和异步
    * JS 是单线程语言，只能同时做一件事
    * 浏览器和nodejs已经支持JS启动进程，如Web Worker
    * JS 和 DOM 渲染公用同一个线程，因为 JS 可以修改 DOM 结构
    * 遇到等待（网络请求，定时任务）不能卡住
* 异步和同步
    * 基于JS是单线程语言
    * 异步不会阻塞代码执行
    * 同步会阻塞代码执行