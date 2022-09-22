<template>
  <div class="login-account"></div>
</template>

<script setup lang="ts">
const loginAction = (isKeepPassword: boolean) => {
  console.log(isKeepPassword)
}
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
