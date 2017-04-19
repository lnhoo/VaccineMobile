<template>
	<transition name="move">
		<div class="order-detail-page">
			<header class="mui-bar mui-bar-nav" style="background-color: rgb(48, 63, 122);padding-top:30px;height:75px;">
				<a class="mui-icon mui-icon-left-nav mui-pull-left" @click="toggleBack"></a>
				<p class="mui-title" style="font-weight: normal;color:#fff">{{ headerName }}</p>
				<span class="mui-icon mui-icon-contact mui-pull-right" style="color:#fff;"></span>
			</header>
			<div class="device-wrap">
				<div class="caption-text">入库单号：43127号</div>
				<div class="flex mt10">
					<span class="flex-items accept-text">接受单位</span>
					<span class="flex-items text-r">xxxxx单位</span>
				</div>
				<div class="flex">
					<span class="flex-items gh-text">供货单位</span>
					<span class="flex-items text-r">xxxxx单位</span>
				</div>
				<div class="flex">
					<span class="flex-items trans-text">运输单号</span>
					<span class="flex-items text-r">123号</span>
				</div>
				<div class="flex">
					<span class="flex-items car-text">车牌号</span>
					<span class="flex-items text-r">湘A32896</span>
				</div>
				<div class="order-table">	
					<table>
						<tr>
							<th>批&nbsp;&nbsp;号</th>
							<th>有效期</th>
							<th>数量</th>
							<th>已卸车数量</th>
						</tr>
						<tr>
							<td>00123</td>
							<td>2017-03-31</td>
							<td>100支</td>
							<td>2箱</td>
						</tr>
						<tr>
							<td>00123</td>
							<td>2017-03-31</td>
							<td>100支</td>
							<td>2箱</td>
						</tr>
						<tr>
							<td>00123</td>
							<td>2017-03-31</td>
							<td>100支</td>
							<td>2箱</td>
						</tr>
						<tr>
							<td>00123</td>
							<td>2017-03-31</td>
							<td>100支</td>
							<td>2箱</td>
						</tr>
					</table>
				</div>
				
				<div class="btn-group">
					<span class="border-btn">扫描入库</span>
					<span class="border-btn gray-btn">再扫一次</span>
				</div>
			</div>

			
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'

	export default {
		name :'order-detail-page',
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerName : '入库详情',
				devices : []
			}
		},
		mounted() {
			let _self = this;
			
		},
		methods : {
			toggleBack(){
				this.$parent.detail = false
			}
		}
	}
</script>
<style scoped>
	.order-detail-page{
		position: absolute;
		height: 100%;
		width: 100%;
		left:0;
		top:0;
		background: #394889;
		z-index: 3;
		padding: 0 10px;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
 		font-size: 12px;
	}
	.order-detail-page .mui-bar {
	    -webkit-box-shadow:none;
	    box-shadow:none;
	}
	.device-wrap{
		position: absolute;
		top:75px;
		width: 96%;
		bottom: 0;
		overflow:hidden;
		overflow-y: auto;
		padding-bottom: 20px;
		padding: 10px;
	}
	.device-wrap .flex{
		padding: 10px 0;
		padding-right: 5px;
		color:#fff;
	}
	.order-table{
		width: 100%;
		background: #fff;
		color:#000;
		border-radius: 10px;
		padding: 10px 0 10px 15px;
		margin-top: 20px;
	}
	.order-table table{
		width: 100%;
		margin-top: 10px;
	}
	.order-table th{
		color:#9da2b6;
		font-size: 13px;
	}
	.order-table td{
		padding: 8px 0;
		text-align: center;
	}
	.btn-group{
		text-align: center;
		padding-top: 25px;
	}
	.border-btn{
		display: inline-block;
		padding: 12px 30px;
		border: 1px solid #1c94f1;
    	color: #1c94f1;
		border-radius: 16px;
		font-size: 14px;
		background: url("../../assets/images/b11.png") 13% center no-repeat;
		margin: 10px;
		background-size: 15px;
		text-indent: 10px;
	}
	.gray-btn{
		border: 1px solid #5a70c1;
	    color: #5a70c1;	
	    background: url("../../assets/images/b12.png") 13% center no-repeat;
	    background-size: 15px;
	}
	.accept-text{
		padding-left: 40px;
		background: url("../../assets/images/b7.png") no-repeat;
		background-size:20px;
	}
	.gh-text{
		padding-left: 40px;
		background: url("../../assets/images/b8.png") no-repeat;
		background-size:20px;
	}
	.trans-text{
		padding-left: 40px;
		background: url("../../assets/images/b8.png") no-repeat;
		background-size:20px;
	}
	.car-text{
		padding-left: 40px;
		background: url("../../assets/images/b8.png") no-repeat;
		background-size:20px;
	}
	.caption-text{
		padding: 16px 0;
		padding-left: 40px;
		background: url("../../assets/images/b6.png") left center no-repeat;
		background-size:25px;
		color:#fff;
		position: relative;
	}
	.caption-text:after {
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    height: 1px;
	    content: '';
	    -webkit-transform: scaleY(.2);
	    transform: scaleY(.2);
	    background-color: #c8c7cc;
	}
</style>


