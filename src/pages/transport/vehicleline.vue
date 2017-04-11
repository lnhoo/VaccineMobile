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
			let _self = this;
			_self.map = new BMap.Map("allmap")
			_self.map.centerAndZoom(new BMap.Point(116.331398,39.897445),11)
			let geolocation = new BMap.Geolocation()			
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					let mk = new BMap.Marker(r.point);
					_self.map.addOverlay(mk);
					_self.map.panTo(r.point);
					let label = new BMap.Label("您的位置:"+r.point.lng+','+r.point.lat,{offset:new BMap.Size(-20,-20)});
					mk.setLabel(label);
				}
				else {
					console.log('failed'+this.getStatus());
				}        
			},{enableHighAccuracy: true})
		},
		methods:{
			leave() {
				this.$parent.homeRouter = false
			},
			switchTab(num) {
				let lng = 124.43279092
				let lat = 43.80864478
				if(num==2){
					lng = lng - 10
					lat = lat - 5
				}
				if(num==4){
					lng = lng - 12
					lat = lat - 15
				}
				if(num==5){
					lng = lng - 18
					lat = lat - 15
				}
				this.map.clearOverlays();
				let new_point = new BMap.Point(lng,lat);     
				let mk = new BMap.Marker(new_point);
				this.map.addOverlay(mk);
				this.map.panTo(new_point);
				let label = new BMap.Label("您的位置:"+lng+','+lat,{offset:new BMap.Size(-20,-20)});
				mk.setLabel(label);
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