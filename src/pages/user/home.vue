<template>
	<div>
			<v-header :headerObj="headerObj" ref="header"></v-header>				
			<!--首页 begin-->
			<v-home  v-show="home"></v-home>	
			<!--首页 end-->

			<!--育苗 begin-->
			<v-seedlings v-show="seedlings"></v-seedlings>	
			<!--育苗 end-->

			<!--gps begin-->
			<v-gps v-show="gps"></v-gps>	
			<!--gps end-->

			<!--我的 begin-->
			<v-mine v-show="mine" ref="mylocation"></v-mine>	
			<!--我的 end-->

			<v-tabber :tabberName="tabberName"></v-tabber>
			

			<router-view></router-view>		
	</div>
</template>

<script>
	import header from '@/pages/layout/header'
	import tabber from '@/pages/layout/tabber'
	import home  from '@/pages/layout/home'
	import seedlings from '@/pages/layout/seedlings'
	import gps from '@/pages/layout/gps'
	import mine from '@/pages/layout/mine'
    require('@/assets/js/mui.pullToRefresh')
	require('@/assets/js/mui.pullToRefresh.material')
    export default {
    	name: 'page-home',
    	components :{
    		'v-header' : header,
    		'v-tabber' : tabber,
    		'v-home' : home,
    		'v-mine' : mine,
    		'v-seedlings' : seedlings,
    		'v-gps' : gps    
    	},
        data() {
			return {
				headerObj : {
					title : '首页',
					hasBack : false,
					isHome : true
				},
				homeRouter : false,
				tabberName:'选项卡',
				home : true,
				mine : false,
				gps : false,
				seedlings : false
			}
		},
		mounted(){
			// 获取用户菜单权限集合
			this.codeList = JSON.parse(localStorage.getItem("codeList"))
		},
		methods : {
           	goPage( url,obj ) {
           		let _self = this;
           		let codeList = this.codeList;
           		let flag = false;
           		// 循环权限数组
           		for(var i = 0;i < codeList.length;i++ ){
           			// 存在该权限
           			if( codeList[i] == obj ){
           				flag = true;
           				break;
           			}
           		}
           		if(flag){
           			// 如果是疫苗溯源则调用扫码功能
           			if(url.indexOf("traceability")!=-1){
           				let _self = this;
						let content = plus.android.runtimeMainActivity();
						plus.D9Plugin.scanQrCode("", "", "", content.getIntent(), function(result) {
							//成功
							var codeValue = result.split("|")[0];
							if(codeValue){
								_self.$router.push({path:url,query:{codeValue:codeValue}})
							}else{
								mui.toast("无效二维码");
							}
						}, function(result) {
							//失败
							mui.toast("失败")
						})
           			}else{
       					this.$router.push({path:url})
           			}
           		}else{
           			// 不存在该权限
       				mui.alert("你没有该功能权限")
       			}
           	},
           	toggleComponents( type, tabName ) {
           		var self = this;
           		var tabs = ['home','mine','gps','seedlings']
           		tabs.forEach(function(tab){
           			tab == type ? self[type] = true : self[tab] = false
           		})

           		this.$refs.header.changeTitle(tabName);
           	},
           	refreMineData(){
           		this.$refs.mylocation.updateData();
           	},
           	openLocation( vehicleId ) {
           		let _self = this;
           		/*if(plus.os.name=="Android"){   
				    var context = plus.android.importClass("android.content.Context"); 
				    var locationManager=plus.android.importClass("android.location.LocationManager"); 
				    var main = plus.android.runtimeMainActivity(); 
				    var mainSvr = main.getSystemService(context.LOCATION_SERVICE); 
				    var androidIsOpen = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER); 
				    if(!androidIsOpen){ 
				    	mui.toast("请手动开启GPS"); return;
				    }
				} */
           		setTimeout(function(){
					_self.$router.push({
		    			path :'/home/maps',
		    			query : {
		    				vehicleId : vehicleId
		    			}
		    		})	
           		},2000);
           	}
		}
    }
</script>
<style >

</style>