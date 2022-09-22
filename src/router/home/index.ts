const homeRouter = {
  path: '/home',
  component: () => import('@/views/home/home.vue'),
  name: 'home',
  meta: { title: '首页' }
}

export default homeRouter
