### 服务器端模块化规范
~~~~
AMD 和 CMD 适用于浏览器端的 Javascript 模块化（过时了）

CommonJS 适用于服务器端的 Javascript 模块化
* 1、模块化分为 单文件模块 与 包
* 2、模块成员导出：module.exports 和 exports
* 3、模块化成员导入：require('模块标识符')
~~~~


#### 大一统的模块化规范 - ES6模块化
~~~~
* ES6模块化规范中定义：
* 1、每个JS文件都是一个独立的模块
* 2、导入模块成员 使用 import 关键字
* 3、暴露模块成员 使用 export 关键字
~~~~

#### node.js 中通过 babel 体验 ES6 模块化
* 1、 npm install --save-dev @babel/core @babel/cli @babel/preset-ent @babel/node
* 2、 npm install --save @babel/polyfill
* 3、 项目跟目录创建文件 babel.confing.js
* 4、 babel.config.js 文件内容如下代码
```js
const presets = [
    ["@babel/env", {
        targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1"
        }
    }]
];
module.exports = { presets }
```
* 5、通过 npx babel-node index.js 执行代码

#### ES6 模块化的基本语法
> 1、默认导出 与 默认导入
* 默认导出语法 export default 默认导出的成员
* 默认导出语法 import 接收名称 from ‘模块标识符’

```js
// 导入模块成员
import m1 from './m1.js'

console.log(m1)
// 打印输出的结果为：
// { a: 10, c: 20, show: [Function: show] }
```
```js
// 当前文件模块为 m1.js

// 定义私有成员 a 和 c
let a = 10
let b = 20
// 外界访问不到 d，因为它没有被暴露出去
let d = 30
function show() {}

// 将本模块中的私有变量成员暴露出去，供其它模块使用
export default {
    a,
    b,
    show
}
```
> 2、按需导出 与 按需导入
* 按需导出语法 export let s1 = 10
* 按需导入语法 import { s1 } from '模块标识符'

```js
// 导入模块成员
// { s2 as ss2 } s2起别名ss2
import { s1, s2 as ss2, say } from './m1.js'

console.log(s1) // 打印输出 aaa
console.log(ss2) // 打印输出 ccc
console.log(say) // 打印输出 [Function: say]
```
```js
// 当前文件模块为 m1.js

// 向外按需导出变量 s1
export let s1 = 'aaa'
// 向外按需导出变量 s2
export let s2 = 'ccc'
// 向外按需导出方法 say
export function say() {}
```
> 3、直接导入并执行模块代码
* 有时候，我们只想单纯执行某个模块中的代码，并不需要得到模块中向外暴露的成员，此时，可以直接导入并执行模块代码
```js
// 直接导入并执行模块代码
import './m2.js'
```
```js
// 当前文件模块为 m2.js

// 在当前模块中执行一个 for循环操作
for (let i = 0; i < 3; i++) {
    console.log(i)
}
```

### webpack

* 新建项目空白目录，并运行 npm init -y 命令，初始化包管理配置文件 package.json
* 新建 src 源代码目录
* 新建 src -> index.html 首页

> 1、在项目中安装和配置webpack
* 运行 npm install webpack webpack-cli -D 命令，安装webpack 相关的包
* 在项目根目录中，创建名为 webpack.confing.js  的 webpack 配置文件
* 在 webpack 的配置文件中，初始化如下基本配置：
```js
module.exports = {
    mode: 'development' // mode 用来指定构建模式
}
```
* 在 package.json 配置文件中的 scripts 节点下，新增 dev 脚本如下：
```json
"scripts": {
    "dev": "webpack" // script 节点下的脚本，可以通过 npm run 执行
}
```
* 在终端运行 npm run dev 命令，启动 webpack 进行项目打包

> 2、配置打包的入口和出口
* webpack 的4.x版本默认约定
    * 打包的入口文件为 src -> index.js
    * 打包的输出文件为 dist -> main.js
