<template>
  <div class="home">
    <homeHeader
      :categoryList="categoryList"
      :categoryId="categoryId"
      @checkCategory="checkCategory"
    ></homeHeader>
    <div class="home-order">
      <div class="select-post-order">
        <div
          class="item pointer"
          :class="{ active: queryParams.queryType === 2 }"
          @click="checkQueryType(2)"
        >
          最热
        </div>
        <div
          class="item pointer"
          :class="{ active: queryParams.queryType === 1 }"
          @click="checkQueryType(1)"
        >
          最新
        </div>
      </div>
    </div>

    <div
      class="container"
      :style="{ width: isLTWindow ? clientWidth + 'px' : '' }"
    >
      <PostItem
        v-for="item in postList"
        :postItem="item"
        @handleDelete="handleDelete"
        :key="item.postId"
      />
    </div>
    <n-back-top :right="100" />
  </div>
</template>

<script setup lang="ts">
// EyeOutline
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

import { getAllCategory } from '@/service/api/category/cagegory'
import { CategoryType } from '@/service/api/category/type'
import { List } from '@/service/api/post/type'
import { getPostList } from '@/service/api/post/post'
import bus from '@/utils/bus'

// hooks
import useScrollBottom from '@/hooks/useScrollBottom'
import useListenerResize from '@/hooks/useListenerResize'

// 组件
import homeHeader from './cpns/header.vue'
import PostItem from '@/components/post-item/post-item.vue'

console.log('home page')

const route = useRoute()
const categoryList = ref<CategoryType[]>([])
const postList = ref<List[]>([])
const categoryId = ref(Number(route.query.categoryId) || null)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keyword: '',
  categoryId: categoryId,
  queryType: 2
})
const pages = ref(1)

bus.$on('searchPost', (value: string) => {
  queryParams.keyword = value
  queryPostList()
})

const { isLTWindow, clientWidth } = useListenerResize(900)
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
  const data = await getPostList(queryParams)
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
}

// 事件监听
const checkCategory = (id: number | null) => {
  categoryId.value = id
  queryPostList()
}

const checkQueryType = (type: number) => {
  queryParams.queryType = type
  queryPostList()
}

const handleDelete = (postId: string) => {
  const findIndex = postList.value.findIndex((item) => item.postId === postId)
  postList.value.splice(findIndex, 1)
}
</script>

<style lang="less" scoped>
.home {
  .home-order {
    position: fixed;
    top: 108px;
    background-color: #fff;
    width: 100%;
    z-index: 10;
    border-bottom: 1px solid #f1f1f1;
    .select-post-order {
      display: flex;
      width: 960px;
      height: 40px;
      align-items: center;
      box-sizing: border-box;
      padding-left: 20px;
      margin: 0 auto;
      .item {
        width: 50px;
      }
      .item.active {
        color: #18a058;
      }
    }
  }

  .container {
    padding-top: 106px;
    width: 960px;
    margin: 0 auto;
  }
}
</style>
