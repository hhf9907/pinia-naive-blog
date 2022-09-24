export interface UserInfoType {
  avatar: string
  collectTotal: number
  concerns: number
  email: null
  fans: number
  name: string
  nickname: string
  notes: null
  phone: null
  pvTotal: string
  userId: string
  homePage: string
  createTime: string
  isConcern: number
  beCollectedTotal: number // 被收藏总数
}

export interface UpdateInfoType {
  nickname: string
  homePage: string
  notes: string
}

export interface UpdateAccountType {
  phone: string
  email: string
}

export interface RelationDetailType {
  avatar: null | string
  isConcern: number
  nickname: string
  userId: string
}
