<template>
    <div>
        <router-view></router-view>

        <Tabbar v-if="$route.meta.isTabbar"></Tabbar>
    </div>
</template>

<script>
import Tabbar from './common/Tabbar'

export default {
    name: 'app',
    components: {
        Tabbar
    }
}
</script>

<style lang="less"></style>
