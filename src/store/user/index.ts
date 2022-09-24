import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  loginRequest,
  getUserInfo,
  handleEmailLogin
} from '@/service/api/login/login'
import { ILogin, IEmailLogin } from '@/service/api/login/type'
import localCache from '@/utils/cache'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    avatar: '',
    collectTotal: 0,
    concerns: 0,
    email: '',
    fans: 0,
    name: '',
    nickname: '',
    notes: '',
    phone: '',
    pvTotal: 0,
    userId: '',
    homePage: '',
    createTime: '',
    isConcern: 0,
    beCollectedTotal: 0
  })
  const token = ref(localCache.getCache('token') || '')

  // actions
  const logout = () => {
    localCache.deleteCache('token')
    token.value = ''
  }

  /**
   * 进行登录
   * @param payload
   */
  const handleLogin = async (payload: ILogin) => {
    const loginInfo = await loginRequest(payload)
    user.value = loginInfo
    localCache.setCache('token', loginInfo.token)
  }

  /**
   * 获取用户信息
   */
  const handleUserInfo = async () => {
    if (localCache.getCache('token')) {
      const userInfo = await getUserInfo()
      user.value = userInfo
    }
  }

  /**
   * 邮箱登录
   * @param payload
   */
  const emailLogin = async (payload: IEmailLogin) => {
    const loginInfo = await handleEmailLogin(payload)
    localCache.setCache('token', loginInfo.token)
  }

  return {
    user,
    token,
    logout,
    handleLogin,
    handleUserInfo,
    emailLogin
  }
})

export default useUserStore
