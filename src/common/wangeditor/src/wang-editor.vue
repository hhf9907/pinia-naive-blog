<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig } from '@wangeditor/editor'

import { uploadFile } from '@/service/api/file/file'
import { getUploadToken } from '@/service/api/file/file'
import qiniuUpload from '@/service/qiniu-upload/index'

import { UPLOAD_TYPE } from '@/service/request/config'

const { modelValue } = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: ''
  }
)

const emit = defineEmits(['updateValue'])

type InsertFnType = (url: string, alt?: string, href?: string) => void
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const mode = 'default'

// 内容 HTML
const valueHtml = ref(modelValue)

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 其他配置...

      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 10 * 1024, // 50kb
      async customUpload(file: File, insertFn: InsertFnType) {
        // TS 语法
        console.log(file)

        if (UPLOAD_TYPE === 2) {
          // 上传到服务器
          const formData = new FormData()
          formData.append('picture', file)
          const imgurls = await uploadFile(formData)
          insertFn(imgurls[0])
        } else {
          // 上传到七牛云
          const token = await getUploadToken()
          // const imgurls = await uploadFile(formData)
          const url = await qiniuUpload(file, token)
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          insertFn(String(url))
        }
      }
    }
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

watch(
  () => valueHtml,
  (newValue, oldValue) => {
    // newValue === oldValue
    emit('updateValue', newValue.value)
  },
  { deep: true }
)
</script>
