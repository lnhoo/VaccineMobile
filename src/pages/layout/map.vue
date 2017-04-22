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
			var map = null;
			var pcenter = new plus.maps.Point(116.3975,39.9074);
			setTimeout(function(){
				map=new plus.maps.Map("allmap");
				map.centerAndZoom(pcenter,15);
				map.showUserLocation( true );
				map.getUserLocation(function(state,pos){
					if(0==state){
						map.setCenter(pos);
					}
				});
			},300);	
		}
	}
</script>
<style scoped="scoped">
	#allmap{
		position: absolute;
		top:0;
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