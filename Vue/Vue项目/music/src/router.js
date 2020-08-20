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
      component: () => import('./components/Login.vue'),
      meta: {
        isTabbar: true
      }
    },
    {
      path: '/home',
      component: () => import('./components/Home.vue')
    },
    {
      path: '/mymusic',
      component: () => import('./components/myMusic.vue')
    },
    {
      path: '/partner',
      component: () => import('./components/Partner.vue')
    },
    {
      path: '/account',
      component: () => import('./components/Account.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
