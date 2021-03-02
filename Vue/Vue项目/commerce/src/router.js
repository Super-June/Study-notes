import Vue from 'vue'
import Router from 'vue-router'

// 解决 ElementUI 导航栏中的vue-router再3.0版本中重复点击菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
      component: () => import('./components/Home'),
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: () => import('./components/Welcome')
        },
        {
          path: '/users',
          component: () => import('./components/user/Users')
        },
        {
          path: '/roles',
          component: () => import('./components/power/Roles')
        },
        {
          path: '/rights',
          component: () => import('./components/power/Rights')
        },
        {
          path: '/categories',
          component: () => import('./components/goods/Cate.vue')
        },
        {
          path: '/params',
          component: () => import('./components/goods/Param.vue')
        },
        {
          path: '/goods',
          component: () => import('./components/goods/List.vue')
        }
      ]
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
