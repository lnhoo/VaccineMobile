<template>
	<div class="page-seedlings midden-tab">
		<scroller style="top: 0,bottom:45px;" ref="my_scroller">
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>
			<p>育苗页面</p>	
		</scroller>
	</div>
</template>

<script>
	import Scroller from 'vue-scroller'
	export default {
		name : 'page-seedings',
		data() {
			return {
			}
		},
		components: {
	     	Scroller
	    },
		mounted(){
			setTimeout(() => {
	        	this.$refs.my_scroller.resize();
	      	},2000)
		},
		methods : {
           	goPage( url ) {
           		this.$router.push(url)
           	}
		}
	}
</script>

<style>
.page-seedlings{
	overflow: hidden;
}
</style>