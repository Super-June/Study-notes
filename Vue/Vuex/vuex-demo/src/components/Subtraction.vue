<template>
	<div>
		<!-- <h3>{当前最新的count值为：{{count}}}</h3> -->
		<h3>{{showNum}}</h3>
		<button @click="handleCount1">-1</button>
		<button @click="countSub2(3)">-3</button>
		<button @click="handleCount3">-1 延迟</button>
		<button @click="handleCount4">-3 延迟</button>
	</div>
</template>

<script>
	// vuex 访问数据第二种方法
	import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
	
	export default {
		data(){
			return {
				
			}
		},
		computed: {
			...mapState(['count']),
			...mapGetters(['showNum'])
		},
		methods:{
			...mapMutations(['countSub1','countSub2']),
			handleCount1(){
				this.countSub1();
			},
			// handleCount2(){
			// 	this.countSub2(3);
			// },
			// 异步延迟
			...mapActions(['addAsync3','addAsync4']),
			handleCount3(){
				this.addAsync3();
			},
			handleCount4(){
				this.addAsync4(3);
			}
		}
	}
</script>

<style>
</style>
