<template>
  <div id="app">
    <router-view
      v-if="!this.$route.meta.isTabbar"
      style="padding-bottom: 110px"
    ></router-view>
    <router-view v-else></router-view>
    <Tabbar v-if="!this.$route.meta.isTabbar"></Tabbar>
  </div>
</template>

<script>
import Tabbar from './common/Tabbar'

export default {
  name: 'App',
  components: {
    Tabbar
  }
}
</script>

<style lang="less" scoped></style>
