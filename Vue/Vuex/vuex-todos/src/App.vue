<template>
	<div id="app">
		<a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="handleInputChange" />
		<a-button type="primary" @click="addTodoList">添加事项</a-button>
		
		<a-list bordered :dataSource="statusData" class="dt_list">
			<a-list-item slot="renderItem" slot-scope="item">
				<!-- 复选框 -->
				<a-checkbox @click="handelCheck($event,item.id)" :checked="item.done">{{item.info}}</a-checkbox>
				<!-- 删除链接 -->
				<a slot="actions" @click.stop="removeItem(item.id)">删除</a>
			</a-list-item>
		
		
			<!-- footer 区域 -->
			<div slot="footer" class="footer">
				<!-- 未完成的任务个数 -->
				<span>{{laveList}}条剩余</span>
				<!-- 操作按钮 -->
				<a-button-group>
					<a-button :type="statusSw == 'all' ? 'primary' : 'default'" 
					@click="handleSwitch('all')">全部</a-button>
					<a-button :type="statusSw == 'undone' ? 'primary' : 'default'" 
					@click="handleSwitch('undone')">未完成</a-button>
					<a-button :type="statusSw == 'completed' ? 'primary' : 'default'" 
					@click="handleSwitch('completed')">已完成</a-button>
				</a-button-group>
				<!-- 把已经完成的任务清空 -->
				<a @click="handelEnd">清除已完成</a>
			</div>
		</a-list>
	</div>
</template>

<script>
	import { mapState,mapGetters } from 'vuex'
	export default {
		data(){
			return {}
		},
		created() {
			this.$store.dispatch('listAxios');
		},
		computed:{
			...mapState(['list','inputValue','statusSw']),
			...mapGetters(['laveList','statusData'])
		},
		methods: {
			// 监听文本框内容变化
			handleInputChange(event){
				this.$store.commit('inpvalue',event.target.value);
			},
			// 向列表中新增 item 项
			addTodoList(){
				// trim() 去除字符串头尾空格
				if(this.inputValue.trim().length <= 0){
					// $message 消息提示框 
					// return 不执行下面的代码
					return this.$message.warning('文本框内容不能为空');
				}
				
				this.$store.commit('setListData');
			},
			//删除
			removeItem(listID){
				console.log(listID);
				this.$store.commit('deleteItem',listID);
			},
			// 选中
			handelCheck(event,id){
				const param = {
					id: id,
					status: event.target.checked
				}
				this.$store.commit('checkItem',param);
			},
			// 清除已完成
			handelEnd(){
				this.$store.commit("deleteEnd");
			},
			// 切换
			handleSwitch(status){
				this.$store.commit('statusSwitch', status)
			}
		}
	}
</script>

<style>
	#app{
		padding: 10px;
	}
	.my_ipt.ant-input{
		width: 500px;
		margin-right: 10px;
	}
	.dt_list.ant-list{
		width: 500px;
		margin-top: 10px;
	}
	.footer{
		display: flex;
		justify-content: space-between;
		line-height: 40px;
	}
</style>