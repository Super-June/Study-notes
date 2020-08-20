<template>
  <div class="home-wrapper">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      input-align="center"
      background="#d43b33"
      shape="round"
    />
    <!-- 标签页切换 -->
    <van-tabs v-model="activeName">
      <van-tab title="个性推荐" name="recommend">
        <!-- 首页banner -->
        <van-swipe class="home-swipe" indicator-color="#d43b33">
          <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item.imageUrl" :alt="item.typeTitle" />
            <span class="label">{{ item.typeTitle }}</span>
          </van-swipe-item>
        </van-swipe>
        <!-- 私人fm/歌曲推荐/新歌 -->
        <div class="home-song-fm">
          <router-link to="/home" tag="div" class="item">
            <van-icon name="gem-o" color="#d43b33" />
            <p>私人FM</p>
          </router-link>
          <router-link to="/home" tag="div" class="item">
            <van-icon name="good-job-o" color="#d43b33" />
            <p>每日歌曲推荐</p>
          </router-link>
          <router-link to="/home" tag="div" class="item">
            <van-icon name="award-o" color="#d43b33" />
            <p>云音乐新歌榜</p>
          </router-link>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend-songlist">
          <div class="songlist-title">
            <p class="title">
              <van-icon name="certificate" color="#d43b33" />
              <span>推荐歌单</span>
            </p>
            <router-link to="/home">
              <span>更多</span>
              <van-icon name="arrow" />
            </router-link>
          </div>
          <div class="song-list">
            <div class="item" v-for="item in handleSongList" :key="item.id">
              <div class="img-wrap">
                <img :src="item.picUrl" alt="" />
                <div class="info">
                  <van-icon name="service-o" />
                  <span>{{ item.playCount }}</span>
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- 推荐新音乐 -->
        <div class="recommend-songlist">
          <div class="songlist-title">
            <p class="title">
              <van-icon name="certificate" color="#d43b33" />
              <span>推荐新音乐</span>
            </p>
            <router-link to="/home">
              <span>更多</span>
              <van-icon name="arrow" />
            </router-link>
          </div>
          <div class="newMusicList"></div>
        </div>
      </van-tab>
      <van-tab title="歌单" name="song">
        歌单
      </van-tab>
      <van-tab title="主播电台" name="radio">
        主播电台
      </van-tab>
      <van-tab title="排行榜" name="ranking">
        排行榜
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchValue: '',
      // 标签栏切换
      activeName: 'recommend',
      // banner
      bannerList: [],
      // 推荐歌单
      songList: [],
      // 推荐新音乐
      newmusicList: []
    }
  },
  created() {
    // banner
    this.getBanner()
    // 推荐歌单
    this.getSongList()
    // 推荐新音乐
    this.getNewMusicList()
  },
  computed: {
    // 处理歌单显示显示缩写播放量
    handleSongList() {
      const that = this
      that.songList.forEach(item => {
        console.log(item.playCount)
        if (item.playCount.toString().length >= 6) {
          item.playCount = Math.round(item.playCount / 10000) + '万'
        }
      })
      return this.songList
    }
  },
  methods: {
    // banner 请求
    async getBanner() {
      const { data: res } = await this.$http.get('/banner')
      if (res.code !== 200) return this.$notify('banner 获取数据失败')
      this.bannerList = res.banners
    },
    // 推荐歌单
    async getSongList() {
      const { data: res } = await this.$http.get('/personalized', {
        params: {
          limit: 6
        }
      })
      if (res.code !== 200) return this.$notify('推荐歌单获取失败')
      this.songList = res.result
    },
    // 推荐新音乐
    async getNewMusicList() {
      const { data: res } = await this.$http.get('/personalized/newsong')
      if (res.code !== 200) return this.$notify('推荐新音乐获取失败')
      this.newmusicList = res.result
    }
  }
}
</script>

<style lang="less" scoped>
.home-swipe {
  .van-swipe-item {
    span.label {
      position: absolute;
      right: 0;
      bottom: 10px;
      padding: 0 8px 0 15px;
      border-radius: 50px 0 0 50px;
      background-color: #d43b33;
      color: #fff;
    }
  }
}
// 私人fm、歌曲推荐、新歌
.home-song-fm {
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #ddd;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    .van-icon {
      font-size: 35px;
      padding: 8px;
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 2px solid #d43b33;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    p {
      margin-top: 6px;
    }
  }
}
// 推荐歌单
.recommend-songlist {
  padding: 0 10px;
  .songlist-title {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 8px 0;
    font-size: 17px;
    .van-icon {
      font-size: 20px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .song-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 31.5%;
      margin-bottom: 10px;
      position: relative;
      .img-wrap {
        img {
          width: 100%;
        }
        .info {
          position: absolute;
          top: 0;
          right: 5px;
          color: #fff;
          .van-icon {
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
            margin-left: 4px;
          }
        }
      }
      .name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0 6px;
        min-height: 30px;
        line-height: 1.2;
        font-size: 13px;
      }
    }
    &:after {
      content: '';
      display: block;
      width: 31.5%;
    }
  }
}
</style>
