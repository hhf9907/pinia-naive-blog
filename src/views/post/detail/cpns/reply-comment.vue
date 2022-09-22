<template>
  <div class="comment-item">
    <n-avatar class="avatar" round size="large" :src="replyComment.avatar" />
    <div class="comment-item-right">
      <div class="name">
        <div>{{ replyComment.nickname }}</div>
        <div class="date">
          {{ dateFormat(replyComment.createTime, 'YYYY-MM-DD hh:mm') }}
        </div>
      </div>
      <div class="content">{{ replyComment.content }}</div>
      <div class="footer">
        <n-icon
          class="pointer"
          style="margin-right: 5px"
          size="16"
          :component="HeartOutline"
        />
        <div class="pointer">{{ 11 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件
import { HeartOutline } from '@vicons/ionicons5'
// 工具
import { dateFormat } from '@/utils/dateFormat'

import { ReplyCommentType } from '@/service/api/comment/type'

const { replyComment } = defineProps<{
  replyComment: ReplyCommentType
}>()
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
  }
}
</style>
