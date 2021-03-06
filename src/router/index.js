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
          component: resolve => require(['@/pages/user/home'], resolve),
          children : [
            {   
                path: 'nursery-stock', 
                name : 'nurseryStock',
                component: resolve => require(['@/pages/inoculation/nursery_stock'], resolve),
                children : [
                    {
                        path: 'stock-detail',
                        name: 'stockDetail',
                        component: resolve => require(['@/pages/inoculation/stock_detail'], resolve) 
                    }
                ]
            },
            {   
                path: 'list', 
                name : 'list',
                component: resolve => require(['@/pages/stock/list'], resolve),
                children : [
                    {
                        path: 'cold-detail',
                        name: 'coldDetail',
                        component: resolve => require(['@/pages/stock/cold_detail'], resolve) 
                    }
                ]
            },
            {
                path: 'in-stock',
                name: 'inStock',
                component: resolve => require(['@/pages/stock/in_stock'], resolve),
                children : [
                    {
                      path: 'barcode',
                      name: 'barcode',
                      component: resolve => require(['@/pages/layout/barcode'], resolve)
                    },
                    {
                        path: 'cold-list',
                        name: 'coldList',
                        component: resolve => require(['@/pages/stock/cold_list'], resolve)
                    },
                    {
                        path: 'detail',
                        name: 'detail',
                        component: resolve => require(['@/pages/stock/detail'], resolve),
                        children : [
                            {
                              path: 'cold-list',
                              name: 'coldList',
                              component: resolve => require(['@/pages/stock/cold_list'], resolve)
                            }
                        ]
                    },
                    {
                        path: 'order-detail',
                        name: 'orderDetail',
                        component: resolve => require(['@/pages/stock/order_detail'], resolve),
                        children : [
                            {
                              path: 'cold-list',
                              name: 'coldList',
                              component: resolve => require(['@/pages/stock/cold_list'], resolve)
                            }
                        ]
                    }
                ]
            },
            {
                path: 'out-stock',
                name: 'outStock',
                component: resolve => require(['@/pages/stock/out_stock'], resolve),
                children : [
                    {
                        path: 'stock-list',
                        name: 'stockList',
                        component: resolve => require(['@/pages/stock/stock_list'], resolve)
                    },
                    {
                        path: 'pack-list',
                        name: 'packList',
                        component: resolve => require(['@/pages/stock/pack_list'], resolve),
                        children : [
                            {
                                path: 'pack-detail',
                                name: 'packDetail',
                                component: resolve => require(['@/pages/stock/pack_detail'], resolve)
                            },
                            {
                                path: 'out-batch',
                                name: 'outBatch',
                                component: resolve => require(['@/pages/stock/out_batch'], resolve),
                                children : [
                                    {
                                        path: 'stock-list',
                                        name: 'stockList',
                                        component: resolve => require(['@/pages/stock/stock_list'], resolve)
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'stock-detail',
                        name: 'stockDetail',
                        component: resolve => require(['@/pages/stock/stock_detail'], resolve)
                    },
                    {
                        path: 'out-stock-detail',
                        name: 'outStockDetail',
                        component: resolve => require(['@/pages/stock/out_stock_detail'], resolve)
                    }
                ]
            },
            {
                path: 'actionSheet',
                name: 'actionSheet',
                component: resolve => require(['@/pages/layout/actionSheet'], resolve)
            },
            {
                path: 'vehicleline',
                name: 'vehicleline',
                component: resolve => require(['@/pages/transport/vehicleline'], resolve)
            },
            {
                path: 'traceability',
                name: 'traceability',
                component: resolve => require(['@/pages/inoculation/traceability'], resolve)
            },
            {
                path: 'maps',
                name: 'maps',
                component: resolve => require(['@/pages/layout/map'], resolve)
            }
          ]
        }
    ]
})
