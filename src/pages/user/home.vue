<template>
	<div class="page-home">
		<v-header :headerName="headerName"></v-header>				
		<!--首页 begin-->
		<div v-show="home">
			<v-home></v-home>	
		</div>
		<!--首页 end-->
		
		<!--消息 begin-->
		<div v-show="message">
			<v-message></v-message>	
		</div>
		<!--消息 end-->
			
		<!--育苗 begin-->
		<div v-show="seedlings">
			<v-seedlings></v-seedlings>	
		</div>
		<!--育苗 end-->
		
		<!--我的 begin-->
		<div v-show="mine">
			<v-mine></v-mine>	
		</div>
		<!--我的 end-->
		
		<v-tabber :tabberName="tabberName"></v-tabber>
		
		<transition name="move">
			<div :class="{'home-router-active':homeRouter}" class="home-router" v-show="homeRouter">
				<router-view></router-view>	
			</div>
		</transition>
	</div>
</template>

<script>
	import header from '@/pages/layout/header'
	import tabber from '@/pages/layout/tabber'
	import home  from '@/pages/layout/home'
	import seedlings from '@/pages/layout/seedlings'
	import message from '@/pages/layout/message'
	import mine from '@/pages/layout/mine'
    
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
				headerName : '首页',
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
           			mui.toast("有该权限")
       				this.homeRouter = !this.homeRouter
       				this.$router.push({path:url})
           		}else{
           			// 不存在该权限
       				mui.alert("你没有该功能权限")
       			}
           	},
           	toggleComponents( type, tabName ) {
           		var self = this;
           		var tabs = ['home','mine','message','seedlings']
           		tabs.forEach(function(tab){
           			tab == type ? self[type] = true : self[tab] = false
           		})
           		this.headerName = tabName
           	}
           	
		}
    }
</script>
<style >
	.home-router{
		height:100%;
		width:100%;
		background:transparent;
		position:absolute;
		left:0;
		top:0;
		-webkit-transform:translate3d(100%,0,0);
		transform:translate3d(100%,0,0);
	}
	.home-router-active{
		-webkit-transition:all .3s ease;
		transition:all .3s ease;
		-webkit-transform:translate3d(0,0,0);
		transform:translate3d(0,0,0);
	}
</style>