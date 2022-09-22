import hfRequest from '../../index'
import { UserInfoType, UpdateInfoType, UpdateAccountType, RelationDetailType } from './type'
enum userApi {
  GET_USER_INFO_BY_ID = '/user/getUserInfo/',
  UPDATE_USER_BASE_INFO = '/user/updateBaseInfo',
  UPDATE_ACCOUNT_INFO = '/user/updateAccountInfo',
  CONCERN_USER = '/user/concern/',
  CANCEL_CONCERN_USER = '/user/cancelConcern/',
  GET_CONCERN_LIST = '/user/queryConcernList',
  GET_FANS_LIST = '/user/queryFansList' 
}

export function getUserInfoById(userId: string) {
  return hfRequest.get<UserInfoType>({
    url: userApi.GET_USER_INFO_BY_ID + userId
  })
}

export function updateBaseInfo(data: UpdateInfoType) {
  return hfRequest.put<UserInfoType>({
    url: userApi.UPDATE_USER_BASE_INFO,
    data
  })
}

export function updateAccountInfo(data: UpdateAccountType) {
  return hfRequest.put<UserInfoType>({
    url: userApi.UPDATE_ACCOUNT_INFO,
    data
  })
}

export function concernUser(userId = '') {
  return hfRequest.post<UserInfoType>({
    url: userApi.CONCERN_USER + userId
  })
}

export function cancelConcernUser(userId = '') {
  return hfRequest.post<UserInfoType>({
    url: userApi.CANCEL_CONCERN_USER + userId
  })
}

export function getConcernList(userId: string, pageNum = 1) {
  return hfRequest.get<{
    count: number,
    list: RelationDetailType[],
    pages: number
  }>({
    url: userApi.GET_CONCERN_LIST,
    params: {
      userId,
      pageNum
    }
  })
}

export function getFansList(userId: string, pageNum = 1) {
  return hfRequest.get<{
    count: number,
    list: RelationDetailType[],
    pages: number
  }>({
    url: userApi.GET_FANS_LIST,
    params: {
      userId,
      pageNum
    }
  })
}
