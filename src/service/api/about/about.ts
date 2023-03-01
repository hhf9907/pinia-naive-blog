import hyRequest from '../../index'

enum aboutApi {
  GETABOUT = '/user/getAuthorAbout'
}

export function getAbout() {
  return hyRequest.get<any>({
    url: aboutApi.GETABOUT
  })
}
