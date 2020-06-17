### 兼容性
* ES6(ES2015) IE10+、Chrome、FireFox、移动端、NodeJS
* 在线转换 \ 提前编译
* (babel==browser.js)

--------------------------------------------------

### 变量
* var
1. 可以重复声明
2. 无法限制修改
3. 没有块级作用域

* let
1. 不能重复声明
2. 变量-可以修改
3. 块级作用域

* const（只要不改变原有地址，就可以修改）
1. 不能重复声明
2. 常量-不能修改
3. 块级作用域

--------------------------------------------------

### 箭头函数

--------------------------------------------------

### 函数-参数
* 函数的参数 （参数扩展/展开、默认参数）
* 参数扩展
1. 收集参数

```
// Rest Parameter 必须是最后一个
function show(a,b,...args){}
```

2. 展开数组
* 展开后的效果，跟直接把数组写在里面一样

```
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1,...arr2]; // [1,2,3,4,5,6]

let arr4 = [1,2,3];
let arrNum = (...srgs) => console.log(srgs); // [1,2,3]
arrNum(...arr4);
```

* 默认参数

```
let show = (a,b=5,c=12){
	console.log(a,b,c);
}
show(99);
```

--------------------------------------------------

### 解构赋值
1. 左右两边结构必须一样
2. 右边必须是个东西
3. 声明和赋值不能分开（必须在一句话里完成）

```
// 数组
let [a, b, c] = [3, 7, 5];
console.log(a, b, c); // 3 7 5 

// JOSN
let {a, b, c} = {a:6, b:2, c:9};
console.log(a, b, c); // 6 2 9

// 多个解析
let [{a,b},[a1,a2],num,str] = [{a:3, b:4}, [5, 6], 7, 'zhangsan'];
console.log(a,b,a1,a2,num,str);

let [json,[a1,a2],num,str] = [{a:3, b:4}, [5, 6], 7, 'zhangsan'];
console.log(json,a1,a2,num,str);

//默认值
let [a,b=2] = [1];
console.log(a,b); // 1 2

```

### 数组
1. map (映射) 一个对一个

```
// map 
let arr = [12, 5, 8];
let result = arr.map(item => item * 2)
console.log(result); // 24 10 16


let score = [19, 85, 99, 25, 90];
let result = score.map( item => item >= 60 ? '及格' : '不及格' );
console.log(result); // ["不及格", "及格", "及格", "不及格", "及格"]


```
2. reduce (汇总) 一堆出来一个

```
let arr = [12, 69, 40, 33];
// 求和
let result = arr.reduce((x, y, index) => {
	console.log(x, y, index);
	return x + y;
})
console.log(`求和：${result}`); // 154

// 平均数
let result1 = arr.reduce((x, y, index) => {
	if(index != arr.length-1){
		return x + y;
	}
	return (x + y)/arr.length;
});
console.log(`平均数：${result1}`); // 38.5
```

3. filter (过滤器) 通过true、false 判断保留还是剔除

```
let arr = [19, 85, 99, 25, 90, 60];
let result = arr.filter( item => {
	return item >= 60; // 将大于等于60的过滤出
})
console.log(result); // [85, 99, 90, 60]

let result1 = arr.filter( item => {
	return item%3 === 0; // 取出能被3整除的
})
console.log(result1); // [99, 90, 60]

let obj = [
	{title: '语文',res: 70},
	{title: '数学',res: 54},
	{title: '英语',res: 63}
]
let result2 = obj.filter( item => {
	return item.res >= 60; // 取出及格的科目
})
console.log(result2);
```

4. forEach (循环)