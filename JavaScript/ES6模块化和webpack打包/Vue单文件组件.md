### 传统组件的问题和解决方案
> 问题
* 全局定义的组件必须保证组件的名称不重复
* 字符串模板缺乏语法高亮，在HTML有多行的时候，需要用到丑陋的\
* 不支持CSS意味着当HTML和Javascript组件化时，CSS明显被遗漏
* 没有构建步骤限制，只能使用HTML和ES5 Javascript，而不能使用预处理器（如：Babel）
> 解决方案
* 针对传统组件的问题，Vue提供了一个解决方案 —— 使用Vue单文件组件

> webpack 中配置 vue 组件的加载器
* 运行 npm install vue-loader vue-template-compiler -D 命令
* 在 webpack.config.js 配置文件中，添加 vue-loader 的配置项如下：
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    module: {
        rules: [
            // ...其他规则
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    plugins: [
        // ...其他配件
        new VueLoaderPlugin() //请确保引入了这个插件
    ]
}
```
> 在 webpack 项目中使用 vue
* 运行 npm install vue -S 安装 vue
* 在 src -> index.js 入口文件中，通过 import Vue from 'vue' 来导入 vue 构造函数
* 创建 vue 的实例对象，并指定要控制的 el 区域
* 通过 render 函数渲染 App 根组件
```js
// 1、导入 Vue 构造函数
import Vue from 'vue'
// 2、导入 App 根组件
import App from './components/App.vue'

const vm = new Vue({
    // 3、指定 vm 实例要控制的页面区域
    el: '#app',
    // 4、通过 render 函数，把指定的组件渲染到 el 区域中
    render: h => h(App)
})
```