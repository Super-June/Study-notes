### 组件之间共享数据的方式
* 父向子传值：v-bind 属性绑定
* 子向父传值：v-on 事件绑定
* 兄弟组件之间的共享数据：EventBus
 * $on 接收数据的那个组件
 * $emit 发送数据的那个组件

### Vuex是什么
> Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享

### 使用Vuex统一管理状态的好处
* 能够在vuex中集中管理共享的数据，易于开发和后期维护
* 能够高效的实现组件之间的数据共享，提高开发效率
* 储存在vuex中的数据都是响应式的，能够实时保持数据与页面的同步

### 什么样的数据适合存储到Vuex中
* 一般情况下，只有组件之间共享的数据，才有必要存储到Vuex中；对于组件中的私有数据，依旧存储在组件自身的data中即可。

### vuex 安装
1. 安装 vuex 依赖包
```
npm install vuex --save
```
2. 导入 vuex 包
```
import Vuex from 'vuex'
Vue.use(Vuex)
```
3. 创建 store 对象
```
const store = new Vuex.Store({
	// store 中存放的就是全局共享的数据
	state: { count: 0 }
})
```
4. 将 store 对象挂载到vue实例中
```
new Vue({
	el: '#app',
	render: h => h(app),
	router,r
	// 将创建的共享数据对象，挂载到 Vue 实例中
	// 所有的组件，就可以直接从 store 中获取全局的数据了
	store
})
```
