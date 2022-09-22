import hyRequest from '../../index'
import { CommentsType, ReplyCommentType } from './type'
enum CommentApi {
  GET_LIST = '/comment/queryComment',
  CREATE_POST = '/comment/createComment',
  CREATE_REPLY_POST = '/comment/createReplyComment'
}

export function getPostComments(postId: string, pageNum: number) {
  return hyRequest.get<CommentsType>({
    url: CommentApi.GET_LIST,
    params: {
      postId,
      pageNum
    }
  })
}


export function createComment(postId: string, content: string) {
  return hyRequest.post<any>({
    url: CommentApi.CREATE_POST,
    data: {
      postId,
      content
    }
  })
}

export function createReplyComment(commentId: number, content: string, postId: string) {
  return hyRequest.post<ReplyCommentType>({
    url: CommentApi.CREATE_REPLY_POST,
    data: {
      postId,
      content,
      commentId
    }
  })
}