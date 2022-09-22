import { defineStore } from 'pinia'
export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isRefresh: false
  }),

  actions: {
    updateRefresh(isRefresh: boolean) {
      this.$patch({
        isRefresh: isRefresh
      })
    }
  }
})

export default useMainStore
