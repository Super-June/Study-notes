import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/qunar'
        },
        {
            path: '/qunar',
            component: () => import('@/views/Qunar.vue')
        },
        {
            path: '/douban',
            component: () => import('@/views/Douban.vue')
        },
        {
            path: '*',
            redirect: '/douban'
        }
    ]
})

