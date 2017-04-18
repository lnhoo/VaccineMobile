<template>
	<div class="page-mine midden-tab" id="allMap">
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
				map.centerAndZoom(point,15);
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
						map.addOverlay(mk);
						map.panTo(r.point);
					
					var infoWindow = new BMap.InfoWindow("湘A435223<br>温度：27<br>湿度：27",{ 
						offset : new BMap.Size(0,-25)
					});    
						// 创建信息窗口对象
						map.openInfoWindow(infoWindow,r.point); 

					mk.addEventListener('click',function(){
						map.openInfoWindow(infoWindow,r.point); 
					})
				}
				else {
					mui.toast('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})	
	    }
	}
</script>

<style>
	.maps{
		height: 100%;
	}
</style>