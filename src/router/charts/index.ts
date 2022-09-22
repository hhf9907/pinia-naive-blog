const chartsRouter = {
  path: '/charts',
  name: 'charts',
  meta: { title: '数据图表' },
  component: () => import('@/views/charts/charts.vue')
}

export default chartsRouter