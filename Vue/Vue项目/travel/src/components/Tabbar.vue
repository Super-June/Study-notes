<template>
    <div class="Tabbar">
        <router-link to="/qunar">
            <i class="iconfont icon-shouye7"></i>
            <span>去哪儿</span>
        </router-link>
        <router-link to="/douban">
            <i class="iconfont icon-douban"></i>
            <span>豆瓣</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="stylus" scoped>
    .Tabbar
        position fixed
        left 0
        bottom 0
        width 100%
        height 1rem
        box-shadow 0 0 10px 0px #e6e6e6
        display flex
        align-items center
        a
            flex 1
            display flex
            flex-direction column
            justify-content center
            align-items center
            height 100%
            i
                font-size .40rem
            span
                font-size .30rem
                padding-top: .04rem
            &.router-link-active{
				color #04A5FE
			}
</style>