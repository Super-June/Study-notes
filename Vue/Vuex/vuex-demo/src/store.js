import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0
	},
	// 只有 mutation 中定义的函数，才有权力修改 state 中的数据
	mutations: {
		// 加
		countAdd1(state){
			// 不要再mutations函数中，执行异步操作
			state.count++
		},
		countAdd2(state,step){
			state.count += step
		},
		// 减
		countSub1(state){
			state.count--;
		},
		countSub2(state,step){
			state.count -= step
		}
	},
	actions: {
		addAsync1(context){
			// 在 actions 中，不能直接修改 state 中的数据
			// 必须通过 context.commit() 触发某个 mutation 才行
			setTimeout(()=>{
				context.commit('countAdd1');
			},1000)
		},
		addAsync2(context,step){
			setTimeout(()=>{
				context.commit('countAdd2',step)
			},1000)
		},
		
		addAsync3(context){
			setTimeout(()=>{
				context.commit('countSub1');
			},1000)
		},
		addAsync4(context,step){
			setTimeout(()=>{
				context.commit('countSub2',step)
			},1000)
		}
	},
	getters: {
		showNum(state){
			return '当前最新的数量是【'+ state.count +'】'
		}
	}
})