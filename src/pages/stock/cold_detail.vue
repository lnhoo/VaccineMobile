<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="cold-detail-page">
			<v-header :headerName="headerName"></v-header>
			<div class="device-wrap">
				<div class="device-list flex text-c">
					<span class="flex-items on" @click="switchTab($event)">设备1<br>温度：21<br>湿度：29</span>
					<span class="flex-items"  @click="switchTab($event)">设备2<br>温度：21<br>湿度：29</span>
					<span class="flex-items"  @click="switchTab($event)">设备3<br>温度：21<br>湿度：29</span>
				</div>
				
				<div id="temperature" style="width: 96%;height:260px;margin:20px auto;"></div>

				<div id="humidity" style="width: 96%;height:260px;margin:0 auto;"></div>

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
				headerName : '设备温湿度',

				dataList : [15, 20, 26.7, 26.5, 27, 21],
				xData : ["18:05","18:15","18:25","18:35","18:45","18:55"]
			}
		},
		mounted() {
	        this.initEcharts({
	        	id : 'temperature',
	        	text : '温度(℃)',
	        	xData : this.xData,
	        	lineColor : '#DC4FD3', 
	        	data : this.dataList
	        })

	        this.initEcharts({
	        	id : 'humidity',
	        	text : '湿度(℃)',
	        	lineColor : '#50E8ED', 
	        	xData : this.xData,
	        	data : this.dataList
	        })
		},
		methods : {
			leave() {
				this.$parent.listRouter = false
			},
			switchTab(e) {
				var flexItems = mui(".device-list .flex-items")

				for( var i=0; i<flexItems.length; i++ ){
					flexItems[i].className = "flex-items"
				}

				e.target.className = "flex-items on"

				this.initEcharts({
		        	id : 'humidity',
		        	text : '湿度℃',
		        	lineColor : '#50E8ED', 
		        	xData : this.xData,
		        	data : [24, 22, 21.7, 25, 22, 20]
		        })
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
				       	max : 27+6,
				       	min : 15-5,
                        splitLine:{  
                    		show:false  
                    	}  
				    },
		            series: [{
		                name: options.text,
		                type: 'line',
		                markLine: {
		                	lineStyle:{
                    			normal:{
		                			curveness:0.9,
		                			color:"blue"
		                		}
                    		},
		                    data: [
		                    	{type: 'max', name: '最高温度',lineStyle:{
		                    			normal:{
				                			color:"#F4599C"
				                		}
		                    		}
		                    	},
		                    	{type: 'min', name: '最低温度',lineStyle:{
		                    			normal:{
				                			color:"#1588D2"
				                		}
		                    		}
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
		background: #2D3C71;
		z-index: 3;
		padding: 45px 10px 0 10px;
		-webkit-transition:all .3s ease;
 		transition:all .3s ease;
	}
	.device-wrap{
		position: absolute;
		top:45px;
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


