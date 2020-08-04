<template>
    <div class="Home-wrapper">
        <el-button type="info" @click="handleLogout">退出</el-button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        // 退出登录
        handleLogout() {
            // 清空 token
            window.sessionStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" scoped></style>
