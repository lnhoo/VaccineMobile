<template>
	<header class="mui-bar mui-bar-nav" style="background-color: #303f7a;">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		<p class="mui-title" style="font-weight: normal;">{{ headerName }}</p>
		<span class="mui-icon mui-icon-contact mui-pull-right" style="color:#fff;" @tap="toHome"></span>
	</header>
</template>
<script>
	export default {
		name:"page-header",
		props : [ 'headerName' ],
		data() {
			return {}
		},
		methods : {
			toHome() {
				this.$router.push("/home")
			}
		}
	}
</script>
<style scoped="scoped">
.mui-bar-nav {	
    top: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.mui-title{color: white; font-size: 15px; font-weight: bold;}
.title-img{width: 26px;}
.mui-bar{
	z-index: 0;
}
</style>