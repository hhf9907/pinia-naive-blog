<template>
  <div class="user-info">
    <div class="avatar">
      <n-avatar
        round
        :size="90"
        :src="userInfo?.avatar"
        fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </div>
    <div class="info">
      <h2>{{ userInfo?.nickname }}</h2>
      <div class="notes">
        <n-icon
          size="20"
          style="margin-right: 10px"
          :component="NewspaperOutline"
        />
        <span>{{ userInfo?.notes || '暂无个人说明' }}</span>
      </div>
    </div>
    <div class="operation">
      <n-button
        strong
        secondary
        type="primary"
        v-if="route.params.userId === userStore.user?.userId"
        @click="toUserSettingRouter"
      >
        编辑个人资料
      </n-button>
      <n-button
        v-else
        :type="userInfo?.isConcern ? 'tertiary' : 'primary'"
        style="margin-left: auto"
        strong
        secondary
        @click.stop="relation"
      >
        {{ userInfo?.isConcern ? '取消关注' : '立即关注' }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { NewspaperOutline } from '@vicons/ionicons5'
import { UserInfoType } from '@/service/api/user/type'
import { useUserStore } from '@/store/user'
import { useMessage } from 'naive-ui'

import { cancelConcernUser, concernUser } from '@/service/api/user/user'

const props = defineProps<{
  userInfo: UserInfoType | null | undefined
}>()
const emit = defineEmits<{
  (e: 'getUserInfo'): void
}>()

const message = useMessage()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const toUserSettingRouter = () => {
  router.push('/userSetting')
}
const relation = async () => {
  const requestFn = props.userInfo?.isConcern ? cancelConcernUser : concernUser
  await requestFn(props.userInfo?.userId)
  message.success(props.userInfo?.isConcern ? '取消关注成功' : '关注成功')
  // userInfo!.isConcern = userInfo?.isConcern ? 0 : 1
  emit('getUserInfo')
}
</script>

<style scoped lang="less">
.user-info {
  height: 164px;
  box-sizing: border-box;
  padding: 30px;
  background-color: #fff;
  display: flex;

  .avatar,
  .operation {
    flex: 0 0 auto;
  }

  .avatar {
    margin-right: 20px;
  }

  .info {
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }

    .notes {
      font-size: 15px;
      color: #72777b;
      margin-top: 15px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
