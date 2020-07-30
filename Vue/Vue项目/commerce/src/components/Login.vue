<template>
    <div class="login-wrapper">
        <div class="content">
            <!-- 头像区域 -->
            <div class="login-logo">
                <img src="../assets/logo.png" alt="" />
            </div>
            <el-form :model="loginForm" label-width="0" class="form-wrapper">
                <el-form-item>
                    <el-input
                        type="text"
                        v-model="loginForm.username"
                        placeholder="请输入账号"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                    <el-button type="info" @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 登录表单的数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            // 表单的验证规则
            loginFormRules: {
                username: []
            }
        }
    },
    // 方法
    methods: {
        handleLogin() {
            alert('登录')
        },
        handleReset() {
            alert('重置')
        }
    }
}
</script>

<style lang="less" scoped>
// less 样式 穿透
.login-wrapper /deep/ .el-input__icon {font-size: 16px;}

.login-wrapper {
    height: 100%;
    background-color: #2b4b6b;
    position: relative;
    .content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 450px;
        height: 300px;
        margin-left: -225px;
        margin-top: -150px;
        background-color: #fff;
        border-radius: 5px;
        .login-logo {
            position: absolute;
            left: 50%;
            top: -65px;
            width: 130px;
            height: 130px;
            margin-left: -65px;
            padding: 10px;
            border-radius: 50%;
            border: 1px solid #eee;
            box-shadow: 0 0 10px 0 #ddd;
            box-sizing: border-box;
            background-color: #fff;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        .form-wrapper {
            margin-top: 90px;
            padding: 0 35px;
            .login-btn {
                text-align: right;
            }
        }
    }
}
</style>
