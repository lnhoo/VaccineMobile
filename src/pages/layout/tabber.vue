<template>
	<nav class="mui-bar mui-bar-tab">
	    <a  class="mui-tab-item mui-active" @tap="callSupFn('home','首页')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j32.png" /></span>
			<span class="mui-tab-label">首页</span>
		</a>
		
		<a  class="mui-tab-item" @tap="callSupFn('seedlings','疫苗')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j34.png" /></span>
			<span class="mui-tab-label">疫苗</span>
		</a>
		<a  class="mui-tab-item" @tap="callSupFn('gps','GPS')">
			<span class="mui-icon mui-icon mui-icon-location"></span>
			<span class="mui-tab-label">GPS</span>
		</a>
		<a  class="mui-tab-item" @tap="callSupFn('mine','我的')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j35.png" /></span>
			<span class="mui-tab-label">我的</span>
		</a>
	</nav>
</template>
<script>
	export default {
		name:"page-tabber",
		props : [ 'tabberName' ],
		data() {
			return {
			}
		},
		methods : {
			callSupFn(type,tabName) {
				this.$parent.toggleComponents( type,tabName )
			}
		}
	}
</script>
<style scoped="scoped">
	.mui-bar-tab{ background:#1e2850;position: absolute;z-index: 0; }
	.mui-tab-label{color: white;}
</style>