export interface CommentsType {
  count: number
  list: Comment[]
  pages: number,
  commentTotal: number
}

export interface Comment {
  avatar: string
  commentId: number
  content: string
  createTime: string
  nickname: string
  postId: string
  replyComments: ReplyCommentsType
  userId: string
}

export interface ReplyCommentsType {
  count: number
  list: ReplyCommentType[]
  pages: number
}

export interface ReplyCommentType {
  avatar: string
  commentId: number
  commentReplyId: number
  content: string
  createTime: string
  nickname: string
  postId: string
  userId: string
}
