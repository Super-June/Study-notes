<template>
    <div class="Tabbar">
        <router-link to="/home" class="item" tag="div">
            <span class="iconfont">&#xe642;</span>
            <p>音乐</p>
        </router-link>
        <router-link to="/my" class="item" tag="div">
            <span class="iconfont">&#xe651;</span>
            <p>我的</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Tabbar'
}
</script>

<style lang="less" scoped>
.Tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.2rem;
    background-color: #fff;
    box-shadow: 0 0 8px -2px #ddd;
    display: flex;
    .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
            font-size: 0.6rem;
        }
        p {
            margin-top: 5px;
        }
        &.router-link-exact-active {
            color: #d43c33;
            span {
                color: #d43c33;
            }
        }
    }
}
</style>
