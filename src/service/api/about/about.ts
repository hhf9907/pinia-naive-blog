import hyRequest from '../../index'
enum aboutApi {
  GETABOUT = '/get_about'
}
export function getAbout() {
  return hyRequest.get<any>({
    url: aboutApi.GETABOUT
  })
}
