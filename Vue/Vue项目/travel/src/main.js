import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 样式初始化
import './assets/styles/normalize.css'
import './assets/styles/border.css'
import './assets/styles/reset.css'


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
