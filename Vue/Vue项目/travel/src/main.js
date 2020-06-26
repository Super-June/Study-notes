import Vue from 'vue'
import App from './App.vue'
import router from './router'

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
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
