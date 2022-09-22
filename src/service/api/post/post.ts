import hfRequest from '../../index'
import { PostModelType, PostListType, PostDetailType } from './type'

enum postApi {
  CREATE = '/post/create',
  UPDATE = '/post/update',
  GET_POST = '/post/getPostById/',
  GET_LIST = '/post/list',
  GET_LIST_BY_USER_ID = '/post/getPostListByUserId',
  GET_LIST_BY_COLLECT = '/post/getPostListByCollections',
  DELETE_POST = '/post/',
  COLLECT_POST = '/post/collect/',
  CANCEL_COLLECT_POST = '/post/cancelCollect/'
}

/**
 * 发布文章
 * @param data 
 * @returns 
 */
export function createPost(data: PostModelType) {
  return hfRequest.post<any>({
    url: postApi.CREATE,
    data
  })
}

/**
 * 修改文章
 * @param data 
 * @returns 
 */
export function updatePost(data: PostModelType) {
  return hfRequest.put<any>({
    url: postApi.UPDATE + '/' + data.postId,
    data
  })
}

/**
 * 根据postId获取文章
 * @param postId 
 * @returns 
 */
export function getPostById(postId: string) {
  return hfRequest.get<PostDetailType>({
    url: postApi.GET_POST + postId
  })
}

/**
 * 获取文章列表
 * @param params 
 * @returns 
 */
export function getPostList(params: any) {
  return hfRequest.get<PostListType>({
    url: postApi.GET_LIST,
    params
  })
}

/**
 * 根据用户id获取他发布的文章列表
 * @param params 
 * @returns 
 */
export function getPostListByUserId(params: any) {
  return hfRequest.get<PostListType>({
    url: postApi.GET_LIST_BY_USER_ID,
    params
  })
}

/**
 * 获取用户收藏的文章
 * @param params 
 * @returns 
 */
export function getPostListByCollections(params: any) {
  return hfRequest.get<PostListType>({
    url: postApi.GET_LIST_BY_COLLECT,
    params
  })
}

/**
 * 根据postId删除文章
 * @param postId 
 * @returns 
 */
export function deletePost(postId: string) {
  return hfRequest.delete<any>({
    url: postApi.DELETE_POST + postId,
  })
}

/**
 * 收藏文章
 * @param postId 
 * @returns 
 */
export function collectPost(postId: string) {
  return hfRequest.post<any>({
    url: postApi.COLLECT_POST + postId,
  })
}

/**
 * 取消收藏文章
 * @param postId 
 * @returns 
 */
export function cancelCollectPost(postId: string) {
  return hfRequest.post<any>({
    url: postApi.CANCEL_COLLECT_POST + postId,
  })
}