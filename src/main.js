// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import mui from '../js/mui.min.js'
import App from './App'
import '@/assets/css/common'

Vue.config.productionTip = false
window.mui=mui

mui.init()

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
