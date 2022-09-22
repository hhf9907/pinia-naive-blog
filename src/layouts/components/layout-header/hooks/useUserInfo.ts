import { reactive, Ref } from 'vue'
import localCache from '@/utils/cache'
import { useUserStore } from '@/store/user'
export default function useUserInfo(isShowPic: Ref) {
  const user = reactive({})
  const userStore = useUserStore()

  return {
    user
  }
}
