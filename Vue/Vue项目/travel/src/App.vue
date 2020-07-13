<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>

		<!-- 底部标签栏 -->
		<Tabbar v-if="tabbarShow"></Tabbar>
	</div>
</template>

<script>
import Tabbar from '@/views/Tabbar'

export default {
	name: 'app',
	components: {
		Tabbar
	},
	computed: {
		tabbarShow() {
			// 是否显示 底部导航栏
			return this.$route.meta.tabbar != false
		}
	}
};
</script>
