<template>
	<div class="order-num">
		<div class="orderNum-box">
			<div class="mask" @click="closeMask"></div>
			<div class="ds-tell orderNum-box-content">
				<div class="conetent-wrap">
					<div class="content-header">订单列表</div>
					<div class="content-body">
						<div class="mui-scroll-wrapper">
							<div class="mui-scroll">
								<form class="mui-input-group">
									<div class="mui-input-row mui-checkbox" v-for="(item,i) in items">
										<label>{{item.orderNo+i}}</label>
										<input name="checkbox1" value="Item 3" type="checkbox" >
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="content-footer flex">
						<span class="flex-items" @click="closeMask">取消</span>
						<span class="flex-items" @click="submit">确定</span>
					</div>	
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name :'order-num',
		data() {
			return {
				items : [
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'},
					{orderNo : '订单号'}
				]
			}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true //是否显示滚动条
			})
		},
		methods : {
			closeMask(){
				this.$parent.orderNum = false;
			},
			submit(){
				let num = mui(".content-body input[type=checkbox]:checked")
				//alert("你选中了"+num.length+"个单号")
				this.closeMask()

				this.$parent.detail = true;
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail"></style>
