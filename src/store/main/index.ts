import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  const isRefresh = ref(false)
  const updateRefresh = (isRef: boolean) => {
    isRefresh.value = isRef
  }

  return { isRefresh, updateRefresh }
})

export default useMainStore
