<template>
  <n-card
    class="n-card pointer"
    :key="postItem.postId"
    @click="toPostPage(postItem.postId)"
    :segmented="{
      content: true,
      footer: 'soft'
    }"
  >
    <template #header>
      <div class="header">
        <template
          v-for="(categoryName, index) in postItem.categoryNames"
          :key="categoryName"
        >
          <span>{{ categoryName }}</span>
          <span
            class="header-line"
            v-if="index !== postItem.categoryNames!.length - 1"
          >
            |
          </span>
        </template>
      </div>
    </template>
    <template #header-extra>
      <div class="header-extra" @click.stop="toUserPage(postItem.userId)">
        <n-avatar size="small" :src="postItem.avatar" />
        <span class="header-extra-nickname">{{ postItem.nickname }}</span>
      </div>
    </template>
    <div class="text-omit">
      <div class="post-name">{{ postItem.postName }}</div>
      <div class="text-omit">{{ postItem.postIntro }}</div>
    </div>
    <template #footer>
      <div class="n-card-footer">
        <n-icon size="16" :component="EyeOutline" />
        <div class="n-card-footer-text">{{ postItem.pv }}</div>
        <n-icon
          @click.stop="false"
          style="margin-left: 30px"
          size="16"
          :component="ChatbubbleEllipsesOutline"
        />
        <div class="n-card-footer-text">{{ postItem.commentNum }}</div>
        <n-icon
          @click.stop="collect(postItem)"
          style="margin-left: 30px"
          size="16"
          :component="postItem.isCollect ? StarSharp : StarOutline"
        />
        <n-dropdown
          trigger="click"
          :options="options"
          @select="handleSelect($event, postItem.postId)"
          v-if="userStore.user.userId === postItem.userId"
        >
          <n-icon
            size="16"
            style="margin-left: 30px"
            @click.stop="false"
            :component="EllipsisHorizontalOutline"
          />
        </n-dropdown>
      </div>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import {
  EyeOutline,
  EllipsisHorizontalOutline,
  StarOutline,
  StarSharp,
  ChatbubbleEllipsesOutline
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user'
import { CategoryType } from '@/service/api/category/type'
import { List } from '@/service/api/post/type'
import {
  deletePost,
  collectPost,
  cancelCollectPost
} from '@/service/api/post/post'

const options = [
  { key: 'edit', label: '编辑' },
  { key: 'delete', label: '删除' }
]

const { postItem } = defineProps<{
  postItem: List
}>()

const emit = defineEmits(['handleDelete'])

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

const toPostPage = (postId: string) => {
  router.push(`/post/${postId}`)
  // window.open(`/post/${postId}`, '_blank')
}

const toUserPage = (userId: string) => {
  router.push(`/user/${userId}`)
}

// 编辑文章
const toPostEdit = (postId: string) => {
  router.push({
    path: `/post/editor`,
    query: {
      postId: postId,
      type: 'edit'
    }
  })
}

const handleSelect = async (key: string, postId: string) => {
  if (key === 'delete') {
    await deletePost(postId)
    message.success('删除成功')
    emit('handleDelete', postId)
  } else {
    toPostEdit(postId)
  }
}

const collect = async (post: List) => {
  const requestFn = post.isCollect ? cancelCollectPost : collectPost
  await requestFn(post.postId)
  post.isCollect = post.isCollect ? 0 : 1
  message.success(post.isCollect ? '收藏成功' : '取消收藏成功')
}
</script>

<style scoped lang="less">
.n-card {
  margin-bottom: 5px;
  .header {
    font-size: 13px;
    color: #86909c;
    .header-line {
      padding: 0 5px;
    }
  }
  :deep(.n-card-header) {
    padding-top: 10px !important;
    padding-bottom: 5px !important;
  }
  .header-extra {
    display: flex;
    align-items: center;
  }
  .header-extra-nickname {
    margin-left: 10px;
  }
  .post-name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  :deep(.n-card__footer) {
    padding: 10px 0;
  }
  .n-card-footer {
    font-size: 13px;
    display: flex;
    align-items: center;
    .n-card-footer-text {
      margin-left: 5px;
    }
  }
}
.n-card:hover {
  background-color: #fafafa;
}
</style>
