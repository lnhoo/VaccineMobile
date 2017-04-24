<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-detail">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-in">
				<img src="../../assets/images/b1.png" width="100%" alt="">
				<div class="sub-div">
					<div class="flex">
						<a class="flex-items" @click="unload">
							<img src="../../assets/images/b2.png" alt="" width="40"><br>
							扫描卸车
						</a>
						<a  class="flex-items" @click="showAction">
						<img src="../../assets/images/b3.png" alt="" width="40"><br>
						扫描入库
						</a>
					</div>

					<div class="chosee-order" @click="chooseOrder">
						<img src="../../assets/images/b4.png" alt="" width="40"><br>
						选单号入库
					</div>

					<span class="text-desc">温馨提示：扫描时要对准单号</span>	
				</div>
			</div>

			<order-detail ref="detail" :detailObj="detailObj" v-show="detail"></order-detail>

			<order-num v-show="orderNum"></order-num>

			<div class="custom-action-sheet" :class="{'select':selected}">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" @click="scanStorage">二维码</li>
					<li class="mui-table-view-cell" @click="scanTXM">条形码</li>
					<li class="mui-table-view-cell" @click="hideMask"><b>取消</b></li>
				</ul>
			</div>
			<div class="mui-backdrop" :class="{'show-drop':selected}" @click="hideMask"></div>

			<router-view></router-view>		
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	import OrderDetail from '@/pages/stock/order_detail'
	import OrderNum from '@/pages/stock/order_num'
	
	export default {
		name :'stock-detail',
		components:{
			"v-header" : Header,
			"order-detail" : OrderDetail,
			"order-num" : OrderNum
		},
		mounted(){
		
		},
		data() {
			return {
				headerObj :{
					title:'入库',
					hasBack : true
				}, 
				detailObj:{
					title:'入库单信息',
					btn1 : '扫描入库',
					btn2 : '再次扫描'
				},
				detail : false,
				selected:false,
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
					_self.detail = true;
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			scanTXM(){
				this.selected = !this.selected
				this.$router.push('/home/in-stock/barcode')
			},
			showAction(){
				this.selected = !this.selected
			},
			unload(){
				let _self = this;
				var content = plus.android.runtimeMainActivity();
				plus.D9Plugin.scanQrCode("参数1", "参数1", "参数1", content.getIntent(), function(result) {
					_self.detail = true;
					
				}, function(result) {
					//失败
					mui.toast("失败")
				})
			},
			toStock(){
				mui.toast("入库成功")
			},
			hideMask(){
				this.selected = false
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
		overflow: hidden;
	}
	.stock-in{
		position: absolute;
		top:75px;
		width: 100%;
		bottom: 0;
		overflow: hidden;
		color:#fff;
	}
	.stock-in .flex-items{
		background: #5160b3;
		display: inline-block;
		text-align: center;
		width: 48%;
		padding: 32px;
	}
	.stock-in .sub-div{
		padding: 10px;
	}
	.stock-in .flex-items:nth-child(1){
		margin-right: 2%;
	} 
	.chosee-order{
		background: #5160b3;
		text-align: center;
		margin-top: 10px;
		padding: 32px;
	}
	.text-desc{
		margin:20px auto;
		display: block;
		text-align: center; 
		color:#a7b0f6;
		font-size: 12px;
	}
	.custom-action-sheet{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: auto;
		z-index: 999;
		text-align: center;
		-webkit-transition: -webkit-transform .3s;
		transition: transform .3s;
	    -webkit-transform: translate3d(0,100%,0);
	    transform: translate3d(0,100%,0);
	}
	.select{
		-webkit-transform: translate3d(0,0,0);
	    transform: translate3d(0,0,0);
	}
	.mui-backdrop{
		display: none;
	}
	.show-drop{
		display: block;
	}
</style>
