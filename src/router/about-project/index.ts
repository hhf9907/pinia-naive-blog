const aboutProjectRouter = {
  path: '/about-project',
  name: 'about-project',
  meta: { title: '关于项目' },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(
      /* webpackChunkName: "about" */ '@/views/about-project/about-project.vue'
    )
}

export default aboutProjectRouter
