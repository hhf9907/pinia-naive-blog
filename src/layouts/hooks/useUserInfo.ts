import { reactive, Ref } from 'vue'
import localCache from '@/utils/cache'
import { useUserStore } from '@/store/user'
export default function useUserInfo(isShowPic: Ref) {
  const user = reactive({
    id: '',
    avatar: '',
    nickname: ''
  })
  const userStore = useUserStore()
  if (localCache.getCache('token')) {
    isShowPic.value = true
    const userInfo = userStore.user
    user.avatar = userInfo.avatar
    user.nickname = userInfo.nickname
  }
  return {
    user
  }
}
