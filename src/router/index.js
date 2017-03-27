import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/pages/user/login'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/pages/user/home'], resolve)
    },
    {
      path: '/list',
      name: 'list',
      component: resolve => require(['@/pages/stock/list'], resolve)
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve => require(['@/pages/stock/detail'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/stock/search'], resolve)
    },
    {
      path: '/child-info',
      name: 'childInfo',
      component: resolve => require(['@/pages/inoculation/child_info'], resolve)
    }  
  ]
})
