import dayjs from 'dayjs' // ES 2015

export function dateFormat(time: number | string, format = 'YYYY-MM-DD') {
  return dayjs(time).format(format)
}

export function nowDateFormat(format = '') {
  return dayjs().format(format)
}
