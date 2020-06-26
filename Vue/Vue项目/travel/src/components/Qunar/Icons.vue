<template>
    <div class="icons">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(page,index) of pages" :key="index">
                <div class="icon" v-for="item of page" :key="item.id">
                    <img :src="item.imgUrl" :alt="item.title" />
                    <p>{{ item.title }}</p>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            iconList: [
                {
                    id: '0001',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png',
                    title: '景点门票'
                },
                {
                    id: '0002',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png',
                    title: '一日游'
                },
                {
                    id: '0003',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/4c/eac47dd8def8de02.png',
                    title: '北京园博园'
                },
                {
                    id: '0004',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
                    title: '故宫'
                },
                {
                    id: '0005',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/6c/9e54a8540fee0102.png',
                    title: '圆明园'
                },
                {
                    id: '0006',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/67/9a1678221b8e0e02.png',
                    title: '古北水镇'
                },
                {
                    id: '0007',
                    imgUrl:
                        'https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/a40ee278d67000f2a29d2e20f6a029b3.png',
                    title: '香山公园'
                },
                {
                    id: '0008',
                    imgUrl:
                        'https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/a40ee278d67000f2a29d2e20f6a029b3.png',
                    title: '凤凰岭'
                },
                {
                    id: '0009',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/bd/9f7b9b2b60c1502.png',
                    title: '踏青赏花'
                },
                {
                    id: '0010',
                    imgUrl:
                        'https://imgs.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png',
                    title: '中国马镇'
                }
            ]
        }
    },
    computed: {
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
                overflow: hidden;
                text-overflow:ellipsis;//文本溢出显示省略号
                white-space:nowrap;//文本不会换行（单行文本溢出）
            }
        }
    }
</style>
