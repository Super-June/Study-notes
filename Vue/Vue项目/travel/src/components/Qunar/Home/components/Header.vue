<template>
    <div class="wrapper">
        <div class="header">
            <div class="header-left" @click="handleBack">
                <span class="iconfont back-icon">&#xe624;</span>
            </div>
            <div class="header-input">
                <router-link to="/city" tag="div">
                    <span class="iconfont">&#xe632;</span>
                    输入城市/景点/游玩主题
                </router-link>
            </div>
            <div class="header-right">
                <router-link to="/city">
                    {{city}}
                    <span class="iconfont arrow-icon">&#xe64a;</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'HomeHeader',
        computed: {
            ...mapState(['city'])
        },
        methods: {
            handleBack(){
                alert('开发中...')
            }
        }
    }
</script>

<style lang="less" scoped>
	// 这里引用前面记得加 ~
	@import '~@assets/styles/extractLess.less';

    .wrapper{
        height: .86rem;
    }
    .header{
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9;
        width: 100%;
        line-height: .86rem;
        background-color: @bgColor;
        color: #fff;
        .header-left{
            width: .64rem;
            float: left;
            .back-icon{
                display: block;
                text-align: center;
                font-size: .4rem;
            }
        }
        .header-input{
            flex: 1;
            height: .62rem;
            line-height: .62rem;
            margin-top: .12rem;
            margin-left: .2rem;
            padding-left: .2rem;
            background-color: #fff;
            border-radius: .1rem;
            color: #ccc;
        }
        .header-right{
            min-width: 1.24rem;
            float: right;
            text-align: center;
            padding: 0 .1rem;
            .arrow-icon{
                font-size: .24rem;
            }
            a{
                color: #fff;
            }
        }
    }
</style>
