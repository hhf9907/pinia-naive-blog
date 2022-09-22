<template>
  <div class="left-header">
    <h1>{{ postDetail?.postName }}</h1>
    <div class="left-user">
      <n-avatar
        round
        size="large"
        class="pointer"
        @click="toUserPage"
        :src="postDetail?.avatar"
      />
      <div class="info">
        <div style="font-size: 16px" class="pointer" @click="toUserPage">
          {{ postDetail?.nickname }}
        </div>
        <div style="color: #8a919f; margin-top: 2px">
          <span>{{ dateFormat(postDetail?.createTime || '') }}</span
          >·
          <span>阅读:{{ postDetail?.pv }}</span>
          <n-button
            text
            type="primary"
            style="margin-left: 20px"
            v-if="userStore.user.userId === postDetail?.userId"
            @click="toPostEdit"
          >
            编辑
          </n-button>
        </div>
      </div>
      <n-button
        :type="postDetail?.isRelation ? 'tertiary' : 'primary'"
        style="margin-left: auto"
        strong
        secondary
        @click="relation"
      >
        {{ postDetail?.isRelation ? '取消关注' : '立即关注' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
// 工具
import { dateFormat } from '@/utils/dateFormat'

import { concernUser, cancelConcernUser } from '@/service/api/user/user'
import { PostDetailType } from '@/service/api/post/type'
import { useUserStore } from '@/store/user'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const { postDetail } = defineProps<{
  postDetail: PostDetailType | undefined
}>()
const emit = defineEmits<{
  (e: 'updateRelation', isRelation: number): void
}>()

// 编辑文章
const toPostEdit = () => {
  router.push({
    path: `/post/editor`,
    query: {
      postId: postDetail?.postId,
      type: 'edit'
    }
  })
}

const relation = async () => {
  const requestFn = postDetail?.isRelation ? cancelConcernUser : concernUser
  await requestFn(postDetail?.userId)
  message.success(postDetail?.isRelation ? '取消关注成功' : '关注成功')
  emit('updateRelation', postDetail?.isRelation ? 0 : 1)
}

const toUserPage = () => {
  router.push(`/user/${postDetail?.userId}`)
}
</script>

<style scoped lang="less">
.left-header {
  padding: 0 32px;
  padding-top: 20px;
  background-color: #fff;
}
.left-user {
  height: 48px;
  display: flex;
  align-items: center;
  .info {
    margin-left: 20px;
  }
}
</style>
