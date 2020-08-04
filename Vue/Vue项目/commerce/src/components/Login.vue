<template>
    <div class="login-wrapper">
        <div class="content">
            <!-- 头像区域 -->
            <div class="login-logo">
                <img src="../assets/logo.png" alt="" />
            </div>
            <el-form
                ref="loginFormReset"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="0"
                class="form-wrapper"
            >
                <el-form-item prop="username">
                    <el-input
                        type="text"
                        v-model="loginForm.username"
                        placeholder="请输入账号"
                        prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入密码"
                        prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>
                <el-form-item class="login-btn">
                    <el-button type="primary" @click="handleLogin"
                        >登录</el-button
                    >
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
                username: 'admin',
                password: '123456'
            },
            // 表单的验证规则
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    {
                        required: true,
                        message: '请输登录名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在 3 到 10个字符',
                        trigger: 'blur'
                    }
                ],
                // 验证密码是否合法
                password: [
                    {
                        required: true,
                        message: '请输登录密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在6 到 15个字符',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    // 方法
    methods: {
        // 登录
        handleLogin() {
            let that = this
            // 表单校验 validate 返回 true / false
            this.$refs.loginFormReset.validate(async valid => {
                if (!valid) return
                const { data: res } = await that.$http.post(
                    'login',
                    that.loginForm
                )
                if (res.meta.status !== 200)
                    return this.$message.error(res.meta.msg)
                that.$message.success(res.meta.msg)
                // 1、将登录成功之后的 token，保存到客户端的 sessionStorage 中
                //  1.1、项目中除了登录以外的其他api接口，必须在登录之后才能访问
                //  2.2、token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token', res.data.token)
                that.$router.push('/home')
            })
        },
        // 重置表单
        handleReset() {
            this.$refs.loginFormReset.resetFields()
        }
    }
}
</script>

<style lang="less" scoped>
// less 样式 穿透
.login-wrapper /deep/ .el-input__icon {
    font-size: 16px;
}

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
