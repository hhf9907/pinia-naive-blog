// const crypto = require('crypto')
import { dateFormat } from './util'

const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

// 生成userId
export const generateFileName = (): string => {
  return dateFormat('YYYY/mm/dd', new Date()) + '/' + guid()
}
