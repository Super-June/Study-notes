import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// css 样式初始化
import './assets/styles/reset.css'
import './assets/styles/border.css'

// iconfont 图标
import './assets/styles/iconfont.css'

// vant
import { Notify, Popup, Field } from 'vant'
// van样式
import 'vant/lib/index.css'
// 全局注册
Vue.use(Notify)
Vue.use(Popup)
Vue.use(Field)

// 导入api接口
import api from './api'
// 将api挂载到vue的原型上
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
