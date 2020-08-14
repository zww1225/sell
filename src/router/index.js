import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login.vue'
import Layout from '../views/Layout/Layout.vue'

import { checktoken } from '@/api/apis'
Vue.use(VueRouter)

const routes = [

  // 登录
  {
    path: '/',
    // name: 'login',
    component: Login
    // component: () => import('../views/Login.vue')
  },
  // 首页
  {
    path: '/home',
    name: 'layout',
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { breadList: ['后台首页'] }
      },],


  },



  // 账号

  {
    path: '/account',
    name: 'account',
    component: Layout,
    redirect: "/add-account",
    children: [
      // 添加账号
      {
        path: '/add-account',
        name: 'add-account',

        component: () => import('../views/Account/AddAccount.vue'),
        meta: { breadList: ['账号管理', '添加账号'] }
      },

      // 修改密码
      {
        path: '/edit-pass',
        name: 'edit-pass',

        component: () => import('../views/Account/EditPass.vue'),
        meta: { breadList: ['账号管理', '修改密码'] }
      },


      // 账号列表
      {
        path: '/account-list',
        name: 'account-list',

        component: () => import('../views/Account/AccountList.vue'),
        meta: { breadList: ['账号管理', '账号列表'] }

      },
      // 个人中心
      {
        path: '/personal',
        name: 'personal',
        component: () => import('../views/Account/Personal.vue'),
        meta: { breadList: ['账号管理', '个人中心'] }
      },
    ]


  },

  // 统计
  {
    path: '/total',
    name: 'total',
    component: Layout,

    children: [

      // 商品统计
      {
        path: '/shop-total',
        name: 'shop-total',
        component: () => import('../views/Total/ShopTotal.vue'),
        meta: { breadList: ['销售统计', '商品统计'] }
      },


      // 订单统计
      {
        path: '/order-total',
        name: 'order-total',

        component: () => import('../views/Total/OrderTotal.vue'),
        meta: { breadList: ['销售统计', '订单统计'] }
      },

    ]

  },


  // 商品
  {
    path: '/goods',
    component: Layout,
    children: [

      // 商品列表
      {
        path: '/goods-list',
        name: 'goods-list',

        component: () => import('../views/Goods/GoodsList.vue'),
        meta: { breadList: ['商品管理', '商品列表'] }
      },
      // 商品添加
      {
        path: '/add-goods',
        name: 'add-goods',

        component: () => import('../views/Goods/AddGoods.vue'),
        meta: { breadList: ['商品管理', '商品添加'] }
      },
      // 商品分类
      {
        path: '/cate-goods',
        name: 'cate-goods',
        component: () => import('../views/Goods/CateGoods.vue'),
        meta: { breadList: ['商品管理', '商品分类'] }
      },

    ]
  },

  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '/shop',
        name: 'shop',

        component: () => import('../views/Shop.vue'),
        meta: { breadList: ['店铺管理'] }
      },
    ]
  },


  // 订单管理
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '/order',
        name: 'order',

        component: () => import('../views/Order/Order.vue'),
        meta: { breadList: ['订单管理'] }
      },
      {
        path: '/order-edit',
        name: 'order-edit',

        component: () => import('../views/Order/OrderEdit.vue'),
        meta: { breadList: ['订单管理', '订单编辑'] }
      },
    ]
  },





  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  // 判断跳转的是否是/
  if (to.path != '/') {
    // 验证token是否过期
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0) {
        next()
      }
      else {
        next('/')
      }
    })

  }
  else[
    next()
  ]
})


export default router
