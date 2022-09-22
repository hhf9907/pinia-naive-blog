<template>
  <div class="profile">
    <h2>个人资料</h2>
    <div class="user-info">
      <div class="form">
        <n-form
          ref="formRef"
          :model="dataForm"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          :style="{
            maxWidth: '640px'
          }"
        >
          <n-form-item
            style="margin-bottom: 15px"
            label="用户昵称"
            path="inputValue"
          >
            <n-input
              v-model:value="dataForm.nickname"
              placeholder="请输入用户名"
            />
          </n-form-item>
          <n-form-item
            style="margin-bottom: 15px"
            label="个人主页"
            path="inputValue"
          >
            <n-input
              v-model:value="dataForm.homePage"
              placeholder="请输入个人主页"
            />
          </n-form-item>
          <n-form-item
            style="margin-bottom: 15px"
            label="个人说明"
            path="textareaValue"
          >
            <n-input
              v-model:value="dataForm.notes"
              placeholder="请填写个人说明"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5
              }"
            />
          </n-form-item>
        </n-form>
        <n-button class="btn" strong type="primary" @click="saveUpdate"> 保存修改 </n-button>
      </div>
      <div class="avatar">
        <n-upload
          :action="BASE_URL+'/upload/avatar'"
          :headers="{
            'Authorization': token
          }"
          name="avatar"
          :show-file-list="false"
          :data="{
          }"
          @finish="handleFinish"
        >
          <n-avatar
            round
            :size="90"
            class="pointer"
            :src="userStore.user.avatar"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </n-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { BASE_URL } from '@/service/request/config'
import localCache from '@/utils/cache'
import { updateBaseInfo } from '@/service/api/user/user'
import { useMessage } from 'naive-ui'

const userStore = useUserStore()
const message = useMessage()
const token = localCache.getCache('token')
const dataForm = reactive({
  nickname: userStore.user.nickname,
  homePage: userStore.user.homePage,
  notes: userStore.user.notes
})

const handleFinish = () => {
  window.location.reload()
}

const saveUpdate = async () => {
  await updateBaseInfo(dataForm)
  message.success('个人信息修改成功')
  userStore.handleUserInfo()
}
</script>

<style scoped lang="less">
.profile {
  h2 {
    margin-top: 0;
  }
  .user-info {
    display: flex;
    .form {
      height: 500px;
      width: 500px;
      .btn {
        margin-left: 100px;
        margin-top: 50px;
      }
    }
    .avatar {
      margin-left: 60px;
    }
  }
}
</style>
