import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// iconfont
import './assets/css/iconfont.css'

// 饿了么
import './plugins/element'

// 样式初始化
import 'normalize.css'
import './assets/css/main.css'

// axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
// axios （拦截器 预处理）
// 请求拦截器添加 token，保证拥有获取数据的权限
axios.interceptors.request.use(config => {
  // console.log(config)
  // 每次请求都要在请求头添加 Authorization: token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
