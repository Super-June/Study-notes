let routes = [
    {
        path: '/',
        redirect: '/qunar'
    },
    {
        path: '/qunar',
        component: () => import('@/components/Qunar/Home/index')
    },
    {
        path: '/city',
        component: () => import('@/components/Qunar/City/index'),
        meta: {
            // 通过这个 判断是否显示 Tabbar 底部导航
            tabbar: false
        }
    },
    {
        path: '/douban',
        component: () => import('@/components/Douban/Douban')
    },
    {
        path: '*',
        redirect: '/qunar'
    }
];

export default routes
