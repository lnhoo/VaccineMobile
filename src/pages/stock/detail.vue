<template>
	<transition name="move">
		<div class="stock-detail">
			<v-header :headerName="headerName"></v-header>
			<div class="stock-detail-content">
				<div class="grzx">
					<div class="grzx_top cf">
			        	<span><img src="../../assets/images/login.jpg"></span>
			            <i>
			            	<a href="#" class="open">入库</a>	

			            	<a href="#">出库</a></i>
			        </div>
			        <div class="grzx_bottom">
			        	<i>出库单号</i>
			            <b>CM56133</b>
			        </div>	
				</div>
				<v-stock-view></v-stock-view>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	import stockView from '@/pages/stock/stock-view'
	export default {
		name :'stock-detail',
		components:{
			"v-header" : Header,
			"v-stock-view" : stockView
		},
		data() {
			return {
				headerName : '商品详情'	
			}
		},
		methods : {
			afterEnter() {
				mui.toast("ok")
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail">
	
</style>
