<template>
  <div class="comment-item">
    <n-avatar class="avatar" round size="large" :src="comment.avatar" />
    <div class="comment-item-right">
      <div class="name">
        <div>{{ comment.nickname }}</div>
        <div class="date">
          {{ dateFormat(comment.createTime, 'YYYY-MM-DD hh:mm') }}
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div class="footer">
        <n-icon
          class="pointer"
          style="margin-right: 5px"
          size="16"
          :component="HeartOutline"
        />
        <span class="pointer">{{ comment.replyComments.count }}</span>
        <n-icon
          size="16"
          class="pointer"
          style="margin-left: 30px; margin-right: 5px"
          @click.stop="false"
          @click="showReplyInput"
          :component="ChatbubbleEllipsesOutline"
        />
        <span class="pointer" @click="showReplyInput">{{
          isShowReplyInput ? '取消评论' : comment.replyComments.list.length
        }}</span>
      </div>
      <template v-if="isShowReplyInput">
        <n-input
          style="margin-top: 10px"
          type="textarea"
          placeholder="输入评论"
          v-model:value="replyCommentText"
          :autosize="{
            minRows: 3
          }"
        />
        <div class="submit-btn">
          <n-button
            type="primary"
            @click="submitReplyComment"
            :disabled="!replyCommentText"
          >
            发送评论
          </n-button>
        </div>
      </template>
      <div class="reply-comment" v-if="comment.replyComments.list.length">
        <ReplyComment
          v-for="item in comment.replyComments.list"
          :replyComment="item"
          :key="item.commentReplyId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 组件
import { HeartOutline, ChatbubbleEllipsesOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import ReplyComment from './reply-comment.vue'

import { Comment } from '@/service/api/comment/type'
import { createReplyComment } from '@/service/api/comment/comment'

// 工具
import { dateFormat } from '@/utils/dateFormat'

const { comment, postId } = defineProps<{
  comment: Comment
  postId: string
}>()

const emit = defineEmits(['unshiftReplyComments'])

const message = useMessage()
const isShowReplyInput = ref(false)
const replyCommentText = ref('')

const showReplyInput = () => {
  isShowReplyInput.value = !isShowReplyInput.value
}

const submitReplyComment = async () => {
  const data = await createReplyComment(
    comment.commentId,
    replyCommentText.value,
    postId
  )
  message.success('回复评论成功')
  replyCommentText.value = ''
  isShowReplyInput.value = false
  // comment.replyComments.list.unshift(data)
  emit('unshiftReplyComments', { commentId: comment.commentId, data })
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    margin-right: 16px;
  }
  display: flex;
  .comment-item-right {
    flex: 1;
    margin-bottom: 15px;
    .name {
      font-size: 15px;
      color: #252933;
      line-height: 26px;
      display: flex;
      width: 100%;
      .date {
        margin-left: auto;
        color: #8a919f;
      }
    }
    .content {
      font-size: 14px;
      line-height: 2rem;
      color: #515767;
    }
    .footer {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #8a919f;
    }
    .submit-btn {
      text-align: right;
      margin-top: 10px;
    }
    .reply-comment {
      margin-top: 10px;
      padding: 16px;
      background: rgba(247, 248, 250, 0.7);
      border-radius: 4px;
    }
  }
}
</style>
