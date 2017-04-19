<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-detail">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-in">
				<img src="../../assets/images/b1.png" width="100%" alt="">
				<div class="flex">
					<span class="flex-items" @click="unload">
					<img src="../../assets/images/b2.png" alt="" width="40"><br>
					扫描卸车
					</span>
					<span class="flex-items" @click="scanStorage">
					<img src="../../assets/images/b3.png" alt="" width="40"><br>
					扫描入库
					</span>
				</div>

				<div class="chosee-order" @click="chooseOrder">
					<img src="../../assets/images/b4.png" alt="" width="40"><br>
					选单号入库
				</div>

				<span class="text-desc">温馨提示：扫描时要对准单号</span>
			</div>

			<order-detail ref="detail" v-show="detail"></order-detail>

			<order-num v-show="orderNum"></order-num>

		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	import OrderDetail from '@/pages/stock/order_detail'
	import OrderNum from '@/pages/stock/order_num'
	require('@/assets/js/d9')
	export default {
		name :'stock-detail',
		components:{
			"v-header" : Header,
			"order-detail" : OrderDetail,
			"order-num" : OrderNum
		},
		data() {
			return {
				headerObj :{
					title:'入库',
					hasBack : true
				}, 
				detail : false,
				orderNum : false
			}
		},
		methods : {
			leave() {
				this.$parent.homeRouter = false
			},
			outStock() {
				this.$router.push('/home/out-stock')
			},
			chooseOrder(){
				this.orderNum = true;
			},
			scanStorage() {
				let _self = this;
				let content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					console.log(result);
					_self.detail = true;
				}, function(result) {
					//失败
					alert("失败")
				})
			},
			unload(){
				let _self = this;
				var content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					//成功
					//alert("成功："+result)
					_self.detail = true;
					
				}, function(result) {
					//失败
					alert("失败")
				})
			}
		}
	}
</script>
<style>
	.stock-detail{
		height: 100%;
		width: 100%;
		background: #303f7a;
		-webkit-transition:all .6s ease;
		transition:all .6s ease;
		position: absolute;
		top: 0;
		left: 0;
	}
	.stock-in{
		position: absolute;
		top:75px;
		width: 100%;
		bottom: 0;
		overflow: hidden;
		padding: 10px;
		color:#fff;
	}
	.stock-in .flex-items{
		background: #5160b3;
		text-align: center;
		padding: 40px;
	}
	.stock-in .flex-items:nth-child(1){
		margin-right: 10px;
	} 
	.chosee-order{
		background: #5160b3;
		text-align: center;
		margin-top: 10px;
		padding: 40px;
	}
	.text-desc{
		margin:20px auto;
		display: block;
		text-align: center; 
		color:#a7b0f6;
		font-size: 12px;
	}
</style>
