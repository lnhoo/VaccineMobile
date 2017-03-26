<template>
	<nav class="mui-bar mui-bar-tab">
	    <a id="Home" class="mui-tab-item mui-active" >
			<span class="mui-icon"><img width="30" src="../../assets/images/j32.png" /></span>
			<span class="mui-tab-label">首页</span>
		</a>
		<a class="mui-tab-item" href="#tabbar-with-chat">
			<span class="mui-icon"><img width="30" src="../../assets/images/j33.png" /></span>
			<span class="mui-tab-label">消息</span>
		</a>
		<a id="Hospital" class="mui-tab-item">
			<span class="mui-icon"><img width="30" src="../../assets/images/j34.png" /></span>
			<span class="mui-tab-label">疫苗</span>
		</a>
		<a class="mui-tab-item" href="#tabbar-with-map">
			<span class="mui-icon"><img width="30" src="../../assets/images/j35.png" /></span>
			<span class="mui-tab-label">我的</span>
		</a>
	</nav>
</template>
<script>
	export default {
		name:"page-tabber",
		props : [ 'tabberName' ],
		data() {
			return {}
		}
	}
</script>
<style scoped="scoped">
	.mui-bar-tab{ background:#1e2850; }
	.mui-tab-label{color: white;}
</style>