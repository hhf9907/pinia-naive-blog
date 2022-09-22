<template>
  <div class="user-item pointer" @click="toUserPage">
    <n-avatar
      round
      :size="50"
      :src="userItem.avatar"
      fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
    <div class="user-name">{{ userItem.nickname }}</div>
    <n-button
        :type="userItem.isConcern ? 'tertiary' : 'primary'"
        style="margin-left: auto"
        strong secondary
        @click.stop="relation"
      >
        {{ userItem.isConcern ? '取消关注' : '立即关注'}}
      </n-button>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { RelationDetailType } from '@/service/api/user/type'
import { concernUser, cancelConcernUser } from '@/service/api/user/user'

const { userItem } = defineProps<{
  userItem: RelationDetailType
}>()
const message = useMessage()
const router = useRouter()

const relation = async () => {
  const requestFn = userItem.isConcern ? cancelConcernUser : concernUser
  await requestFn(userItem.userId)
  message.success(userItem.isConcern ? '取消关注成功' : '关注成功')
  userItem.isConcern = userItem.isConcern ? 0 : 1
}

const toUserPage = () => {
  router.push(`/user/${userItem.userId}`)
}
</script>

<style scoped lang="less">
.user-item {
  padding: 10px 28px;
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 1px;
  .user-name {
    font-weight: 600;
    font-size: 16px;
    margin-left: 30px;
  }
}
.user-item:hover {
  background-color: #fcfcfc;
}
</style>
