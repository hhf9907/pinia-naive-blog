const userRouter = {
  path: '/user/:userId',
  name: 'user',
  meta: { title: '个人中心' },
  component: () => import('@/views/user/user.vue'),
  children: [
    {
      path: '',
      component: () => import('@/views/user/views/dynamic.vue')
    },
    {
      path: 'posts',
      component: () => import('@/views/user/views/posts.vue')
    },
    {
      path: 'collections',
      component: () => import('@/views/user/views/collections.vue')
    },
    {
      path: 'concerns',
      component: () => import('@/views/user/views/concerns.vue')
    },
    {
      path: 'fans',
      component: () => import('@/views/user/views/fans.vue')
    }
  ]
}

export default userRouter