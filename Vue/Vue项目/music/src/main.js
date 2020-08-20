import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vant
import './plugins/vant'

// 样式重置
import './assets/css/reset.css'

// axios 请求
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use(config => {
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
