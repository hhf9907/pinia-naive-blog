<template>
  <div class="post-comment">
    <div class="title-text">评论</div>
    <div class="comment-input">
      <n-avatar
        class="avatar"
        round
        size="large"
        :src="userStore.user.avatar"
      />
      <n-input
        type="textarea"
        placeholder="输入评论"
        v-model:value="commentText"
        :autosize="{
          minRows: 3
        }"
      />
    </div>
    <div class="submit-btn">
      <n-button type="primary" :disabled="!commentText" @click="submitComment">
        发送评论
      </n-button>
    </div>
    <div class="comment-list-title">
      全部评论 {{ commentList.commentTotal }}
    </div>

    <CommentItem
      v-for="item in commentList.list"
      :comment="item"
      :postId="postId"
      :key="item.commentId"
      @unshiftReplyComments="unshiftReplyComments"
    />

    <div
      class="pointer more-comment"
      @click="queryMore"
      v-if="pageNum < commentList.pages"
    >
      点击查看更多评论
    </div>
    <div v-else class="more-comment">暂无更多评论哦</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useMessage } from 'naive-ui'

// 组件
import CommentItem from './comment-item.vue'

// api 请求
import { getPostComments, createComment } from '@/service/api/comment/comment'
import { CommentsType, ReplyCommentType } from '@/service/api/comment/type'

const { postId } = defineProps<{
  postId: string
}>()

const pageNum = ref(1)

const message = useMessage()
const userStore = useUserStore()
const commentText = ref('')
const commentList = ref<CommentsType>({
  count: 0,
  pages: 0,
  list: [],
  commentTotal: 0
})

getComments()

async function getComments(isConcat = false) {
  const data = await getPostComments(postId, pageNum.value)
  if (isConcat) {
    commentList.value.list.push(...data.list)
  } else {
    commentList.value = data
  }
}

const submitComment = async () => {
  await createComment(postId, commentText.value)
  message.success('评论发表成功')
  pageNum.value = 1
  commentText.value = ''
  getComments()
}

const queryMore = () => {
  pageNum.value = pageNum.value + 1
  getComments(true)
}

const unshiftReplyComments = ({
  commentId,
  data
}: {
  commentId: number
  data: ReplyCommentType
}) => {
  const comment = commentList.value.list.find(
    (item) => item.commentId === commentId
  )
  if (comment) {
    comment.replyComments.list.unshift(data)
    console.log(commentId, data)
  }
}
</script>

<style scoped lang="less">
.post-comment {
  margin-top: 20px;
  background-color: #fff;
  padding: 24px 32px;
  .avatar {
    margin-right: 16px;
  }
  .title-text,
  .comment-list-title {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
  }
  .title-text {
    margin-bottom: 24px;
  }
  .comment-input {
    display: flex;
  }
  .submit-btn {
    text-align: right;
    margin-top: 10px;
  }

  .comment-list-title {
    margin-top: 15px;
    margin-bottom: 30px;
  }

  .more-comment {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
