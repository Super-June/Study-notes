export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../components/Login')
    },
    {
        path: '/home',
        component: () => import('../components/Home'),
        meta: {
            isTabbar: true,
            isLogin: true
        }
    },
    {
        path: '/my',
        component: () => import('../components/My'),
        meta: {
            isTabbar: true,
            isLogin: true
        }
    }
]
