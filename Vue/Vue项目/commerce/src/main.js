import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 样式初始化
import 'normalize.css'
import './assets/css/main.css'

// 饿了么
import './plugins/element'

// axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
