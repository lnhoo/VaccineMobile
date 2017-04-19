<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="stock-detail">
			<v-header :headerObj="headerObj"></v-header>
			<div class="stock-detail-content">
				<div class="grzx">
			        <div class="grzx_bottom">
			        	<i>出库单号</i>
			            <b>CM56133</b>
						<span class="order-number" @click="chooseOrder">选择单号</span>
			        </div>	
				</div>
				<div class="mui-card">
			        <ul class="mui-table-view">
			            <li class="mui-table-view-cell  text-l">
			            	<img src="../../assets/images/j9.png" class="apply-icon"/>确认出库日期 
			            	<span class="fl-r">2017-04-01</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j10.png" class="apply-icon"/>下级接受单位 
			            	<span class="fl-r">xxxxxxx单位</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j11.png" class="apply-icon"/>有效期 
			            	<span class="fl-r">2017-04-01</span>
			            </li>
			           
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j13.png" class="apply-icon"/>批次号
			            	<span class="fl-r">4</span>
			            </li>
			            <li class="mui-table-view-cell text-l">
			            	<img src="../../assets/images/j15.png" class="apply-icon"/>车牌号
			            	<span class="fl-r">湘A-ob4345</span>
			            </li>
			        </ul> 
			    </div>
			</div>
			
			<order-detail ref="detail" v-show="detail"></order-detail>

			<order-num v-show="orderNum"></order-num>

		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	import OrderNum from '@/pages/stock/order_num'
	import OrderDetail from '@/pages/stock/order_detail'
	export default {
		name :'stock-detail',
		components:{
			"v-header" : Header,
			"order-num" : OrderNum,
			"order-detail" : OrderDetail
		},
		data() {
			return {
				headerObj :{
					title:'出库信息',
					hasBack : true
				}, 
				orderNum :　false,
				detail : false	
			}
		},
		methods : {
			leave() {
				this.$parent.homeRouter = false
			},
			chooseOrder(){
				this.orderNum = true;
			},
			closeMask(){
				this.orderNum = false;
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail">
	
</style>
