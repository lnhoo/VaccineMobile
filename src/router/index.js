import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/user/login'
import Home from '@/pages/user/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }    
  ]
})
