const aboutRouter = {
  path: '/about',
  name: 'about',
  meta: { title: '欢迎' },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "about" */ '@/views/about/about.vue')
}

export default aboutRouter
