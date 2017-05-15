<template>
	<transition name="move">
		<div class="maps">
			<v-header :headerObj="headerObj"></v-header>
			<div id="allMap"></div> 
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
				headerObj :{
					title:'车辆位置',
					hasBack : true
				},
			}
		},
		mounted() {
			this.initData()
		},
		methods : {
			initData(){
	    		let _self = this;
	    		var options = {
				  	enableHighAccuracy: true,
				  	timeout: 5000,
				  	maximumAge: 0
				};
				function success(pos) {
				  	var crd = pos.coords;
				  	var a = new BMap.Point(crd.longitude,crd.latitude);
				  	let map = new BMap.Map("allMap");
		    		var point = new BMap.Point(116.331398,39.897445);
					map.centerAndZoom(point,15);
					BMap.Convertor.translate( a , 0, function(data){
						var lo = new BMap.Point(data.lng,data.lat);
						var mk = new BMap.Marker( lo );
							var label = new BMap.Label("我的位置",{offset:new BMap.Size(20,-10)});
    						mk.setLabel(label);
    						map.addOverlay( mk );
    						map.panTo( lo );
					})	
				};
				function error(err) {
				  	switch(error.code){
			            case error.PERMISSION_DENIED:
			                mui.toast("您拒绝了使用位置共享服务，查询已取消");
			                break;
			            case error.POSITION_UNAVAILABLE:
			                mui.toast("定位失败，请查看应用是否授权");
			                break;
			        }
				};
				navigator.geolocation.getCurrentPosition(success, error, options);
	    	},
		}
	}
</script>
<style scoped="scoped">
	#allMap{
		position: absolute;
		top:75px;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}
	.maps{
		position: absolute;
		z-index: 9;
		height: 100%;
		width: 100%;
		background: #303f7a;
		-webkit-transition:all .3s ease;
		transition:all .3s ease;
	}
</style>