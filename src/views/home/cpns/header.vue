<template>
  <div class="home-header">
    <div class="category">
      <div
        class="category-item pointer"
        :class="{ active: !categoryId }"
        @click="clickCategoryItem(null)"
      >
        综合
      </div>
      <div
        class="category-item pointer"
        v-for="item in categoryList"
        :key="item.categoryId"
        :class="{ active: categoryId === item.categoryId }"
        @click="clickCategoryItem(item.categoryId)"
      >
        {{ item.categoryName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoryType } from '@/service/api/category/type'
import { useRouter } from 'vue-router'
const router = useRouter()
const { categoryList } = defineProps<{
  categoryList: CategoryType[]
  categoryId: number | null
}>()
const emit = defineEmits(['checkCategory'])

const clickCategoryItem = (categoryId: number | null) => {
  emit('checkCategory', categoryId)
  router.push({
    query: {
      categoryId: categoryId
    }
  })
}
</script>

<style scoped lang="less">
.home-header {
  position: fixed;
  top: 61px;
  height: 46px;
  background-color: #fff;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  .category {
    height: 100%;
    width: 960px;
    margin: 0 auto;
    display: flex;
  }
  .category-item {
    height: 100%;
    align-items: center;
    display: flex;
    flex-shrink: 0;
    font-size: 14px;
    color: #71777c;
    padding: 0 12px;
  }
  .category-item:hover {
    color: #18a058;
  }
  .category-item.active {
    color: #18a058;
  }
}
</style>