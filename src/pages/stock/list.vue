<template>
	<transition name="move">
		<div class="stock-list">
			<v-header :headerName="headerName"></v-header>
			<div class="stock-container" v-for="(item,index) in result" @click="toDetail">
				<img src="../../assets/images/j17.png"/>
				<b class="jz" v-html="item.name+index"></b>
				<span class="jz" v-html="item.address"></span>
			</div>
			<v-tabber></v-tabber>
		</div>
	</transition>
</template>
<script>
	import Header from '@/pages/layout/header'
	import Tabber from '@/pages/layout/tabber'
	export default {
		components:{
			'v-header' : Header,
			'v-tabber' : Tabber
		},
		name : 'stock-list',
		data() {
			return {
				headerName : '信息查询',
				result : [{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				},{
					img:'../../assets/images/j17.png',
					name:'库房名称',
					address : '湖南省长沙市岳麓区xxxxxx'
				}]
			}
		},
		methods: {
			toDetail : function(){
				this.$router.push("/detail")
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-list">
	
</style>