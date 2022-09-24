<template>
  <div class="md-editor">
    <v-md-editor
      v-model="text"
      :height="mdEditorHeight"
      :width="mdEditorWidth"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { uploadFile } from '@/service/api/file/file'
import { getUploadToken } from '@/service/api/file/file'
import qiniuUpload from '@/service/qiniu-upload/index'

import { UPLOAD_TYPE } from '@/service/request/config'

const props = withDefaults(
  defineProps<{
    width?: string | number
    height?: string | number
    modelValue: any
  }>(),
  {
    width: '100%',
    height: '400px'
  }
)

const emit = defineEmits(['updateValue'])

const text = ref(props.modelValue)

const mdEditorHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)
const mdEditorWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width
)

const handleUploadImage = async (
  event: any,
  insertImage: Function,
  files: File[]
) => {
  if (UPLOAD_TYPE === 2) {
    // 上传到自己服务器
    const formData = new FormData()
    for (let file of files) {
      formData.append('picture', file)
    }
    const imgurls = await uploadFile(formData)
    imgurls.forEach((url) => {
      insertImage({
        url: url
        // width: 'auto',
        // height: 'auto',
      })
    })
  } else {
    // 七牛云
    const token = await getUploadToken()

    const imgurls = []
    for (let i = 0; i < files.length; i++) {
      const url = await qiniuUpload(files[0], token)
      imgurls.push(url)
    }
    console.log(imgurls)
    imgurls.forEach((url) => {
      console.log(url)
      insertImage({
        url: url
      })
    })
  }
}

const updateValue = (data: string) => (text.value = data)

watch(
  () => text,
  (newValue) => {
    // newValue === oldValue
    emit('updateValue', newValue.value)
  },
  { deep: true }
)

defineExpose({
  updateValue
})
</script>

<style scoped></style>
