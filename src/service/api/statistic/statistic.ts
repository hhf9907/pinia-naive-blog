import hfRequest from '../../index'
import { LoginCountType, PvTopFiveType } from './type'

enum userApi {
  ROOT = '/statistics',
  GET_PV_TOP_5 = '/queryPvTopFive',
  GET_LOGIN_COUNT = '/queryLoginCount'
}

export function getPvTopFive() {
  return hfRequest.get<PvTopFiveType[]>({
    url: userApi.ROOT + userApi.GET_PV_TOP_5
  })
}

export function getLoginCount() {
  return hfRequest.get<LoginCountType[]>({
    url: userApi.ROOT + userApi.GET_LOGIN_COUNT
  })
}