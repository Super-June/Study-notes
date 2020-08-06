<template>
	<div>
		<div class="recommend-title">热销产品</div>
		<div class="recommend-list">
			<div class="item clearfix border-bottom" v-for="item of recommendList" :key="item.id">
				<div class="img-wrap">
					<img class="img" :src="item.imgUrl" alt="">
				</div>
				<div class="info-wrap">
					<div class="title">{{item.title}}</div>
					<div class="desc">{{item.desc}}</div>
					<div class="more">
						<a href="javascript: void(0);">查看详情</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomeRecommend',
		props: {
			recommendList: Array
		}
	}
</script>

<style lang="less" scoped>
	// 这里引用前面记得加 ~
	@import '~@assets/styles/extractLess.less';

    .recommend-title{
        height: .7rem;
        line-height: .7rem;
        background-color: #ececec;
        padding: 0 .2rem;
        font-size: .3rem;
    }
    .recommend-list{
        .item{
            padding: .2rem;
            position: relative;
        }
        .img-wrap{
            float: left;
            width: 2rem;
            .img{
                width: 100%;
            }
        }
        .info-wrap{
            overflow: hidden;
            padding: .15rem 0 .15rem .2rem;
            .title{
                font-size: .3rem;
                margin-bottom: .15rem;
                .textHide();
            }
            .desc{
                line-height: 1.4;
                font-size: .24rem;
                color: #bbb;
                margin-bottom: .15rem;
                .textHides(2);
            }
            .more{
                position: absolute;
                bottom: .35rem;
                a{
                    display: block;
                    width: 80px;
                    height: .34rem;
                    line-height: .34rem;
                    text-align: center;
                    background-color: #ff7d30;
                    color: #fff;
                    border-radius: 2px;
                }
            }
        }
    }
</style>
