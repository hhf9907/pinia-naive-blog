import crypto from 'crypto-js'
//禁止滚动
export function stopScroll() {
  const mo = function (e: any) {
    e.preventDefault()
  }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false) //禁止页面滑动
}

//取消滑动限制
export function canScroll() {
  const mo = function (e: any) {
    e.preventDefault()
  }
  document.body.style.overflow = '' //出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

export function debounce(func: Function, wait = 0, immediate = false) {
  let res: any, timeout: any, context: any
  const debounced = function (this: any, ...args: any[]) {
    context = this
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const runNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (runNow) res = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return res
  }
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}

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

// 生成唯一Id
export const generateUId = (): string => {
  return guid()
}

/**
 * 时间处理
 * @param {*} fmt
 * @param {*} date
 * @returns
 */
export function dateFormat(fmt: string, date: Date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}
