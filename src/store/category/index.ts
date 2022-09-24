import { defineStore } from 'pinia'
import { ref } from 'vue'
import { CategoryType } from '@/service/api/category/type'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<CategoryType[]>()

  const update = (list: CategoryType[]) => {
    categoryList.value = list
  }

  return { categoryList, update }
})
