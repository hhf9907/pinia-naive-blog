<template>
  <div class="concerns">
    <ChildViewHeader titleText="关注" />
    <template v-if="isRequest">
      <div class="skeleton">
        <n-space>
          <n-skeleton circle size="medium" />
          <n-skeleton :width="402" round size="medium" />
        </n-space>
      </div>
    </template>
    <template v-else>
      <template v-if="concernList?.list.length">
        <UserItem
          :user-item="item"
          v-for="item in concernList.list"
          :key="item.userId"
        />
      </template>
      <div v-else class="empty">
        <n-empty description="这里什么都没有"> </n-empty>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

// 组件
import ChildViewHeader from '../cpns/child-view-header.vue'
import UserItem from '../cpns/user-item.vue'

import { getConcernList } from '@/service/api/user/user'
import { RelationDetailType } from '@/service/api/user/type'

// hooks
import useScrollBottom from '@/hooks/useScrollBottom'

const route = useRoute()

const concernList = reactive<{
  count: number
  list: RelationDetailType[]
  pages: number
}>({
  count: 0,
  list: [],
  pages: 0
})

const pageNum = ref(1)
const isRequest = ref(true)

onMounted(() => {
  getConcerns()
})

useScrollBottom(() => {
  if (pageNum.value === concernList.pages) {
    return
  }
  pageNum.value++
  getConcerns(true)
})

async function getConcerns(isConcat = false) {
  const userId = route.params.userId + ''
  const data = await getConcernList(userId, pageNum.value)
  isRequest.value = false
  concernList.count = data.count
  concernList.pages = data.pages
  if (!isConcat) {
    concernList.list = data.list
  } else {
    concernList.list = concernList.list.concat(data.list)
  }
}
</script>

<style scoped lang="less">
.concerns {
  .skeleton {
    padding: 20px;
    background: #fff;
  }
  .empty {
    background: #fff;
    padding: 30px 0;
  }
}
</style>
