<template>
    <div class="Quner-content">
        <HomeHeader></HomeHeader>
        <HomeSwiper :swiperList="swiperList"></HomeSwiper>
        <HomeIcons :iconList="iconList"></HomeIcons>
        <HomeRecommend :recommendList="recommendList"></HomeRecommend>
        <HomeWeekend :weekendList="weekendList"></HomeWeekend>
    </div>
</template>

<script>
    import HomeHeader from './components/Header'
    import HomeSwiper from './components/Swiper'
    import HomeIcons from './components/Icons'
    import HomeRecommend from './components/Recommend'
    import HomeWeekend from './components/Weekend'

    export default {
        name: 'QunarHome',
        components: {
            HomeHeader,
            HomeSwiper,
            HomeIcons,
            HomeRecommend,
            HomeWeekend
        },
        data(){
            return {
                swiperList: [],
                iconList: [],
                recommendList: [],
                weekendList: []
            }
        },
        methods: {
            // 首页ajax数据
            getHomeData() {
                this.$http.get('/api/home.json').then( res => {
                    const data = res.data.data;
                    if (res.data.ret == true && data != null) {
                        this.swiperList = data.swiperList;
                        this.iconList = data.iconList;
                        this.recommendList = data.recommendList;
                        this.weekendList = data.weekendList;
                    }
                })
            }
        },
        created() {
            // 首页数据请求
            this.getHomeData()
        },
    }
</script>

<style lang="less" scoped>
    .Quner-content{
        padding-bottom: 1.2rem;
    }
</style>