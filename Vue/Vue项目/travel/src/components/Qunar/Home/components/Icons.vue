<template>
    <div class="icons">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(page,index) of pages" :key="index">
                <div class="icon" v-for="item of page" :key="item.id">
                    <img :src="item.imgUrl" :alt="item.desc" />
                    <p>{{ item.desc }}</p>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'HomeIcons',
        props: {
            iconList: Array
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        computed: {
            // 计算在swiper中每页放8个
            pages(){
                const pages = [];
                this.iconList.forEach((item,index) => {
                    const page = Math.floor(index / 8);
                    if (!pages[page]){
                        pages[page] = [];
                    }
                    pages[page].push(item);
                })
                return pages;
            }
        }
    }
</script>

<style lang="less" scoped>
	// 这里引用前面记得加 ~
	@import '~@assets/styles/extractLess.less';
	
    .icons /deep/ .swiper-container{
        overflow: hidden;
        width: 100%;
        height: 200px;
        padding-top: 0.1rem;
    }
    .icons /deep/ .swiper-pagination-bullet{
        width: .12rem;
        height: .12rem;
    }
    .icons {
        .icon {
            float: left;
            overflow: hidden;
            width: 25%;
            height: 80px;
            padding-top: 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img {
                width: 55px;
                height: 55px;
            }
            p {
                width: 100%;
                height: .44rem;
                line-height: .44rem;
                margin-top: 0.1rem;
                padding: 0 .1rem;
                color: #212121;
                font-size: 0.28rem;
                text-align: center;
                box-sizing: border-box;
                .textHide();
            }
        }
    }
</style>
