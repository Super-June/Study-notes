<template>
    <div id="app">

        <router-view></router-view>

        <!-- 底部标签栏 -->
        <Tabbar></Tabbar>

    </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'

export default {
    name: 'app',
    components: {
        Tabbar
    }
}
</script>

