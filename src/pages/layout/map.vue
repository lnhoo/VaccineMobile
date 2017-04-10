<template>
	<transition name="move">
		<div class="maps">
			<v-header :headerName="headerName"></v-header>
			<div id="allmap"></div> 
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
			// 百度地图API功能
			var map = new BMap.Map("allmap");
			map.centerAndZoom('济南',12);

			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					map.addOverlay(mk);
					map.panTo(r.point);
					alert('您的位置：'+r.point.lng+','+r.point.lat);
				}
				else {
					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
		}
	}
</script>
<style scoped="scoped">
	#allmap{
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