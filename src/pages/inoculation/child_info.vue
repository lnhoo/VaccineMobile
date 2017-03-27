<template>
	<div class="page-child-info">
		<v-header :headerName="headerName"></v-header>
		<div class="child-info-box">
			<p class="tabs">
				<a href="" class="items active">儿童信息</a>
				<a href="" class="items">育苗信息</a>
			</p>
		</div>
	</div>
</template>
<script>
	import header from '@/pages/layout/header'
	export default {
		name:"page-child-info",
		components :{
    		'v-header' : header
    	},
		//props : [ 'headerName' ],
		data() {
			return {}
		}
	}
</script>
<style scoped="scoped">
	.page-child-info{
		height: 100%;
		overflow: hidden;
	}
	.child-info-box{
		position: fixed;
		top: 50px;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(61,158,227,0.3);
	}
	.child-info-box .tabs{
		padding: 10px 0;
		text-align: right; 
	}
	.child-info-box .tabs .items{
		display: inline-block;
		margin-right: 1em;
		padding: 5px 9px;
		color:#fff;
		border-radius: 13px;
		font-size: 12px;
	}
	.child-info-box .tabs .active{
		background: #fff;
		color: #000;
	}
</style>