<template>
  <n-card class="about" hoverable>
    <div v-html="about"></div>
  </n-card>
</template>

<script setup lang="ts">
import { getAbout } from '@/service/api/about/about'
import { ref } from 'vue'

const about = ref('')
getAbout().then(({ content }) => {
  about.value = content
})
</script>

<style lang="less" scoped>
.about {
  width: 70%;
  min-height: 100vw;
  margin: 0 auto;
}
</style>
