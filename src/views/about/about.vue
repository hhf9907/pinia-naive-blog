<template>
  <n-card class="about" hoverable>
    <v-md-editor
      class="rich-content"
      v-if="about"
      :model-value="about"
      mode="preview"
      ref="preview"
      @copy-code-success="handleCopyCodeSuccess"
    />
  </n-card>
</template>

<script setup lang="ts">
import { getAbout } from '@/service/api/about/about'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'

const about = ref('')
const message = useMessage()

getAbout().then(({ content }) => {
  about.value = content
})

const handleCopyCodeSuccess = () => {
  message.success('复制成功~')
}
</script>

<style lang="less" scoped>
.about {
  width: 70%;
  min-height: 100vw;
  margin: 80px auto 0;
}
</style>
