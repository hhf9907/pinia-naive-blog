export interface PostModelType {
  postName: string
  postIntro: string
  content: string
  categoryIds: string
  editorType: number
  postId?: string
}

export interface PostListType {
  count: number
  list: List[]
  pages: number
}

export interface List {
  avatar: null | string
  categoryIds: string
  createTime: string
  creator: string
  isCollect: number
  nickname: string
  postId: string
  postIntro: string
  postName: string
  pv: number
  userId: string
  username: string
  commentNum: number
  categoryNames?: string[]
}

export interface PostDetailType {
  avatar: string
  categoryIds: string
  content: string
  createTime: string
  editorType: number
  nickname: string
  postId: string
  postIntro: string
  postName: string
  pv: number
  userId: string
  username: string
  commentNum: number,
  isRelation: number
}
