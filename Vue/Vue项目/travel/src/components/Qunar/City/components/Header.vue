<template>
    <div class="header">
        <div class="back" @click="handleBack">
            <span class="iconfont back-icon">&#xe624;</span>
        </div>
        <div class="header-title"><slot></slot></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            handleBack(){
                this.$router.back()
            }
        }
    }
</script>

<style lang="less" scoped>
    // 这里引用前面记得加 ~
    @import '~@assets/styles/extractLess.less';

    .header{
        height: .86rem;
        color: #fff;
        background-color: @bgColor;
        position: relative;
        .back{
            width: .64rem;
            height: .86rem;
            line-height: .86rem;
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            span{
                font-size: .4rem;
            }
        }
        .header-title{
            line-height: .86rem;
            text-align: center;
            font-size: .32rem;
        }
    }
</style>