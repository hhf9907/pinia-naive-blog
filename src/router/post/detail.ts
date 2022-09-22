const postDetailRouter = {
  path: '/post/:postId',
  name: 'detail',
  meta: { title: '文章' },
  component: () => import('@/views/post/detail/index.vue')
}

export default postDetailRouter