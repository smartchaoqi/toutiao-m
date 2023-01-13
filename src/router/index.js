import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [
      {
        name: 'home',
        path: '', // 默认子路由，只能有1个
        component: () => import('@/views/home')
      },
      {
        name: 'qa',
        path: 'qa',
        component: () => import('@/views/qa')
      },
      {
        name: 'video',
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        name: 'my',
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path:'/',
    redirect:"/layout"
  }
]

const router = new VueRouter({
  routes
})

export default router
