<template>
	<div class="mine-page">
		<div class="box">
			<div class="aaaas" id="allMap"></div>	
		</div>
	</div>
</template>
<script>
  	export default {
  		name : 'page-mine',
	    data() {
	      	return {}
	    },
	    mounted() {
	    	let map = new BMap.Map("allMap");
	    	var point = new BMap.Point(116.331398,39.897445);
				map.centerAndZoom(point,12);
			plus.geolocation.getCurrentPosition( function ( p ) {
				var lo = new BMap.Point(p.coords.longitude,p.coords.latitude);
				var mk = new BMap.Marker( lo );
					map.addOverlay( mk );
					map.panTo( lo );
					var infoWindow = new BMap.InfoWindow("我的位置", { 
						offset : new BMap.Size(0,-25)
					});    // 创建信息窗口对象
					map.openInfoWindow(infoWindow,lo); 
			}, function ( e ) {
				mui.toast( "Geolocation error: " + e.message );
			} );	
	    }
	}
</script>

<style>
	.mine-page{
		position: fixed;
		top: 75px;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.box{
		height: 100%;
		width: 100%;
	}
	.aaaas{
		height: 100%;
		width: 100%;
	}
</style>