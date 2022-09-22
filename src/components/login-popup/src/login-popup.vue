<template>
  <div class="login-box login-modal-box">
    <div class="login-form">
      <h1 class="title">
        用户登录
        <div class="close-box" @click="close"><span class="close"></span></div>
      </h1>
      <template v-if="!isEmailLogin">
        <div class="input-box">
          <!-- <n-input
            type="text"
            v-model:value="name"
            placeholder="请输入用户名"
            :maxlength="15"
            v-focus
          >
          </n-input> -->
          <n-mention
            :maxlength="15"
            placeholder="请输入用户名"
            v-model:value="name"
            autofocus
            :options="options"
            default-value=""
          />
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
      </template>
      <template v-else>
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
      </template>
      <n-checkbox v-model:checked="isSavePassword" style="margin-right: 12px">
        记住密码
      </n-checkbox>
      <div class="submit-box">
        <div class="login-btn btn" @click="loginClick">登录</div>
        <div class="reg-btn btn" @click="reg">注册</div>
      </div>
      <div class="reset-pass" @click="isEmailLogin = !isEmailLogin">
        {{ isEmailLogin ? '点击账号密码登录' : '点击邮箱登录' }}
      </div>
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
import { sendEmailCode } from '@/service/api/login/login'

// 账号登录
const name = ref('')
const password = ref('')
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

// 手机号登录
const email = ref('')
const code = ref('')

const isSavePassword = ref(
  Boolean(localCache.getCache('isSavePassword')) || false
)
const isEmailLogin = ref(false)
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

// 当选择了保存密码  就进行回显
if (isSavePassword.value) {
  if (localCache.getCache('name') && localCache.getCache('password')) {
    name.value = decrypt(localCache.getCache('name'))
    password.value = decrypt(localCache.getCache('password'))
  }
}

function passwordLogin() {
  // 普通登录
  if (!regData()) {
    message.warning('请输入正确的用户名和密码')
    return
  }

  userStore
    .handleLogin({ name: name.value, passWord: encrypt(password.value) })
    .then(() => {
      // 登录成功保存密码到本地
      if (isSavePassword.value) {
        localCache.setCache('name', encrypt(name.value))
        localCache.setCache('password', encrypt(password.value))
        localCache.setCache('isSavePassword', isSavePassword.value)
      }
      router.go(0)
    })
}

async function emailLogin() {
  // 邮箱登录
  if (!verifyEmail(email.value.trim())) {
    message.warning('请输入正确的邮箱号')
    return
  }

  if (!code.value) {
    message.warning('请输入六位数的验证码')
    return
  }

  await userStore.handleEmailLogin({
    email: email.value.trim(),
    code: code.value,
    token: localCache.getCache('emailCodeToken')
  })

  router.go(0)
}

const handleSendEmailCode = async () => {
  if (isSend.value) {
    return
  }
  if (!verifyEmail(email.value.trim())) {
    message.warning('请输入正确的邮箱号')
    return
  }
  const { token } = await sendEmailCode(email.value.trim())
  localCache.setCache('emailCodeToken', token)
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

const loginClick = () => {
  if (!isEmailLogin.value) {
    passwordLogin()
  } else {
    emailLogin()
  }
}

const regData = () => {
  if (!name.value.trim() || !password.value.trim()) {
    return false
  }
  return true
}

const reg = () => {
  bus.$emit('showLogin', false)
  bus.$emit('showReg', true)
}
const close = () => {
  bus.$emit('showLogin', false)
}
</script>
<style lang="less" scoped>
@import url(../assets/less/login-popup.less);
</style>
