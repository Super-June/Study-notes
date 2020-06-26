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
        name: "QSwiper",
        data(){
            return {
                swiperOptions: {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination' //小圆点
                    }
                },
                swiperList: [{
                    id: '0001',
                    imgUrl: 'http://img1.qunarzz.com/sight/source/1811/f3/86173f863bef61.jpg_r_640x214_52b003ac.jpg',
                    alt: '图片'
                },{
                    id: '0002',
                    imgUrl: 'http://img1.qunarzz.com/sight/source/1811/7e/476589267ebb41.jpg_r_640x214_bf599709.jpg',
                    alt: '图片'
                },{
                    id: '0003',
                    imgUrl: 'http://img1.qunarzz.com/sight/source/1505/aa/7baaf8a851d221.jpg_r_640x214_1431200f.jpg',
                    alt: '图片'
                }]
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
        padding-bottom: 36.52%;
        .swiper-img{
            width: 100%;
        }
    }
</style>