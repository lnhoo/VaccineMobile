<template>
	<header class="mui-bar mui-bar-nav" style="background-color: #303f7a;">
		<a class="mui-icon mui-icon-left-reply mui-pull-left" onclick="history.back()">
		  	<img src="../../assets/images/title1.png" class="title-img" />
		</a>
		<h1 class="mui-title">{{ headerName }}</h1>
		<a class="mui-icon mui-icon-left-reply mui-pull-right">
		  	<img src="../../assets/images/title2.png" class="title-img" />
		</a>
	</header>
</template>
<script>
	export default {
		name:"page-header",
		props : [ 'headerName' ],
		data() {
			return {}
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
</style>