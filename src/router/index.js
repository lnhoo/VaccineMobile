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
      path: '/in-stock',
      name: 'inStock',
      component: resolve => require(['@/pages/stock/in_stock'], resolve)
    },
	{
      path: '/out-stock',
      name: 'outStock',
      component: resolve => require(['@/pages/stock/out_stock'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/stock/search'], resolve)
    },
    {
      path: '/nursery-stock',
      name: 'nurseryStock',
      component: resolve => require(['@/pages/inoculation/nursery_stock'], resolve)
    },
    {
      path: '/child-info',
      name: 'childInfo',
      component: resolve => require(['@/pages/inoculation/child_info'], resolve)
    },
    {
      path: '/vehicleline',
      name: 'vehicleline',
      component: resolve => require(['@/pages/transport/vehicleline'], resolve)
    }
  ]
})
