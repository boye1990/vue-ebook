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
    component: () => import('../views/ebook/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
