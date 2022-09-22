import { defineStore } from 'pinia'
import { CategoryType } from '@/service/api/category/type'

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categoryList: new Array<CategoryType>()
  }),

  actions: {
    update(categoryList: CategoryType[]) {
      this.$patch({
        categoryList: categoryList
      })
    }
  }
})

export default useCategoryStore
