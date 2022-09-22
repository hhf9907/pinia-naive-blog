import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layouts/index.vue')

// 导入其他路由
import homeRouter from './home'
import aboutRouter from './about'
import aboutProjectRouter from './about-project'
import chartsRouter from './charts'
import userRouter from './user'
import { postDetailRouter, postEditRouter } from './post'
import userSettingsRouter from './user-settings'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      homeRouter,
      aboutRouter,
      aboutProjectRouter,
      chartsRouter,
      userRouter,
      postDetailRouter,
      userSettingsRouter
    ]
  },
  postEditRouter
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
