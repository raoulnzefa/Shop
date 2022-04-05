import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },

  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/Shop.vue')
  },

  {
    path: '/wish-list',
    name: 'wish-list',
    component: () => import('../views/WishLists.vue')
  },

  {
    path: '/viewed-items',
    name: 'viewed-items',
    component: () => import('../views/ViewItem.vue')
  },

  {
    path: '/product/:slug',
    name: 'product',
    component: () => import('../views/Product.vue')
  },

  {
    path: '/category/:slug',
    name: 'category',
    component: () => import('../views/Category.vue')
  },

  {
    path: '/brand/:slug',
    name: 'brand',
    component: () => import('../views/Brand.vue')
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },

  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/shopping/Shopping.vue')
  },
  // {
  //   path: '/cart',
  //   name: 'cart',
  //   component: () => import('../views/shopping/Cart.vue')
  // },

  // {
  //   path: '/checkout',
  //   meta:{ requiresAuth: true },
  //   name: 'checkout',
  //   component: () => import('../views/shopping/Checkout.vue')
  // },

  // {
  //   path: '/delivery',
  //   meta:{ requiresAuth: true },
  //   name: 'delivery',
  //   component: () => import('../views/shopping/Delivery.vue')
  // },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LogIn.vue'),
    meta:{ layout: 'auth' }
  },

  {
    path: '/signup',
    name: 'register',
    component: () => import('../views/SignUp.vue'),
    meta:{ layout: 'auth' }
  },

  {
    path: '/account', 
    component: () => import('../views/account/Account.vue'),
    
    children: [
      { 
        path: '', 
        name: 'user-home',
        component: () => import('../views/account/Home.vue'),
      },
      { 
        path: 'orders', 
        name: 'orders',
        component: () => import('../views/account/order/Order.vue'),
      },
      { 
        path: 'profile', 
        name: 'profile',
        component: () => import('../views/account/Profile.vue'),
      },
      { 
        path: 'order/:id', 
        name: 'order',
        component: () => import('../views/account/order/OrderShow.vue'),
      },

      { 
        path: 'wishlists', 
        name: 'account-wishlists',
        component: () => import('../views/account/WishLists.vue'),
      },

      { 
        path: 'change-password', 
        name: 'change-password',
        component: () => import('../views/account/ChangePassword.vue'),
      },

      { 
        path: 'view-items', 
        name: 'account-view-items',
        component: () => import('../views/account/ViewItems.vue'),
      },
      // ...other sub routes
    ]
  },

  {
    path: '/forgot-password',
    name: 'f-password',
    component: () => import('../views/ForgotPassword.vue'),
    meta:{ layout: 'auth' }
  },

  {
    path: '/myaccount/lost-password',
    name: 'r-password',
    component: () => import('../views/ResetPassword.vue')
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/isLoggedIn']) {
      next({ name : 'login', query: { redirect: to.fullPath }})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
