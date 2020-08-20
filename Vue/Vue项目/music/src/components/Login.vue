<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="Title">网易播放器</div>
      <van-form @submit="onSubmit" submit-on-enter>
        <van-field
          v-model="username"
          name="phone"
          label="手机号"
          label-width="60"
          placeholder="手机号"
          :rules="rules.username"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          label-width="60"
          placeholder="密码"
          :rules="rules.password"
        />
        <div class="btn-submit">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '15779679820',
      password: 'liu19970812801A',
      rules: {
        username: [
          {
            required: true,
            pattern: /^1[3456789]\d{9}$/
          }
        ],
        password: [{ required: true }]
      }
    }
  },
  methods: {
    async onSubmit(values) {
      const { data: res } = await this.$http.post('/login/cellphone', values)
      if (res.code !== 200) return this.$notify(res.message)
      // 通过 sessionStorage 存储 token 用来判断是否登录
      window.sessionStorage.setItem('token', res.token)
      // 跳转到首页
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100vh;
  background: linear-gradient(130deg, #eae5c9, #6cc6cb);
  .login {
    padding-top: 50%;
    width: 80%;
    margin: 0 auto;
    .Title {
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }
    .btn-submit {
      margin-top: 15px;
    }
  }
}
.van-cell {
  border-radius: 5px;
  & + .van-cell {
    margin-top: 10px;
  }
}
</style>
