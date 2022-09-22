<template>
  <div class="account">
    <h2>账号设置</h2>
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
            label="电话号码"
            path="phone"
          >
            <n-input
              v-model:value="dataForm.phone"
              placeholder="请输入电话号码"
            />
          </n-form-item>
          <n-form-item
            style="margin-bottom: 15px"
            label="个人邮箱"
            path="email"
          >
            <n-input
              v-model:value="dataForm.email"
              placeholder="请输入个人个人邮箱"
            />
          </n-form-item>
        </n-form>
        <n-button class="btn" strong type="primary" @click="saveUpdate"> 保存修改 </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/store/user'
import { updateAccountInfo } from '@/service/api/user/user'
import { useMessage } from 'naive-ui'

const userStore = useUserStore()
const message = useMessage()
const dataForm = reactive({
  phone: userStore.user.phone,
  email: userStore.user.email
})

const saveUpdate = async () => {
  await updateAccountInfo(dataForm)
  message.success('账户信息修改成功')
  userStore.handleUserInfo()
}
</script>

<style scoped lang="less">
.account {
  h2 {
    margin-top: 0;
  }
  .user-info {
    display: flex;
    .form {
      height: 500px;
      width: 700px;
      .btn {
        margin-left: 100px;
        margin-top: 50px;
      }
    }
  }
}
</style>
