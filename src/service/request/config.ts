// 生产环境 production
// 开发环境 development

let BASE_URL = ''
let BASE_NAME = ''
let TIME_OUT = 10000
let UPLOAD_TYPE = 2 // 1 七牛云上传， 2 上传到node服务器

console.log(import.meta.env.MODE)

if (import.meta.env.MODE === 'production') {
  // BASE_URL = 'https://blog-api.coderhhf.cn'
  BASE_NAME = 'prod'
  TIME_OUT = 20000
  UPLOAD_TYPE = 2
} else if (import.meta.env.MODE === 'development') {
  // BASE_URL = 'https://blog-api.coderhhf.cn'
  BASE_URL = 'http://127.0.0.1:3000'
  BASE_NAME = 'dev'
  TIME_OUT = 20000
  UPLOAD_TYPE = 2
}

export { BASE_URL, BASE_NAME, TIME_OUT, UPLOAD_TYPE }
