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
				timer : null
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
						_self.uploadLoction(data.lng,data.lat);
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
	    	uploadLoction(lnt,lat){
	    		let _this = this;
	    		mui.ajax({
	                type: "POST",
	                contentType:"application/json; charset=utf-8",
	                url : localStorage.getItem("http"),
	                data: {
		        	 	strRequest:'{\
		        	 		"Request":{\
		        	 			"Header":{\
		            	 			"AppCode":"01",\
		            	 			"AppTypeCode":"01",\
		            	 			"FunCode":"0012",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"VehicleNo":"'+this.$route.query.vehicleId+'",\
		            	 			"GPSY":"'+lnt+'",\
		            	 			"GPSX":"'+lat+'"\
		            	 		}\
		            	 	}\
		        	 	}',
		        	 	RequestFormat:2
		        	},
	                dataType:'json',
	                success:function(result){
	                	clearInterval(_this.timer)
	                	_this.timer = setInterval(_this.initData,3000)
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
	    	}
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