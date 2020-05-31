import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/ebook' // 让首页重定向到/ebook
  },
  {
    path: '/ebook',
    component: () => import('../views/ebook/index.vue'),
    children: [
      {
        path: ':fileName', // 动态路由，fileName为路由地址ebook后面的字符串
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
