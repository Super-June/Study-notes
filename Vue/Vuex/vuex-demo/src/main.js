import Vue from 'vue'
import App from './App.vue'
// 导入 store.js
import store from './store.js'


Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')
