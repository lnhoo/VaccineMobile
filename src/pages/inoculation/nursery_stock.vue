<template>
	<transition name="move">
		<div class="page-nursery">
			<v-header :headerName="headerName"></v-header>
			<div class="nursery-content">
				<div class="flex">
					<span class="flex-items flex-1"><i></i><b>库房育苗信息</b></span>
					<span class="flex-items flex-2">查看全部</span>
				</div>
				<div class="flex">
					<div class="flex-items active">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>
				<div class="flex">
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>
				<div class="flex">
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
					<div class="flex-items">库房信息1</div>
				</div>

				<div class="pop-content">
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
					<div class="nursery-box flex">
						<span class="nursery-flex text-l"><i class="circular"></i>育苗名称1</span>
						<span class="nursery-flex text-r">育苗数量</span>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
    export default {
    	name: 'page-login',
    	components :{
    		'v-header' : header
    	},
        data() {
			return {
				headerName : '接种登记'
			}
		},
		mounted(){
			
		},
		methods: {
           	
		}
    }
</script>
<style>
	.page-nursery{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
	}
	.nursery-content{
		position: absolute;
		top: 45px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-x:hidden;
		overflow-y:auto;
		background: #2B3E72;
		padding: 10px;
	}
	.flex{
		display: -webkit-flex;
		display: flex;
	}
	.flex-items{
		flex:1;
		text-align: center;
		padding: 6px 0;
		margin: 6px;
		font-size: 12px;
	}
	.flex-1{
		flex: 8;
		text-align: left;
		padding: 14px 0;
		position: relative;
		color:#ccc;
	}
	.flex-1 b{
		font-size: 15px;
	}
	.flex-1 i{
		float: left;
		margin-right: 5px; 
		margin-top: 2px;
		width: 6px;
		height: 17px;
		background: #fff;
	}
	.flex-2{
		flex: 4;
		padding: 14px 0;
		text-align: right;
		padding-right: 10px;
		color:#ccc;
	}
	div.flex-items{
		background: #fff;
		color:#000;
	}
	.nursery-content .active{
		background: #505DAF;
		color:#fff;
	}
	.nursery-flex{
		flex: 1;
	}
	.nursery-box{
		padding: 10px 15px;
	}
	.pop-content{
		background:#fff;
		margin: 6px;
		border-radius: 10px;
		margin-top: 26px;
		padding: 20px;
		position: relative;
		-webkit-box-shadow: 0px 0px 10px #E5C6C6;
		box-shadow: 0px 0px 10px #E5C6C6;
	}
	.pop-content:after{
		content: '';
		width: 0;
	    height: 0;
	    border-left: 10px solid transparent;
	    border-right: 10px solid transparent;
	    border-bottom: 20px solid #fff;
	    position: absolute;
	    left: 34px;
	    top: -14px;
	}
	.text-l{
		text-align: left;
	}
	.text-r{
		text-align: right;
	}
	.circular{
		float: left;
		width: 5px;
		height: 5px;
		background: red;
		border-radius: 5px;
		margin-top:7px; 
		margin-right: 5px;
	}
</style>