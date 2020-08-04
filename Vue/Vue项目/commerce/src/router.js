import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('./components/Login.vue')
        },
        {
            path: '/home',
            component: () => import('./components/Home')
        }
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转来的
    // next 是一个函数，表示放行 next() 放行 next('/login') 强制跳转

    // 如果用户访问的登录页面，直接放行
    if (to.path === '/login') return next()
    // 获取 token
    const tokenStr = window.sessionStorage.getItem('token')
    // 没有 token，强制跳转到登录页
    if (!tokenStr) return next('/login')
    next()
})

export default router
