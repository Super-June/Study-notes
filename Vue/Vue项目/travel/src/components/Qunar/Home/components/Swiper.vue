<template>
    <div class="wrapSwiper">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="item of swiperList" :key="item.id">
                <img class="swiper-img" :src="item.imgUrl" :alt="item.alt">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        // 这里有swiper组件 不能取相同
        name: "HomeSwiper",
        props: {
            swiperList: Array
        },
        data(){
            return {
                swiperOptions: {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination' //小圆点
                    }
                }
            }
        }
    }
</script>

<style lang='less' scoped>
    // less 使用样式穿透 /deep/ ，style 使用 >>>
    .wrapSwiper /deep/ .swiper-pagination-bullet{
        background: #fff;
        opacity: .4;
    }
    .wrapSwiper /deep/ .swiper-pagination-bullet-active{
        opacity: 1;
    }
    .wrapSwiper{
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 26.666666%;
        .swiper-img{
            width: 100%;
        }
    }
</style>