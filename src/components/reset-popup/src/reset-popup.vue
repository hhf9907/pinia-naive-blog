<template>
  <div class="login-box login-modal-box">
    <div class="login-form">
      <h1 class="title">
        用户重置密码
        <div class="close-box" @click="close"><span class="close"></span></div>
      </h1>
      <div class="input-box">
        <n-mention
          :maxlength="30"
          placeholder="请输入邮箱号"
          v-model:value="email"
          :options="options"
          default-value=""
        />
      </div>
      <div class="input-box send-code">
        <input
          type="text"
          maxlength="6"
          v-model="code"
          placeholder="请输入验证码"
        />
        <n-button
          type="text"
          style="margin-right: 10px"
          size="mini"
          @click="handleSendEmailCode"
          >{{ isSend ? countdown : '发送验证码' }}</n-button
        >
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
      <div class="submit-box">
        <div class="login-btn btn" @click="loginClick">返回登录</div>
        <div class="reg-btn btn" @click="resetPassword">重置密码</div>
      </div>
      <div class="reset-pass">返回登录</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useMessage } from 'naive-ui'
import { encrypt, decrypt } from '@/utils/encryp'
import { stopScroll, canScroll } from '@/utils/util'
import { verifyEmail } from '@/utils/verify'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import bus from '@/utils/bus'
import {
  sendResetEmailCode,
  handleResetEmailPassword
} from '@/service/api/login/login'

// 邮箱找回密码
const email = ref('')
const code = ref('')
const password = ref('')
let tokenCode = ''
const options = [
  {
    label: 'qq.com',
    value: 'qq.com'
  },
  {
    label: '163.com',
    value: '163.com'
  },
  {
    label: '126.com',
    value: '126.com'
  },
  {
    label: '139.com',
    value: '139.com'
  },
  {
    label: 'gmail.com',
    value: 'gmail.com'
  }
]

const userStore = useUserStore()
const message = useMessage()
const router = useRouter()
const timer = ref(0)
const countdown = ref(60)
const isSend = ref(false)

// 弹框时禁止滚动
onMounted(() => {
  stopScroll()
})
// 关闭弹框时恢复
onUnmounted(() => {
  canScroll()
})

async function emailResetPassword() {
  // 邮箱登录
  if (!verifyEmail(email.value.trim())) {
    message.warning('请输入正确的邮箱号')
    return
  }

  if (!code.value) {
    message.warning('请输入六位数的验证码')
    return
  }

  await handleResetEmailPassword({
    email: email.value.trim(),
    code: code.value,
    token: tokenCode,
    passWord: encrypt(password.value)
  })

  message.success('密码重置成功')
  bus.$emit('showReset', false)
  bus.$emit('showLogin', true)
}

const handleSendEmailCode = async () => {
  if (isSend.value) {
    return
  }
  if (!verifyEmail(email.value.trim())) {
    message.warning('请输入正确的邮箱号')
    return
  }
  const { token } = await sendResetEmailCode(email.value.trim())
  tokenCode = token
  console.log(token)
  isSend.value = true
  countdownFn()
}

function countdownFn() {
  // 60s 倒计时
  countdown.value = 60
  timer.value = setInterval(() => {
    if (countdown.value === 0) {
      clearInterval(timer.value)
      isSend.value = false
    }
    countdown.value = countdown.value - 1
  }, 1000)
}

const resetPassword = () => {
  emailResetPassword()
}

const loginClick = () => {
  bus.$emit('showReset', false)
  bus.$emit('showLogin', true)
}
const close = () => {
  bus.$emit('showReset', false)
}
</script>
<style lang="less" scoped>
@import url(../assets/less/login-popup.less);
</style>
