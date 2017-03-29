<template>
	<transition name="move">
		<div class="maps">
			<v-header :headerName="headerName"></v-header>
			<div id="container"></div> 
		</div>
	</transition>
</template>
<script>
	import header from '@/pages/layout/header'
	export default {
		name:'page-map',
		components:{
			"v-header" : header 
		},
		data() {
			return {
				headerName:'js调用百度地图'
			}
		},
		mounted() {
			let map = new BMap.Map("container")        		
			let point = new BMap.Point(116.404, 39.915)  	
			map.centerAndZoom(point, 15)
		}
	}
</script>
<style scoped="scoped">
	#container{
		position: absolute;
		top:40px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
	.maps{
		height: 100%;
		width: 100%;
		background: #fff;
		-webkit-transition:all .3s ease;
		transition:all .3s ease;
	}
</style>