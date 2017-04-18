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
									<div class="mui-input-row mui-checkbox">
										<label>订单一</label>
										<input name="checkbox1" value="Item 3" type="checkbox" >
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
									<div class="mui-input-row mui-checkbox">
										<label>订单二</label>
										<input name="checkbox1" value="Item 4" type="checkbox" checked>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="content-footer flex">
						<span class="flex-items" @click="closeMask">取消</span>
						<span class="flex-items" @click="closeMask">确定</span>
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
			return {}
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
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail"></style>
