const postEditRouter = {
  path: '/post/editor',
  name: 'postEditro',
  meta: { title: '文章编写' },
  component: () => import('@/views/post/editor/index.vue')
}

export default postEditRouter