* 如果要修改打包的入口和出口，可以在 webpack.confing.js 中新增如下配置信息：
```js
const path = require('path') //导入 node.js 中专门操作路径的模块
module.exports = {
    entry: path.join(__dirname, './src/index.js'), // 打包入口文件
    output: {
        path: path.join(__dirname, './dist'), // 输出文件的存放路径
        filename: 'bundle.js' //输出文件的名称
    }   
}
```
> 3、配置 webpack 的自动打包功能
* 运行 npm install webpack-dev-server -D 命令，安装支持项目自动打包的工具
* 修改 package.json -> scripts 中的 dev 命令如下：
```json
"srcipts": {
    "dev": "webpack-dev-server" // script 节点下的脚本，通过 npm run 执行
}
```
* 将 src -> index.html 中，script 脚本的引用路径，修改为 "/bundle.js" (bundle.js 看不到是因为存入到本地的内存中了)
* 运行 npm run dev
* 在 http://localhost:8080 查看
* 注意点：
    * webpack-dev-server 会启动一个实时打包的 http 服务器
    * webpack-dev-server 打包生成的输出文件，默认放到了项目的跟目录中，而且是虚拟的、看不见的
> 4、配置 http-webpack-plugin 生成预览页面
* 运行 npm install http-webpack-plugin -D 命令，安装预览页面的插件
* 修改 webpack.config.js 文件头部区域，添加如下配置信息：
```js
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require('http-webpack-plugin')
// 创建插件的实例化
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html', // 指定要用的模板文件
    filename: 'index.html' // 指定生成的文件名称，该文件存在于内存中，在目录中不显示
})
```
* 修改 webpack.config.js 文件向外暴露的配置对象，新增如下配置点：
```js
module.exports = {
    plugins: [ htmlPlugin ] // plugins 数组是 webpack 打包期间会用到的一些插件
}
```
> 5、配置自动打包相关的参数
```json
// package.json 中的配置
// --open 打包完成后自动打开浏览器页面
// --host 配置 IP 地址
// --port 配置端口
"scripts": {
  "dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
}
```
#### webpack 中的加载器
* 通过 loader 打包非 js 模块

> 1、打包处理 css 文件
* 运行 npm install style-loader css-loader -D 命令，安装处理 css 文件的 loader
* 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
```js
// 多有第三方文件模块的匹配规则
module: {
    // 其中，test 表示匹配的文件类型，use 表示对应要调用的 loader
    rules: [
        { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
}
```
* 注意点：
    * use 数组中指定的 loader 顺序是固定的
    * 多个 loader 的调用顺序是：从后往前调用

> 打包处理 less 文件
* 运行 npm install less-loader less -D 命令
* 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
```js
module: {
    rules: [
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
    ]
}
```

> 打包处理 sass 文件
* 运行 npm install sass-loader node-sass -D 命令
* 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
```js
module: {
    rules: [
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
}
```
> 配置 postCSS 自动添加 css 的兼容前缀
* 运行 npm install postcss-loader autoprefixer -D 命令
* 在项目根目录中创建 postcss 的配置文件 postcss.config.js, 并初始化如下配置：
```js
const autoprefixer = require('autoprefixer') // 导入自动添加前缀的插件
module.exports = {
    plugins: [ autoprefixer ] // 挂载插件
}
```
* 在 webpack.config.js 的 module -> rules 数组中， 修改 css 的 loader 规则如下：
```js
module: {
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader','postcss-loader'] }
    ]
}
```
> 打包样式表中的图片和字体文件
* 运行 npm install url-loader file-loader -D 命令
* 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
```js
// 其中 ？ 后面的是 loader 的参数项。
// limit 用来指定图片的大小，单位是字节（byte），只有小于 limit 大小的图片，才会被转为 base64 图片
module: {
    rules: [
        {
            test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
            use: 'url-loader?limit=16940'
        }
    ]
}
```
> 打包处理 js 文件中的高级语法
* 安装 babel 转换器相关的包：npm install babel-loader @babel/core @babel/runtime -D
* 安装 babel 语法插件相关的包：npm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
* 在项目根目录中，创建 babel 配置文件 babel.config.js 并初始化基本配置如下：
```js
module.exports = {
    presets: [ '@babel/preset-env' ],
    plugins: [ '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties' ]
}
```
* 在 webpack.confin.js 的 module -> rules 数组中，添加 loader 规则如下：
```js
// exclude 为排除项，表示 babel-loader 不需要处理 node-modules 中的 js 文件
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```

### webpack 打包发布
* 上线之前需要通过 webpack 将应用进行整体打包，可与通过 package.json 文件配置打包命令：
```json
// 在 package.json 文件中配置 webpack 打包命令
// 该命令默认加载项目根目录中的 webpack.config.js 配置文件
"scripts": {
    // 用于打包的命令
    "build": "webpack -p"
}
```