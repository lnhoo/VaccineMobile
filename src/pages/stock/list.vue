<template>
	<div class="stock-list">
		<div class="stock-container" v-for="(item,index) in result" @click="toDetail">
			<img src="../../assets/images/j17.png"/>
			<b class="jz" v-html="item.name+index"></b>
			<span class="jz" v-html="item.address"></span>
		</div>	
	</div>
</template>
<script>
	export default {
		name : 'stock-list',
		data() {
			return {
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