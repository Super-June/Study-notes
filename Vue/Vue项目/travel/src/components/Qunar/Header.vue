<template>
    <div class="header">
        <div class="header-left">返回</div>
        <div class="header-input"><input type="text"></div>
        <div class="header-right">搜索</div>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style lang="stylus" scoped>
    .header
        // position fixed
        // left 0
        // top 0
        width 100%
        height .86rem
        display flex
        .header-left
            float left
            width .64rem
        .header-input
            flex 1
        .header-right
            float right
            width 1.24rem
            
</style>
