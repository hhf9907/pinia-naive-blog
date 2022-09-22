import * as qiniu from 'qiniu-js'
import { generateFileName } from '@/utils/generate-id'

const QINIU_URL = 'https://qiniu.coderhhf.cn/'
/**
 *
 * @param file File文件对象
 * @param key 文件名
 * @param token token
 * @returns
 */
export default function qiniuUpload(file: File, token: string) {
  return new Promise((resolve, reject) => {
    const fileName = generateFileName()
    const observable = qiniu.upload(file, fileName, token)
    observable.subscribe({
      complete(res) {
        resolve(QINIU_URL + res.key)
      },
      error(err) {
        console.log('上传error： ' + err)
        reject(err.message)
      }
    }) // 上传开始
  })
}
