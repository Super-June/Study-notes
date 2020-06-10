import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 所有任务
		list: [],
		// input 添加
		inputValue: '',
		itemID: 5,
		statusSw: 'all'
	},
	mutations: {
		listMut(state,data){
			state.list = data
		},
		// 为 store 中的 inputValue 赋值
		inpvalue(state,val){
			state.inputValue = val
		},
		//增加 list
		setListData(state){
			const obj = {
				id: state.itemID,
				info: state.inputValue.trim(),
				done: false
			}
			state.list.push(obj);
			state.itemID++;
			// 清空输入框
			state.inputValue = ''
		},
		deleteItem(state,id){
			// 根据ID查找对应的索引
			const idx = state.list.findIndex( item => item.id === id );
			// 根据索引,删除对应的元素
			if(idx !== -1){
				state.list.splice(idx,1);
			}
		},
		// 选中
		checkItem(state,param){
			state.list.map((item) => {
				if(item.id === param.id){item.done = param.status}
				return item;
			})
		},
		// 清理已完成
		deleteEnd(state){
			state.list = state.list.filter( item => item.done == false)
		},
		// 切换状态
		statusSwitch(state, status){
			state.statusSw = status;
		}
	},
	actions: {
		listAxios(state){
			axios.get('/list.json').then(({ data })=>{
				state.commit('listMut', data)
			})
		}
	},
	getters: {
		laveList(state){
			return state.list.filter( item => item.done == false).length;
		},
		statusData(state){
			switch(state.statusSw){
				case 'undone':
					return state.list.filter( item => item.done == false );
					break;
				case 'completed':
					return state.list.filter( item => item.done == true );
					break;
				default:
					return state.list
			}
		}
	}
})
