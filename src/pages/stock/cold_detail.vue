<template>
	<transition name="move" v-on:after-enter="enter">
		<div class="cold-detail-page">
			<v-header :headerObj="headerObj"></v-header>
			<div class="device-wrap" v-if="devices.length>0">
				<div class="device-list flex text-c">
					<span class="flex-items" :class="{'on':index==0}" @click="switchTab($event,device)" v-for="(device,index) in devices">
						{{device.ShowName}}<br>温度：{{device.Temperature}}℃<br>湿度：{{device.Humidity}}℃
					</span>
				</div>
				<div id="temperature" style="width: 96%;height:260px;margin:20px auto;"></div>
				<div id="humidity" style="width: 96%;height:260px;margin:0 auto;"></div>	
			</div>

			<div class="no-data-msg" v-if="devices.length==0">
				<div class="ds-table">
					<div class="ds-tell">{{message}}<span v-if="!message" class="mui-spinner"></span></div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import Header from '@/pages/layout/header'
	var echarts = require('echarts/lib/echarts');
	require('echarts/lib/chart/line');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	require('echarts/lib/component/markPoint');
	require('echarts/lib/component/markLine');

	export default {
		name :'cold-detail-page',
		components:{
			"v-header" : Header
		},
		data() {
			return {
				headerObj :{
					title:'设备温湿度',
					hasBack : true
				},
				devices : [],
				message : ''
			}
		},
		methods : {
			enter() {
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
		            	 			"FunCode":"0009",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"ColdNo":"'+_self.$route.query.coldNo+'"\
		            	 		}\
		            	 	}\
		        	 	}',
		        	 	RequestFormat:2
		        	},
	                dataType:'json',
	                success:function(result){
	                	let req = JSON.parse(result.d)
	                	if(req.Response.Header.ResultCode=="1"){
	                		_self.message = req.Response.Header.ResultMsg          	
	                	}else{
	                		let items = req.Response.Body.Items;
	                		if(items){
	                			let devices = items.Item
		                		if(!(devices instanceof Array)){
		                			_self.devices.push( devices )
		                		}else{
		                			_self.devices = devices
		                		}
		                		_self.$nextTick(() => {
							        _self.getEchatsData(_self.devices[0])
							    })	
	                		}
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			switchTab( e,device ) {
				// 如果是当前设备就不请求数据
				if(e.target.className.indexOf("on")!=-1)return;
				var flexItems = mui(".device-list .flex-items")
				for( var i=0; i<flexItems.length; i++ ){
					flexItems[i].className = "flex-items"
				}
				e.target.className = "flex-items on"
				this.getEchatsData(device)
			},
			getEchatsData(device){
				let _self = this
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
		            	 			"FunCode":"0010",\
		            	 			"ResponseFormat":"2"\
		            	 		},"Body":{\
		            	 			"DeviceID":"'+device.DeviceID+'",\
		            	 			"PageSize":10,\
		            	 			"page":1\
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
	                		let detailArr = []
	                		let detail = req.Response.Body.Items.Item
	                		if(!(detail instanceof Array)){
	                			detailArr.push( detail )
	                		}else{
	                			detailArr = detail
	                		}
	                		// 湿度对象
	                		let Humidity =  []
	                		// 温度对象
	                		let Temperature = []
	                		// 时间段对象
	                		let StrCollectTime = []

	                		for( var i=0;i < detailArr.length;i++ ){
	                			// 湿度
	                			Humidity.push(detailArr[i].Humidity)
	                			// 温度
	                			Temperature.push(detailArr[i].Temperature)
	                			// 时间段
	                			StrCollectTime.push(detailArr[i].StrCollectTime)
	                		}

	                		_self.initEcharts({
					        	id : 'temperature',
					        	text : '温度℃',
					        	lineColor : '#DC4FD3', 
					        	max : '最高温度',
					        	mix : '最低温度',
					        	maxValue: device.MaxTemperature,
					        	minValue: device.MinTemperature,
					        	xData : StrCollectTime,
					        	data : Temperature
					        })

					        _self.initEcharts({
					        	id : 'humidity',
					        	text : '湿度℃',
					        	max : '最高湿度',
					        	mix : '最低湿度',
					        	maxValue: device.MaxHumidity,
					        	minValue: device.MinHumidity,
					        	lineColor : '#50E8ED', 
					        	xData : StrCollectTime,
					        	data : Humidity
					        })
	                	}
	                },
					error:function(xhr,type,errorThrown){
						//异常处理；
						mui.toast(type);
					}
	            });
			},
			initEcharts(options) {
		        var echart = echarts.init(document.getElementById(options.id));
		        var option = {
		            title: {
		                text: options.text,
		                textStyle:{
		                	color:'#fff',
		                	fontSize:13
		                }
		            },
  					backgroundColor:'#404689',
		            textStyle:{
		            	color:'#fff'
		            },
		            tooltip: {},
		            xAxis: {
		                data: options.xData,
                        splitLine:{  
                    		show:false  
                    	}  
		            },
		            yAxis: {
                        splitLine:{  
                    		show:false  
                    	},
                    	max: Math.floor(options.maxValue) + 3
				    },
		            series: [{
		                name: options.text,
		                type: 'line',
		                markLine: {
		                	itemStyle : {
		                		normal : { lineStyle:{ type:'dashed',color:options.lineColor,width:'1'}}
		                	},
		                    data: [
		                    	{
		                    		name: options.max,
		                    		lineStyle:{
		                    			normal:{
		                    				lineStyle : {type:'dashed',width:'1'}
				                		}
		                    		},
		                    		yAxis:options.maxValue
		                    	},
		                    	{
		                    		name: options.mix,
		                    		lineStyle:{
		                    			normal:{
		                    				lineStyle : {type:'dashed',width:'1'}
				                		}
		                    		},
		                    		yAxis:options.minValue
		                    	}
		                    ]
		                },
		                lineStyle:{
		                	normal : {
		                		width : 5,
		                		color : options.lineColor
		                	}
		                },
		                data: options.data
		            }]
		        };
		        echart.setOption(option);
			}
		}
	}
</script>
<style scoped>
	.cold-detail-page{
		position: absolute;
		height: 100%;
		width: 100%;
		left:0;
		top:0;
		background: #303F7A;
		z-index: 3;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
	}
	.device-wrap{
		position: absolute;
		top:95px;
		width: 96%;
		bottom: 0;
		overflow:hidden;
		overflow-y: auto;
		padding-bottom: 20px;
	}
	.device-list {
		padding-top: 10px;
		width: 96%;
		margin: 0 auto;
	}
	.device-list  .flex-items{
		border:1px solid #6464E0;
		padding: 10px;
		color:#fff;
	}
	.on{
		background: #6464E0;
		color:#fff;
	}
</style>


