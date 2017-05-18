<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="maps">
			<v-header :headerObj="headerObj"></v-header>
			<div id="allmapss"></div>
			<div v-if="carList.length>0">
				<div class="footer-box">
					<table class="tb">
						<tr>
							<td width="70"><span class="car-card no-bg">行驶车辆：</span></td>
							<td>
								<span class="car-card car-item" v-for="car in carList" @click="switchTab(car)">
									{{car.PlateNo}}
								</span>
							</td>
						</tr>
					</table>
				</div> 	
			</div>
			<div class="no-data-msg" v-if="carList.length==0">
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
				carList : []
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
	            	 			"OrgCode":"'+localStorage.getItem("customerCode")+'"\
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
                		console.log(items)
                		if(items){
                			let item = items.Item
	                		if(!(item instanceof Array)){
	                			_self.carList.push( item )
	                		}else{
	                			_self.carList = item
	                		}
	                		_self.initMap(_self.carList[0])
                		}
                	}
                },
				error:function(xhr,type,errorThrown){
					//异常处理；
					mui.toast(type);
				}
            });
		},
		methods:{
			leave() {
				this.$parent.homeRouter = false
			},
			switchTab(car) {
				if(!car.GPSY){
					mui.toast("该车辆暂无坐标信息");return;
				}
				this.initMap( car )
			},
			initMap( carObj ){
				var map = new BMap.Map("allmapss");
				var point = new BMap.Point(116.331398,39.897445);
				map.centerAndZoom(point,12);
				var cur = new BMap.Point(carObj.GPSY,carObj.GPSX);
				var mk = new BMap.Marker(cur);
					map.addOverlay(mk);
					map.panTo(cur);
				var infoWindow = new BMap.InfoWindow(carObj.PlateNo+"<br>温度："+carObj.MaxTemperature+"℃<br>湿度："+carObj.MinHumidity+"℃", { 
					offset : new BMap.Size(0,-25)
				});    // 创建信息窗口对象
				map.openInfoWindow(infoWindow,cur); 
				mk.addEventListener('click',function(){
					map.openInfoWindow(infoWindow,cur); 
				})
			}
		}
	}
</script>
<style scoped="scoped">
	#allmapss{
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
	.car-item{
		margin-left: 6px;
	}
	.no-bg{
		background: none;
		padding-right: 0;
	}
	.tb td:first-child{
		vertical-align: top;
	}
</style>