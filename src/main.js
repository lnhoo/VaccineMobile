import Vue from 'vue'
import router from './router'
import mui from '../js/mui.min.js'
import App from './App'
import '@/assets/css/common'

Vue.config.productionTip = false
window.mui=mui

mui.init()

mui.plusReady(function(){ 
        
    if(plus.networkinfo.getCurrentType()!=3){
    	// 3为状态码，wifi状态码是3
        mui.toast("当前为3G/4G网络")
    }else{
    	mui.toast("当前为wifi网络")
    }
    if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		mui.toast("网络异常，请检查网络设置！")
	}
})
// 扩展API加载完毕后调用onPlusReady回调函数 
document.addEventListener("plusready", onPlusReady, false); 

function onPlusReady(){
    document.addEventListener("pause", onAppPause, false);
}

function onAppPause(){
    mui.toast("程序切换到后台"); 
}

if(process.env.NODE_ENV==="development"){
	require('@/assets/css/mui.css') 
}

/* eslint-disable no-new */
new Vue({ 
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
