<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="maps">
			<v-header :headerObj="headerObj"></v-header>
			<div v-if="hasData">
				<div id="allmap"></div>
				<div class="footer-box">
					<table class="tb">
						<tr>
							<td width="70"><span class="car-card no-bg">行驶车辆：</span></td>
							<td>
								<span class="car-card" @click="switchTab(1)">湘A103455</span>
								<span class="car-card" @click="switchTab(2)">湘A103455</span>
								<span class="car-card" @click="switchTab(3)">湘A103455</span>
								<span class="car-card" @click="switchTab(4)">湘A103455</span>
								<span class="car-card" @click="switchTab(5)">湘A103455</span>
								<span class="car-card" @click="switchTab(6)">湘A103455</span>
								<span class="car-card" @click="switchTab(7)">湘A103455</span>
							</td>
						</tr>
					</table>
				</div> 	
			</div>
			<div class="no-data-msg" v-if="noData">
				<div class="ds-table">
					<div class="ds-tell">无数据</div>
				</div>
			</div>
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
					title:'运输监控',
					hasBack : true
				}, 
				map : null,
				hasData :　true,
				noData : false
			}
		},
		mounted() {
			let _self = this;
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
	            	 			"FunCode":"0011",\
	            	 			"ResponseFormat":"2"\
	            	 		},"Body":{\
	            	 			"OrgCode":1\
	            	 		}\
	            	 	}\
	        	 	}',
	        	 	RequestFormat:2
	        	},
                dataType:'json',
                success:function(result){
                	let req = JSON.parse(result.d)
                	if(req.Response.Header.ResultCode=="1"){
                		mui.toast(req.Response.Header.ResultMsg)           	
                	}else{
                		let items = req.Response.Body.Items;
                		if(items){

                		}else{
                			_self.hasData  = false
                			_self.noData = true
                		}
                		
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            });

			// 百度地图API功能
			/*_self.map = new BMap.Map("allmap");
			_self.map.centerAndZoom("北京",15);
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					var mk = new BMap.Marker(r.point);
					_self.map.addOverlay(mk);
					_self.map.panTo(r.point);
					alert(JSON.stringify(r.point));
					var infoWindow = new BMap.InfoWindow("湘A435223<br>温度：27<br>湿度：27", { 
						offset : new BMap.Size(0,-25)
					});    // 创建信息窗口对象
					_self.map.openInfoWindow(infoWindow,r.point); 

					mk.addEventListener('click',function(){
						_self.map.openInfoWindow(infoWindow,r.point); 
					})
				}
				else {
					alert('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})*/
		},
		methods:{
			leave() {
				this.$parent.homeRouter = false
			},
			switchTab(num) {
				/*let _self = this
				let lng = 124.43279092
				let lat = 43.80864478
				if(num==2){
					lng = lng - 0.1
					lat = lat - 0.01
				}
				if(num==3){
					lng = lng - 0.2
					lat = lat - 0.02
				}
				if(num==4){
					lng = lng - 0.3
					lat = lat - 0.03
				}

				_self.map.clearOverlays()
				let new_point = new BMap.Point(lng,lat)
				let mk = new BMap.Marker(new_point);
				_self.map.addOverlay(mk);
				_self.map.panTo(new_point);

				var infoWindow = new BMap.InfoWindow("湘A4EE3<br>温度：25<br>湿度：23", { 
					offset : new BMap.Size(0,-25)
				});    // 创建信息窗口对象
				_self.map.openInfoWindow(infoWindow,new_point); 
				
				mk.addEventListener('click',function(){
					_self.map.openInfoWindow(infoWindow,new_point); 
				})*/
			}
		}
	}
</script>
<style scoped="scoped">
	#allmap{
		position: absolute;
		top:75px;
		left: 0;
		right: 0;
		bottom: 120px;
		overflow: hidden;
	}
	
	.maps{
		position: fixed;
		top:0;
		bottom: 0;
		width: 100%;
		background: #303f7a;
		-webkit-transition:all .3s ease;
		transition:all .3s ease;
	}
	.footer-box{
		position: fixed;
		bottom: 5px;
		width: 90%;
		height: 110px;
		left:5%;
		background: #3D4897;
		border-radius: 5px;
		padding: 10px;
		color:#fff;
		overflow-y: auto;
	}
	.car-card{
		display: inline-block;
		padding: 1px 5px;
		background: #6972B2;
		border-radius: 20px;
		font-size: 12px;
		margin-bottom: 10px;
	}
	.no-bg{
		background: none;
		padding-right: 0;
	}
	.tb td:first-child{
		vertical-align: top;
	}
</style>