const userSettingsRouter = {
  path: '/userSetting',
  name: 'userSetting',
  redirect: '/userSetting/profile',
  meta: { title: '个人中心' },
  component: () => import('@/views/user-settings/index.vue'),
  children: [
    {
      path: '/userSetting/profile',
      name: 'profile',
      meta: { title: '个人资料' },
      component: () => import('@/views/user-settings/views/profile.vue')
    },
    {
      path: '/userSetting/account',
      name: 'account',
      meta: { title: '账号设置' },
      component: () => import('@/views/user-settings/views/account.vue')
    }
  ]
}

export default userSettingsRouter
