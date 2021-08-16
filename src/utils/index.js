import { lazyAMapApiLoaderInstance } from 'vue-amap'
import { zhbJssdk } from '@digitalcnzz/jssdk'
import moment from 'moment'
const crypto = require('crypto')

/**
 * 根据经纬度验证当前位置的地址
 * @param {*} addressName 当前限制地址:(比如:郑州市)
 * @param {*} callback 验证结果回调函数 参数 true:验证通过 false:验证不通过
 */
export const getAddressWithCode = (addressName, callback) => {
  lazyAMapApiLoaderInstance.load().then(() => {
    window.AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new window.AMap.Geocoder()
      zhbJssdk.getLocationInfo(res => {
        geocoder.getAddress([res.longitude, res.latitude], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result.regeocode.formattedAddress.indexOf(addressName) >= 0) {
              callback && callback(true)
            } else {
              callback && callback(false)
            }
          } else {
            callback && callback(false)
          }
        })
      })
    })
  })
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
    '"}'
  )
}

export const formatNumber = num => {
  if (num) {
    const str = num.toString()
    const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
  } else {
    return `${num}`
  }
}

export const getCurrentDate = () => {
  return moment().format('yyyyMMDD')
}
export const getTimeStamp = () => new Date().getTime()

// 构建签名字符串
export const buildStringToSign = options => {
  const arr = {}
  const toStringify = Object.assign(arr, options)
  let result = ''
  if (Object.keys(toStringify).length) {
    const keys = Object.keys(toStringify).sort()
    const list = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (toStringify[key] && String(toStringify[key])) {
        list[i] = `${key}=${toStringify[key]}`
      } else {
        list[i] = `${key}`
      }
    }
    result += list.join('&')
  }
  return result
}

// 根据参数和秘钥生成签名
export const sign = (stringToSign, secretKey) => {
  const appSecret = Buffer.from(secretKey, 'utf8')
  const signRes = crypto.createHmac('sha1', appSecret).update(stringToSign, 'utf8').digest('base64')
  return signRes
}

// 获取签名信息
export const getSignature = option => {
  const str = buildStringToSign(option)
  const csbSignature = sign(str, 'oDGJlnZhSu1UzLMy3gEYT/5hsfY=')
  return csbSignature
}
/**
 * 一维数组渲染成二维
 * @param {*}} size 二维中每一个数组的长度
 * @param {*} arr 带转换的一维数组
 * @returns 渲染后的二维数组
 */
export const level2ArrayRender = (size, arr) => {
  const level2Array = []
  let index = 0
  let tempArray = []
  for (const item of arr) {
    tempArray.push(item)
    index++
    if (index >= size) {
      index = 0
      level2Array.push(tempArray)
      tempArray = []
    }
  }
  const numberArr = new Array(size).fill(0)
  for (let index in numberArr) {
    if (arr.length % size === ++index) {
      level2Array.push(arr.slice(-index))
    }
  }
  return level2Array
}

export const handleNumberPercent = data => {
  const percent = Number(parseFloat(data) * 100).toFixed(2)
  return percent
}
