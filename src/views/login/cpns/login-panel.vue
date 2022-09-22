<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="登录">
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-contorl">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
import { ref } from 'vue'

const isKeepPassword = ref(true)
const accountRef = ref<InstanceType<typeof loginAccount>>()

const handleLoginClick = () => {
  accountRef.value?.loginAction(isKeepPassword.value)
}
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  .title {
    text-align: center;
  }
  .login-contorl {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
