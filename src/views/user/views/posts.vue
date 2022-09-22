<template>
  <div class="posts">
    <ChildViewHeader titleText="文章" />
    <template v-if="isRequest">
      <div class="skeleton">
        <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 60%" />
      </div>
    </template>
    <template v-else>
      <template v-if="postList.length">
        <PostItem
          v-for="item in postList"
          :postItem="item"
          @handleDelete="handleDelete"
          :key="item.postId"
        />
      </template>
      <div v-else class="empty">
        <n-empty description="这里什么都没有"> </n-empty>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { getAllCategory } from '@/service/api/category/cagegory'
import { CategoryType } from '@/service/api/category/type'
import { getPostListByUserId } from '@/service/api/post/post'
import { List } from '@/service/api/post/type'

// 组件
import PostItem from '@/components/post-item/post-item.vue'
import ChildViewHeader from '../cpns/child-view-header.vue'

// hooks
import useScrollBottom from '@/hooks/useScrollBottom'

const route = useRoute()

const queryParams = reactive({
  userId: route.params.userId,
  pageNum: 1,
  queryType: 1
})
const categoryList = ref<CategoryType[]>([])
const postList = ref<List[]>([])
const pages = ref(1)
const isRequest = ref(true)

useScrollBottom(() => {
  if (queryParams.pageNum === pages.value) {
    return
  }
  queryParams.pageNum++
  queryPostList(true)
})

getCategoryData()

async function getCategoryData() {
  categoryList.value = await getAllCategory()
  queryPostList()
}
async function queryPostList(isConcat = false) {
  const data = await getPostListByUserId(queryParams)
  const list = data.list
  pages.value = data.pages
  list.forEach((post) => {
    post.categoryNames = []
    if (post.categoryIds) {
      const categoryIds = post.categoryIds.split(',')
      categoryList.value.forEach((category) => {
        if (categoryIds.includes(category.categoryId + '')) {
          post.categoryNames!.push(category.categoryName)
        }
      })
    }
  })
  if (!isConcat) {
    postList.value = list
  } else {
    postList.value = postList.value.concat(list)
  }
  isRequest.value = false
}

const handleDelete = (postId: string) => {
  const findIndex = postList.value.findIndex((item) => item.postId === postId)
  postList.value.splice(findIndex, 1)
}
</script>

<style scoped lang="less">
.posts {
  .empty {
    background: #fff;
    padding: 30px 0;
  }
  .skeleton {
    padding: 20px;
    background: #fff;
  }
}
</style>
