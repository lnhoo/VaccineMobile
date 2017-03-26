<template>
	<transition name="move">
		<div class="stock-search">
			<div id="search" class="search-page">
			  	<form  class="searchbar searchbar-init" :class="{'searchbar-active':active}">
			      <div class="searchbar-input">
			        <input type="search" placeholder="请在此输入要查询的单号" @focus="fc" @blur="br">
			      <!--  <a href="#" class="searchbar-clear"></a>-->
			      </div>
			    </form>
		    	<a href="javascript:;" class="searchbar-cancel" :class="{'on':active }">取消</a>
		    	<div class="searchbar-overlay " :class="{'searchbar-overlay-active':active}"></div>
				<div class="mui-card">
			        <ul class="mui-table-view">
			            <li class="mui-table-view-cell" v-for="item in items">
			            	车牌号：{{item.carName}}
			            	<span class="fl-r small-btn" @tap="goHome">查看</span>
			            </li>
			        </ul>
			    </div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		name :'stock-detail',
		data() {
			return {
				active : false,
				items : [
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"},
					{carName : "湘B-A002221"}
				]
			}
		},
		methods : {
			fc () {
				this.active = true
			},
			br () {
				this.active = false
			},
			goHome () {
				this.$router.push('home')
			}
		}
	}
</script>
<style scoped src="@/assets/css/stock/stock-search">
	
</style>