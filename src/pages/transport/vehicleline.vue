<template>
	<transition name="move" v-on:after-leave="leave">
		<div class="maps">
			<v-header :headerName="headerName"></v-header>
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
				headerName:'运输监控',
				map : null
			}
		},
		mounted() {
            (function(){        
            	//闭包
				function load_script(xyUrl, callback){
				    var head = document.getElementsByTagName('head')[0];
				    var script = document.createElement('script');
				    script.type = 'text/javascript';
				    script.src = xyUrl;
				    //借鉴了jQuery的script跨域方法
				    script.onload = script.onreadystatechange = function(){
				        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
				            callback && callback();
				            // Handle memory leak in IE
				            script.onload = script.onreadystatechange = null;
				            if ( head && script.parentNode ) {
				                head.removeChild( script );
				            }
				        }
				    };
				    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				    head.insertBefore( script, head.firstChild );
				}
				function translate(point,type,callback){
				    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
				    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
				    //动态创建script标签
				    load_script(xyUrl);
				    BMap.Convertor[callbackName] = function(xyResult){
				        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
				        var point = new BMap.Point(xyResult.x, xyResult.y);
				        callback && callback(point);
				    }
				}

				window.BMap = window.BMap || {};
				BMap.Convertor = {};
				BMap.Convertor.translate = translate;
			})()

			let _self = this;
			this.map = new BMap.Map("allmap")
			this.map.centerAndZoom(new BMap.Point(116.331398,39.897445),15)
			let geolocation = new BMap.Geolocation()			
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					console.log(r.point)
					BMap.Convertor.translate(r.point, 0, function(point){
						//初始化地图 
						console.log(point)
						let mk = new BMap.Marker(point);
						_self.map.addOverlay(mk);
						_self.map.panTo(point);
						let label = new BMap.Label("您的位置:"+point.lng+','+point.lat,{offset:new BMap.Size(-20,-20)});
						mk.setLabel(label);
					})
				}
				else {
					console.log('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
           

           /* $.getJSON("http://wthrcdn.etouch.cn/weather_mini?city=北京",{},function(result){
                console.log(result)
            });*/
		},
		methods:{
			leave() {
				this.$parent.homeRouter = false
			},
			switchTab(num) {
				let _self = this
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

				this.map.clearOverlays()
				let new_point = new BMap.Point(lng,lat)

				BMap.Convertor.translate(new_point, 0, function(point){
					//初始化地图 
					console.log(point)
					let mk = new BMap.Marker(point);
					_self.map.addOverlay(mk);
					_self.map.panTo(point);
					let label = new BMap.Label("您的位置:"+point.lng+','+point.lat,{offset:new BMap.Size(-20,-20)});
					mk.setLabel(label);
				})
			}
		}
	}
</script>
<style scoped="scoped">
	#allmap{
		position: absolute;
		top:45px;
		left: 0;
		right: 0;
		bottom: 120px;
		overflow: hidden;
	}
	.maps{
		height: 100%;
		width: 100%;
		background: #fff;
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