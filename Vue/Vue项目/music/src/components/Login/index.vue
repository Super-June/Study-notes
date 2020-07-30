<template>
    <div class="login">
        <div class="logo">
            <span class="iconfont">&#xe605;</span>
        </div>
        <div class="login-btn" @click="handleLayer">手机号登录</div>

        <van-popup v-model="show" position="bottom" round>
            <div class="form-wrapper">
                <!-- 允许输入正整数，调起纯数字键盘 -->
                <van-field
                    v-model="phone"
                    type="digit"
                    label="账号"
                    label-width="3em"
                    placeholder="请输入手机号"
                    maxlength="11"
                />
                <!-- 输入密码 -->
                <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    label-width="3em"
                    placeholder="请输入密码"
                />
                <!--登录按钮-->
                <div class="form-btn" @click="handleLogin">登录</div>
            </div>
            <div class="down-btn" @click="handleLayer">取消</div>
        </van-popup>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            phone: '',
            password: '',
            show: false
        }
    },
    methods: {
        // 打开底部弹窗
        handleLayer() {
            this.show = !this.show
        },
        // 点击登录
        // ...mapActions(['actionLogin']),
        handleLogin() {
            const that = this
            that.$api.login
                .cellphone({
                    phone: that.phone,
                    password: that.password
                })
                .then(res => {
                    console.log(res)
                })
        }
    }
}
</script>

<style lang="less" scoped>
.login /deep/ .van-popup {
    padding: 0.25rem 0 0;
    box-sizing: border-box;
}
.login /deep/ .van-cell {
    line-height: 0.7rem;
    font-size: 0.32rem;
}
.login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #d43c33;
    .logo {
        text-align: center;
        margin-top: 3rem;
        span {
            font-size: 1.2rem;
            color: #fff;
        }
    }
    .login-btn {
        position: absolute;
        left: 50%;
        bottom: 2.5rem;
        width: 70%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        background-color: #fff;
        border-radius: 50px;
        transform: translateX(-50%);
    }
    .form-wrapper {
        .form-btn {
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 10px 16px;
            background-color: #d43c33;
            color: #fff;
            border-radius: 0.08rem;
        }
    }
    .down-btn {
        height: 1rem;
        line-height: 0.84rem;
        text-align: center;
        &::before {
            content: '';
            display: block;
            height: 0.16rem;
            background-color: #ddd;
        }
    }
}
</style>
