<template>
  <div class="post-editor">
    <n-form ref="formRef" :model="postModelRef" :rules="rules">
      <n-form-item path="postName" label="文章名称">
        <n-input
          placeholder="请输入文章名称"
          v-model:value="postModelRef.postName"
          maxlength="100"
          @keydown.enter.prevent
          width="70%"
        />
        <div style="width: 400px; text-align: right">
          <n-button type="primary" @click="handleValidateButtonClick"
            >点击提交
          </n-button>
        </div>
      </n-form-item>
      <n-form-item path="cover" label="文章封面">
        <n-upload
          action=""
          :custom-request="uploadCover"
          :default-file-list="previewFileList"
          list-type="image-card"
          :max="1"
          accept=".png,.jpg,.PNG,.JPG"
        />
      </n-form-item>
      <n-form-item path="postIntro" label="文章简介">
        <n-input
          placeholder="请输入文章简介"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
          maxlength="255"
          v-model:value="postModelRef.postIntro"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item label="选择分类">
        <n-select
          v-model:value="categoryIds"
          multiple
          placeholder="选择分类"
          :options="categoryOptions"
        />
      </n-form-item>
      <n-form-item label="选择编辑器(建议使用markdown编辑器)">
        <n-radio
          :checked="postModelRef.editorType === 1"
          :value="1"
          name="basic-demo"
          @change="handleChange"
        >
          markdown编辑器
        </n-radio>
        <n-radio
          :checked="postModelRef.editorType === 2"
          :value="2"
          name="basic-demo"
          @change="handleChange"
        >
          富文本编辑器
        </n-radio>
      </n-form-item>
      <n-form-item label="文章内容"></n-form-item>
    </n-form>
    <markdown-editor
      :modelValue="postModelRef.content"
      @updateValue="updateValue"
      :height="900"
      ref="MdRef"
      v-if="postModelRef.editorType === 1"
    />
    <wang-edit
      v-model="postModelRef.content"
      @updateValue="updateValue"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  FormInst,
  FormRules,
  UploadCustomRequestOptions,
  useMessage
} from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { getUploadToken, uploadFile } from '@/service/api/file/file'
import qiniuUpload from '@/service/qiniu-upload/index'

// components
import MarkdownEditor from '@/components/markdown-edit-v3'
import WangEdit from '@/components/wangeditor'

import { PostModelType } from '@/service/api/post/type'
import { createPost, getPostById, updatePost } from '@/service/api/post/post'
import { CategoryType } from '@/service/api/category/type'
import { getAllCategory } from '@/service/api/category/cagegory'
import { UPLOAD_TYPE } from '@/service/request/config'

const MdRef = ref()
const router = useRouter()
const route = useRoute()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const isUpdate = ref(route.query.type === 'edit' ? true : false)
const postModelRef = reactive<PostModelType>({
  postName: '',
  postIntro: '',
  cover: '',
  editorType: 1,
  content: '',
  categoryIds: ''
})
const categoryList = ref<CategoryType[]>([])
const categoryOptions = ref<{}>([])
const categoryIds = ref()
const rules: FormRules = {
  postName: [
    {
      required: true,
      message: '请输入文章名称',
      trigger: ['blur']
    }
  ],
  postIntro: [
    {
      required: true,
      message: '请输入文章标题',
      trigger: ['blur']
    }
  ]
}

onMounted(async () => {
  if (isUpdate.value) {
    const postId = route.query.postId + ''
    const post = await getPostById(postId)
    postModelRef.content = post.content
    postModelRef.postName = post.postName
    postModelRef.postIntro = post.postIntro
    postModelRef.editorType = post.editorType
    postModelRef.categoryIds = post.categoryIds
    postModelRef.postId = post.postId

    // 回显数据
    MdRef.value.updateValue(postModelRef.content)
    if (post.categoryIds) {
      const ids = post.categoryIds.split(',')
      categoryIds.value = ids.map((item: any) => Number(item))
      console.log(categoryIds.value)
    }
  }
})

getCategoryData()

async function getCategoryData() {
  categoryList.value = await getAllCategory()
  categoryOptions.value = categoryList.value.map((item) => {
    return {
      label: item.categoryName,
      value: item.categoryId
    }
  })
}

const updateValue = (data: string) => {
  postModelRef.content = data
}

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (!postModelRef.content) {
        return message.warning('请输入文章的内容~')
      }
      postModelRef.categoryIds = categoryIds?.value?.join(',') || ''
      const reuqestFn = isUpdate.value ? updatePost : createPost
      try {
        await reuqestFn(postModelRef)

        message.success('发布成功')
        router.replace('/')
      } catch (error) {
        console.error(error)
      }
    }
  })
}
const handleChange = (e: Event) => {
  postModelRef.editorType = Number((e.target as HTMLInputElement).value)
}

const uploadCover = async (options: UploadCustomRequestOptions) => {
  console.log(options.file.file)
  const file = options.file.file
  if (!file) {
    return
  }
  if (UPLOAD_TYPE === 2) {
    // 上传到自己服务器
    const formData = new FormData()
    formData.append('picture', file)
    const [imgurl] = await uploadFile(formData)
    postModelRef.cover = imgurl
  } else {
    // 七牛云
    const token = await getUploadToken()

    const url = await qiniuUpload(file, token)
    postModelRef.cover = url as string
  }
}
</script>

<style scoped lang="less">
.post-editor {
  padding: 30px;
}
</style>
