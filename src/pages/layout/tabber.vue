<template>
	<nav class="mui-bar mui-bar-tab">
	    <a  class="mui-tab-item mui-active" @tap="callSupFn('home')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j32.png" /></span>
			<span class="mui-tab-label">首页</span>
		</a>
		<a  class="mui-tab-item" @tap="callSupFn('message')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j33.png" /></span>
			<span class="mui-tab-label">消息</span>
		</a>
		<a  class="mui-tab-item" @tap="callSupFn('seedlings')">
			<span class="mui-icon"><img width="30" class="icon" src="../../assets/images/j34.png" /></span>
			<span class="mui-tab-label">疫苗</span>
		</a>
		<a  class="mui-tab-item" @tap="callSupFn('mine')">
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
			callSupFn(type) {
				this.$parent.toggleComponents( type );
			}
		}
	}
</script>
<style scoped="scoped">
	.mui-bar-tab{ background:#1e2850;position: absolute;z-index: 0; }
	.mui-tab-label{color: white;}
</style>