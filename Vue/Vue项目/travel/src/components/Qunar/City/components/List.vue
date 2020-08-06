<template>
    <div class="lists-wrap" ref="wrapper">
        <div>
            <div class="item item-post" ref="Top">
                <div class="title">当前城市</div>
                <ul class="lists">
                    <li @click="setCityClick">{{city}}</li>
                </ul>
            </div>
            <div class="item">
                <div class="title">热门城市</div>
                <ul class="lists">
                    <li v-for="item of hotCities" :key="item.id" @click="setCityClick(item.name)">{{item.name}}</li>
                </ul>
            </div>
            <div class="item item-sort">
                <div class="title">字母排序</div>
                <ul class="lists">
                    <li v-for="(item,key) of cities" :key="key" @click="handleLetterClick">{{key}}</li>
                </ul>
            </div>
            <div class="item item-city" v-for="(items,key) of cities" :key="key" :ref="key">
                <div class="title">{{key}}</div>
                <ul class="lists">
                    <li v-for="item of items" :key="item.id" @click="setCityClick(item.name)" ref="listLi">{{item.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { mapState,mapMutations } from 'vuex'

    export default {
        name: "CityList",
        props: {
            hotCities: Array,
            cities: Object
        },
        computed: {
            ...mapState(['city'])
        },
        methods: {
            ...mapMutations(['setCity']),
            // 点击调整到选择地区
            handleLetterClick(event) {
                const letter = event.target.innerText;
                const element = this.$refs[letter][0];
                this.scroll.scrollToElement(element);
            },
            // 点击更换城市
            setCityClick(city) {
                this.setCity(city);
                this.$router.push('/')
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper,{click: true,tap: true})
            })
        },
        // 组件生命周期
        deactivated() {
            // 滚回顶部
            this.scroll.scrollToElement(this.$refs.Top)
        }

    }
</script>

<style lang="less" scoped>
    .lists-wrap{
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.56rem;
        bottom: 0;
        .title{
            height: .72rem;
            line-height: .72rem;
            background-color: #f5f5f5;
            padding: 0 .2rem;
        }
        .lists{
            overflow: hidden;
            position: relative;
            li{
                float: left;
                width: 33.3333%;
                height: .9rem;
                line-height: .9rem;
                text-align: center;
                margin-bottom: -1px;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
                position: relative;
                z-index: 10;
            }
            &:before{
                content: '';
                position: absolute;
                left: 33.3333%;
                top: 0;
                width: 33.3333%;
                height: 100%;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
            }
        }
        .item-post{
            .lists{
                li{
                    border-right: 1px solid #ddd;
                }
                &:before{
                    display: none;
                }
            }
        }
        .item-sort{
            .lists{
                li{
                    width: 16.666%;
                    border-bottom: none;
                    margin-bottom: 0;
                }
                &:before{
                    display: none;
                }
            }
        }
        .item-city{
            .lists{
                li{
                    width: 25%;
                }
                &:before{
                    width: 25%;
                    left: 25%;
                }
                &:after{
                    content: '';
                    position: absolute;
                    right: 25%;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    background-color: #ddd;
                }
            }
        }
    }
</style>