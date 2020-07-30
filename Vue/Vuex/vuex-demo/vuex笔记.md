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
	router,
	// 将创建的共享数据对象，挂载到 Vue 实例中
	// 所有的组件，就可以直接从 store 中获取全局的数据了
	store
})
```

### State
* State 提供唯一的公共数据源，所有共享的数据都要统一放到Store的State中进行存储

```
// 创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
	state: { count: 0 }
})
```
* 组件访问State中数据的第一种方式：

```
this.$store.state.全局数据名称
```
--------------------------------------------------
* 组件访问State中数据的第二种方式：

```
// 1. 从vuex中按需导入mapState函数
import { mapState } from 'vuex'
```
* 通过刚才导入的mapState函数，将当前组件需要的全局数据，映射为当前的computed计数属性：

```
// 2. 将全局数据，映射为当前组件的计算属性
computed: {
	...mapState(['count'])
}
```

### Mutation
* Mutation 用于变更Store中的数据
 * 只能通过 mutation 变更Store数据，不可以直接操作Store中的数据
 * 通过这种方式虽然操作起来稍微麻烦一些，但是可以集中监控所有数据的变化

#### 不要在 mutation 函数中执行异步操作，如果需要异步则在 actions 中写

```
// 定义 Mutation
const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutation: {
		add(state){
			// 变更状态
			state.count++
		}
	}
})
```
```
// 触发mutation
methods: {
	handle1(){
		// 触发mutation 的第一种方式
		this.$store.commit('add');
	}
}
```

* 可以在触发mutation时传递参数：

```
// 定义Mutation
const store = new Vuex.Store({
	state: {
		count: 0
	},
	mutation: {
		addN(state, step){
			// 变更状态
			state.count += step
		}
	}
})
```
```
// 触发mutation
methods: {
	handle2(){
		// 在调用 commit 函数，
		// 触发 mutation 时携带参数
		this.$start.commit('addN', 3)
	}
}
```
--------------------------------------------------
* 触发mutation的第二种方式：

```
// 1. 从vuex中按需导入 mapMutations 函数
import { mapMutations } from 'vuex'
```
* 通过刚才导入的mapMutations函数，将需要的mutations函数，映射为当前组件methods方法：

```
// 2. 将指定的 mutations 函数，映射为当前组件的 methods 函数
methods: {
	...mapMutations(['add','addN'])
}
```

### Action
* Action 用于处理异步任务
* 如果通过异步操作变更数据，必须通过Action，而不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据。

```
// 定义 Action
const store = new Vuex.Store({
	// ...省略其他代码
	mutations: {
		add(state){
			state.count++
		}
	},
	actions: {
		addAsync(context){
			setTimeout(()=>{
				context.commit('add')
			},1000)
		}
	}
})
```
```
// 触发 Action
methods: {
	handle(){
		// 触发 action 的第一种方式
		this.$store.dispatch('addAsync')
	}
}
```

* 触发action异步任务时携带参数：

```
// 定义 Action
const store = new Vuex.Store({
	// ...省略其他代码
	mutations: {
		addN(state,step){
			state.count += step
		}
	},
	actions: {
		addAsync(context,step){
			setTimeout(()=>{
				context.commit('addN',step)
			},1000)
		}
	}
})
```

```
// 触发 Action
methods: {
	handle(){
		// 在调用 dispatch 函数
		// 触发 actions 时携带参数
		this.$store.dispatch('addAsync',5)
	}
}
```
--------------------------------------------------
* 触发 actions 的第二种方式

```
// 1. 从 vuex 中按需导入 mapActions 函数
import { mapActions } from 'vuex'
```
* 通过刚才导入的 mapActions 函数，将需要的 actions 函数，映射为当前组件的 methods 方法：

```
// 2.将指定的 actions 函数，映射为当前组件的 methods 函数
methods: {
	...mapActions(['addAsync','addNAsync'])
}
```

### Getter
* Getter 用于对 Store 中的数据进行加工处理形成新的数据
 * Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似Vue的计数属性
 * Store 中的数据发生变化，Getter 的数据也会跟着变化
 
```
// 定义 Getter
const store = new Vuex.Store({
	state: {
		count: 0
	},
	getters: {
		showNum: state => {
			return '当前最新的数量是【' + state.count +'】'
		}
	}
})
```

* 使用getter的第一种方式：

```
this.$store.getter.名称
```
--------------------------------------------------
* 使用getter的第二种方式：

```
import { mapGetters } from 'vuex'

computed: {
	...mapGetters(['showNum'])
}
```