<template>
    <div class="header">
        <div class="header-left">
            <span class="iconfont back-icon">&#xe624;</span>
        </div>
        <div class="header-input">
            <span class="iconfont">&#xe632;</span>
            输入城市/景点/游玩主题
        </div>
        <div class="header-right">
            城市
            <span class="iconfont arrow-icon">&#xe64a;</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomeHeader'
    }
</script>

<style lang="less" scoped>
	// 这里引用前面记得加 ~
	@import '~@assets/styles/extractLess.less';
	
    .header{
        display: flex;
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
            width: 1.24rem;
            float: right;
            text-align: center;
            .arrow-icon{
                font-size: .24rem;
            }
        }
    }
</style>
