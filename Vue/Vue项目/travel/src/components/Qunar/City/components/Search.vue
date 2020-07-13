<template>
    <div>
        <div class="search-r">
            <div class="search-wrap">
                <div class="input-wrap">
                    <input type="text" placeholder="输入城市" v-model="inputValue">
                    <span class="down" @click.stop="handleDownClick" v-show="handleDown">×</span>
                </div>
            </div>
        </div>
        <div class="search-list" v-show="inputValue" ref="wrapper">
            <div>
                <p v-for="item of searchList" :key="item.id" @click="setCityClick(item.name)">
                    {{item.name}}
                </p>
                <p v-show="!searchList.length">没有找到匹配数据</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import BScroll from 'better-scroll'

    export default {
        name: "Search",
        props: {
            cities: Object
        },
        data(){
            return {
                inputValue: '',
                searchData: [],
                searchList: [],
                time: null
            }
        },
        computed: {
            handleDown() {
                return this.inputValue != ''
            }
        },
        watch: {
            inputValue(val) {
                if (this.time){
                    clearTimeout(this.time)
                }
                if (!val){
                    this.searchList = [];
                    return;
                }
                this.time = setTimeout(() => {
                    const result = [];
                    for (const key in this.cities) {
                        this.searchData.push(...this.cities[key])
                    }
                    this.searchData.forEach((item) => {
                        if (item.name.indexOf(val) > -1 || item.spell.indexOf(val) > -1) {
                            result.push(item)
                        }
                    })
                    this.searchList = result
                }, 100)
            }
        },
        methods: {
            ...mapMutations(['setCity']),
            // 点击更换城市
            setCityClick(city) {
                this.setCity(city);
                this.inputValue = '';
                this.$router.push('/')
            },
            // 清空搜索框内容
            handleDownClick() {
                this.inputValue = '';
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{click: true,tap: true})
        }
    }
</script>

<style lang="less" scoped>
    @import "~@assets/styles/extractLess.less";

    .search-r{
        position: relative;
    }
    .search-wrap{
        height: .7rem;
        background-color: @bgColor;
        color: #fff;
        .input-wrap{
            padding: 0 .4rem;
            margin: 0 auto;
            position: relative;
            input{
                width: 100%;
                height: .56rem;
                text-align: center;
                border-radius: .04rem;
                padding: 0 .6rem;
                box-sizing: border-box;
            }
            .down{
                position: absolute;
                top: 50%;
                right: .55rem;
                width: .3rem;
                height: .3rem;
                line-height: .3rem;
                text-align: center;
                margin-top: -.15rem;
                border-radius: 50%;
                background: rgba( 0, 0, 0, .4);
                font-family: initial;
            }
        }
    }
    .search-list{
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.56rem;
        bottom: 0;
        z-index: 99;
        width: 100%;
        padding: 0 .4rem;
        box-sizing: border-box;
        background-color: #fff;
        p{
            height: .7rem;
            line-height: .7rem;
            border-bottom: 1px solid #f5f5f5;
        }
    }
</style>