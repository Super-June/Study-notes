<template>
  <div class="Tabbar-wrapper">
    <div class="music-play">
      <div class="info">
        <img
          src="https://p1.music.126.net/t97_NRpVPSBvU3fTc2xqzQ==/109951165117101053.jpg"
          alt=""
        />
        <div class="des">
          <p class="music-name">星河水手</p>
          <p class="music-author">群星</p>
        </div>
      </div>
      <div class="play-wrapper">
        <van-icon name="play-circle-o" @click="handlePlay" />
        <van-icon name="more-o" @click="handleList" />
      </div>
    </div>
    <ul class="Tabbar">
      <router-link to="/home" tag="li">
        <van-icon name="fire-o" />
        <p class="tabbar-name">发现音乐</p>
      </router-link>
      <router-link to="/mymusic" tag="li">
        <van-icon name="hot-o" />
        <p class="tabbar-name">我的音乐</p>
      </router-link>
      <router-link to="/partner" tag="li">
        <van-icon name="friends-o" />
        <p class="tabbar-name">朋友</p>
      </router-link>
      <router-link to="/account" tag="li">
        <van-icon name="contact" />
        <p class="tabbar-name">账号</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {}
  },
  methods: {
    handlePlay() {
      alert('播放按钮')
    },
    handleList() {
      alert('歌曲列表')
    }
  }
}
</script>

<style lang="less" scoped>
.Tabbar-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0px 0px 5px -2px #000;
  .music-play {
    width: 100%;
    height: 40px;
    background-color: #fff;
    padding: 3px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    /*align-items: center;*/
    .info {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .des {
        font-size: 12px;
        margin-left: 10px;
        line-height: 1.2;
        .music-name {
          font-size: 14px;
          color: #333;
        }
        .music-author {
          color: #909090;
        }
      }
    }
    .play-wrapper {
      padding-top: 4px;
      .van-icon {
        font-size: 26px;
        + .van-icon {
          margin-left: 5px;
        }
      }
    }
  }
  ul.Tabbar {
    display: flex;
    flex-wrap: nowrap;
    height: 60px;
    background-color: #434343;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .van-icon {
        font-size: 20px;
      }
      &.router-link-active {
        background-color: #d43b33;
      }
    }
  }
}
</style>
