<template>
  <div class="login-box login-modal-box">
    <div class="login-form">
      <h1 class="title">
        用户注册
        <div class="close-box" @click="close"><span class="close"></span></div>
      </h1>
      <div class="input-box">
        <n-input
          type="text"
          v-model:value="name"
          placeholder="请输入用户名"
          :maxlength="15"
          v-focus
        >
        </n-input>
      </div>
      <div class="input-box">
        <n-input
          type="password"
          v-model:value="password"
          show-password-on="click"
          placeholder="请输入密码"
          :maxlength="16"
        >
        </n-input>
      </div>
      <div class="input-box">
        <n-input
          type="password"
          v-model:value="regPassword"
          show-password-on="click"
          placeholder="请输入密码"
          :maxlength="16"
        >
        </n-input>
      </div>
      <div class="submit-box">
        <div class="login-btn btn" @click="login">登录</div>
        <div class="reg-btn btn" @click="handleRegister">注册</div>
      </div>
      <div class="reset-pass" @click="resetClick">点击重置密码</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useMessage } from 'naive-ui'
import { stopScroll, canScroll } from '@/utils/util'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import bus from '@/utils/bus'
import { encrypt, decrypt } from '@/utils/encryp'
import { registerRequest } from '@/service/api/register/register'

const name = ref('')
const password = ref('')
const regPassword = ref('')
const userStore = useUserStore()
const message = useMessage()
const router = useRouter()
// 弹框时禁止滚动
onMounted(() => {
  stopScroll()
})
// 关闭弹框时恢复
onUnmounted(() => {
  canScroll()
})

const regData = () => {
  if (!name.value.trim() || !password.value.trim()) {
    message.warning('请输入用户名和密码')
    return false
  }
  if (password.value !== regPassword.value) {
    message.warning('两次输入的密码不一致')
    return false
  }
  return true
}
const login = () => {
  bus.$emit('showLogin', true)
  bus.$emit('showReg', false)
}
const close = () => {
  bus.$emit('showLogin', false)
}

const resetClick = () => {
  bus.$emit('showReg', false)
  bus.$emit('showReset', true)
}

const handleRegister = async () => {
  if (!regData()) {
    return
  }
  await registerRequest({ name: name.value, passWord: encrypt(password.value) })
  message.success('注册成功')
  login()
}
</script>
<style lang="less" scoped>
@import url(../assets/less/login-popup.less);
</style>
