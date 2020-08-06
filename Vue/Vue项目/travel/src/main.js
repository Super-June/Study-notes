import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 样式初始化
import '@assets/styles/normalize.css'
import '@assets/styles/border.css'
import '@assets/styles/reset.css'
// iconfont 图标
import '@assets/styles/iconfont.css'

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 全局axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
	store,
    render: h => h(App)
}).$mount('#app')
