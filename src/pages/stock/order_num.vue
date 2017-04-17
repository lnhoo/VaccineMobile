<template>
	<div class="order-num">
		<div class="orderNum-box">
			<div class="mask" @click="closeMask"></div>
			<div class="orderNum-box-content">
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
</template>
<script type="text/javascript">
	export default {
		name :'order-num',
		data() {
			return {}
		},
		methods : {
			closeMask(){
				this.$parent.orderNum = false;
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-detail"></style>
