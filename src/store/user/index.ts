import { defineStore } from 'pinia'
import {
  loginRequest,
  getUserInfo,
  handleEmailLogin
} from '@/service/api/login/login'
import { ILogin, IEmailLogin } from '@/service/api/login/type'
import localCache from '@/utils/cache'
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
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
    },
    token: ''
  }),

  actions: {
    logout() {
      localCache.deleteCache('token')
      this.$patch({
        token: ''
      })
    },

    /**
     * 进行登录
     * @param payload
     */
    async handleLogin(payload: ILogin) {
      const loginInfo = await loginRequest(payload)
      this.$patch({
        user: loginInfo
      })
      localCache.setCache('token', loginInfo.token)
    },
    async handleEmailLogin(payload: IEmailLogin) {
      const loginInfo = await handleEmailLogin(payload)
      localCache.setCache('token', loginInfo.token)
    },
    /**
     * 获取用户信息
     */
    async handleUserInfo() {
      if (localCache.getCache('token')) {
        const userInfo = await getUserInfo()
        this.$patch({
          user: userInfo
        })
      }
    }
  }
})

export default useUserStore
