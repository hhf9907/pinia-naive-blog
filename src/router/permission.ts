import router from './index'
import { useMainStore } from '@/store/main'
import { useUserStore } from '@/store/user'
import localCache from '@/utils/cache'


router.beforeEach(async (to) => {
  const mainStore = useMainStore()
  const userStore = useUserStore()
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }

  window.scrollTo(0, 0)


  const isRefresh = mainStore.isRefresh
  if (!isRefresh && localCache.getCache('token')) {
    // 刷新时获取用户信息
    try {
      await userStore.handleUserInfo()
      mainStore.updateRefresh(true)
    } catch (error) {
      return
    }
  }
  return
})

router.afterEach(() => {
  // 关闭进度条
})
