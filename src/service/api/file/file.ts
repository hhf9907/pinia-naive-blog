import hfRequest from '../../index'

enum categoryApi {
  FILE_UPLOAD = '/upload/picture',
  GET_QINIU_TOKEN = '/upload/getUploadToken'
}

export function uploadFile(data: FormData) {
  return hfRequest.post<string[]>({
    url: categoryApi.FILE_UPLOAD,
    data
  })
}

export function getUploadToken() {
  return hfRequest.get<string>({
    url: categoryApi.GET_QINIU_TOKEN
  })
}
