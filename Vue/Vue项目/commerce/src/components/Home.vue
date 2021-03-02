<template>
  <el-container class="Home-wrapper">
    <!-- 头部区域 -->
    <el-header>
      <router-link
        to="/welcome"
        tag="div"
        class="login"
        @click.native="handleHome"
      >
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </router-link>
      <el-button type="info" @click="handleLogout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" :data-coll="isCollapse">
        <div class="toggle-button">
          <div
            class="toggle"
            :class="{ active: isCollapse }"
            @click="handleToggle"
          >
            <span></span>
          </div>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="(item, index) of menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="menuIcon[index]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/' + item.path"
              v-for="item of item.children"
              :key="item.id"
              @click="handlePath('/' + item.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      menuIcon: [
        'iconfont icon-yonghuguanli',
        'iconfont icon-zu',
        'iconfont icon-shangpin',
        'iconfont icon-dingdanguanli',
        'iconfont icon-tongji'
      ],
      isCollapse: false,
      activePath: '',
      closePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('pathItem')
  },
  methods: {
    // 退出登录
    handleLogout() {
      // 清空 token
      // window.sessionStorage.removeItem('token')
      // 清除所有 sessionStorage
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取左侧菜单数据
    async getMenuList() {
      let that = this
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return that.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 关闭侧边栏
    handleToggle() {
      this.isCollapse = !this.isCollapse
    },
    // 存储 path 保存链接的激活状态
    handlePath(path) {
      window.sessionStorage.setItem('pathItem', path)
      this.activePath = window.sessionStorage.getItem('pathItem')
    },
    // 跳转主页删除 sessionStorage pathItem
    handleHome() {
      alert('home')
    }
  }
}
</script>

<style lang="less" scoped>
.Home-wrapper {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  font-size: 20px;
  .login {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 40px;
      margin-right: 18px;
    }
  }
}
.el-aside {
  transition: width 0.3s ease-in-out;
  background-color: #333744;
  .toggle-button {
    height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .toggle {
      width: 25px;
      height: 15px;
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
        width: 100%;
        height: 1px;
        background-color: #fff;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      &::after,
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: rotate(-45deg);
        width: 100%;
        height: 1px;
        background-color: #fff;
        transition: bottom 0.3s ease-in-out, top 0.3s ease-in-out,
          transform 0.3s ease-in-out 0.3s;
      }
      &::before {
        top: 50%;
        margin-top: -1px;
        transform: rotate(45deg);
      }
      &.active {
        span {
          opacity: 1;
        }
        &::after {
          bottom: 0;
        }
        &::before {
          bottom: auto;
          top: 0;
        }
        &::after,
        &::before {
          transform: rotate(0);
          transition: transform 0.3s ease-in-out, bottom 0.3s ease-in-out 0.3s,
            top 0.3s ease-in-out 0.3s;
        }
      }
    }
  }
  .el-menu {
    border-right: none;
  }
  .iconfont {
    margin-right: 10px;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>
