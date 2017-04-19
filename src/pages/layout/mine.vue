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
				map.centerAndZoom(point,15);
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
						map.addOverlay(mk);
						map.panTo(r.point);
				}
				else {
					mui.toast('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})	
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