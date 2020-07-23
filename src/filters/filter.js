import dayjs from 'dayjs'
/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
export function formatDate1 (time, fmt) {
  if (time === undefined || '') {
    return
  }
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone (phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 隐藏身份证号中间四位
 * @param {*} code 身份证号
 */
export const certificateCode = code => {
  return code.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2')
}

/**
 * 格式化时间
 * @param {*} val
 * @param {*} rule
 */
export const formatDate = (val, rule = 'YYYY-MM-DD HH:mm') => {
  return dayjs(val).format(rule)
}
