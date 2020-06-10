<template>
	<div>
		<!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
		<h3>{{$store.getters.showNum}}</h3>
		<button @click="handleCount1">+1</button>
		<button @click="handleCount2">+3</button>
		<button @click="handleCount3">+1 延迟</button>
		<button @click="handleCount4">+3 延迟</button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			handleCount1(){
				this.$store.commit('countAdd1');
			},
			handleCount2(){
				this.$store.commit('countAdd2', 3);
			},
			// 异步
			handleCount3(){
				this.$store.dispatch('addAsync1');
			},
			handleCount4(){
				this.$store.dispatch('addAsync2',3);
			}
		}
	}
</script>
	
<style>
</style>
