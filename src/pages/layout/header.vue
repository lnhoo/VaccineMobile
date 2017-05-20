<template>
	<header class="mui-bar mui-bar-nav" style="background-color: #303f7a;">
		<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-if="headerObj.hasBack"></a>
		<p class="mui-title" style="font-weight: normal;">{{ headerObj.title }}</p>
		<span v-if="headerObj.isHome?false:true" class="mui-icon mui-icon-contact mui-pull-right" style="color:#fff;" @tap="toHome"></span>
	</header>
</template>
<script>
	export default {
		name:"page-header",
		props : [ 'headerObj' ],
		data() {
			return {}
		},
		methods : {
			toHome() {
				this.$router.push("/home")
			},
			changeTitle( title ){
				this.headerObj.title = title;
			}
		}
	}
</script>
<style scoped="scoped">
.mui-bar-nav {	
    top: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding-top: 30px;
}
.mui-title{color: white; font-size: 15px; font-weight: bold;}
.title-img{width: 26px;}
.mui-bar{
	z-index: 0;
}
</style>