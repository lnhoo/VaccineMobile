<template>
	<div>
			<v-header :headerObj="headerObj"></v-header>				
			<!--首页 begin-->
			<v-home  v-show="home"></v-home>	
			<!--首页 end-->
			
			<!--消息 begin-->
			<v-message v-show="message"></v-message>	
			<!--消息 end-->
				
			<!--育苗 begin-->
			<v-seedlings v-show="seedlings"></v-seedlings>	
			<!--育苗 end-->
			
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
	import message from '@/pages/layout/message'
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
    		'v-message' : message    
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
				message : false,
				seedlings : false
			}
		},
		mounted(){
			// 获取用户菜单权限集合
			this.codeList = JSON.parse(localStorage.getItem("codeList"))
		},
		methods : {
           	goPage( url,obj ) {
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
       				this.$router.push({path:url})
           		}else{
           			// 不存在该权限
       				mui.alert("你没有该功能权限")
       			}
           	},
           	toggleComponents( type, tabName ) {
           		var self = this;
           		if(type=="mine"){
           			if(plus.os.name=="Android"){   
					    var context = plus.android.importClass("android.content.Context"); 
					    var locationManager=plus.android.importClass("android.location.LocationManager"); 
					    var main = plus.android.runtimeMainActivity(); 
					    var mainSvr = main.getSystemService(context.LOCATION_SERVICE); 
					    var androidIsOpen = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER); 
					    if(!androidIsOpen){ 
					    	mui.toast("请手动开启GPS"); return;
					    }else{
					    	self.$refs.mylocation.initData();
					    } 
					} 
           		}
           		var tabs = ['home','mine','message','seedlings']
           		tabs.forEach(function(tab){
           			tab == type ? self[type] = true : self[tab] = false
           		})
           	}
		}
    }
</script>
<style >

</style>