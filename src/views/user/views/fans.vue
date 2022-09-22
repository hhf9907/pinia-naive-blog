<template>
  <div class="fans">
    <ChildViewHeader titleText="粉丝" />
    <template v-if="isRequest">
      <div class="skeleton">
        <n-space>
          <n-skeleton circle size="medium" />
          <n-skeleton :width="402" round size="medium" />
        </n-space>
      </div>
    </template>
    <template v-else>
      <template v-if="fansList?.list.length">
        <UserItem
          :user-item="item"
          v-for="item in fansList.list"
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

import { getFansList } from '@/service/api/user/user'
import { RelationDetailType } from '@/service/api/user/type'

// hooks
import useScrollBottom from '@/hooks/useScrollBottom'

const route = useRoute()

const fansList = reactive<{
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
  getFans()
})

useScrollBottom(() => {
  if (pageNum.value === fansList.pages) {
    return
  }
  pageNum.value++
  getFans(true)
})

async function getFans(isConcat = false) {
  const userId = route.params.userId + ''
  const data = await getFansList(userId, pageNum.value)
  isRequest.value = false
  fansList.count = data.count
  fansList.pages = data.pages
  if (!isConcat) {
    fansList.list = data.list
  } else {
    fansList.list = fansList.list.concat(data.list)
  }
}
</script>

<style scoped lang="less">
.fans {
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
